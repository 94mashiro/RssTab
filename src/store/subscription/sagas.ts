import { message } from 'antd';
import dayjs from 'dayjs';
import { get, uniqBy } from 'lodash-es';
import { all, call, delay, fork, put, select, take } from 'redux-saga/effects';

import { RootState } from '..';
import { fetchRssHubXml } from '../../utils/api';
import { parseXmlToJson } from '../../utils/xml';
import { Site } from '../constant/reducer';
import * as SubscriptionActions from './actions';
import { Subscription, SubscriptionActionTypes } from './types';

function* mergeSubscription(link: string, data: Subscription) {
  const storeSubscription = yield select((state: RootState) =>
    get(state.subscription.list, [link])
  );
  const oldLength = get(storeSubscription, ['items'], []).length;
  let mergedSubscription;
  if (!storeSubscription) {
    mergedSubscription = data;
  } else {
    const originalArticles = get(storeSubscription, ['items']) || [];
    const updateArticles = get(data, ['items']) || [];
    const mergedArticles = uniqBy([...updateArticles, ...originalArticles], 'link');
    mergedSubscription = {
      ...data,
      items: mergedArticles,
    };
  }
  const updatedLength = mergedSubscription.items.length;
  const hasNewArticles = updatedLength > oldLength;
  return [mergedSubscription, hasNewArticles];
}

function parseSubscription(data: Record<string, any>) {
  const channel = get(data, ['rss', 'channel', 0]);
  const item = get(channel, ['item']);
  const title = get(channel, ['title', 0]);
  const description = get(channel, ['description', 0]);
  const link = get(channel, ['link', 0]);
  const parsedItems = item.map((article: Record<string, string[]>) => {
    const title = get(article, ['title', 0]);
    const description = get(article, ['description', 0]);
    let pubDate = get(article, ['pubDate', 0]);
    const link = get(article, ['link', 0]);
    if (!dayjs(pubDate).isValid()) {
      console.log(pubDate);
      pubDate = new Date().toISOString();
    }
    return {
      title,
      description,
      link,
      pubDate,
    };
  });
  return {
    title,
    description,
    link,
    items: parsedItems,
  };
}

function* fetchSubscription(link: string) {
  try {
    const { data: xmlData } = yield call(fetchRssHubXml, link);
    const json = yield call(parseXmlToJson, xmlData);
    const parsedSubscription = yield call(parseSubscription, json);
    const [mergedSubscription, hasNewArticles] = yield call(
      mergeSubscription,
      link,
      parsedSubscription
    );
    let remindSubscriptions = yield select(
      (state: RootState) => state.subscription.remindSubscriptions
    );
    if (hasNewArticles && !remindSubscriptions.includes(link)) {
      remindSubscriptions = [...remindSubscriptions, link];
      yield put(SubscriptionActions.setRemindSubscriptions(remindSubscriptions));
    }
    yield put(SubscriptionActions.setSubscription({ link, data: mergedSubscription }));
  } catch (err) {
    message.error('订阅更新获取失败，请刷新重试');
  }
}

function* watchRefreshSubscriptions() {
  while (true) {
    const {
      payload: { showMessage },
    } = yield take(SubscriptionActionTypes.REFRESH_SUBSCRIPTIONS_REQUEST);
    try {
      const rssEndpoints: Site[] = yield select((state: RootState) => state.constant.rssEndpoints);
      const enabledSubscriptions = yield select(
        (state: RootState) => state.subscription.enabledSubscriptions
      );
      const refreshSubscriptions = rssEndpoints.filter(endpoint =>
        enabledSubscriptions.includes(endpoint.link)
      );
      const refreshActions = refreshSubscriptions.map(item => {
        return call(fetchSubscription, item.link);
      });
      yield all(refreshActions);
      yield put(SubscriptionActions.refreshSubscriptions.success());
      if (showMessage) {
        message.success('订阅更新完毕');
      }
    } catch (err) {
      yield put(SubscriptionActions.refreshSubscriptions.failure(err));
    }
  }
}

function* watchSetEnabledSubscriptions() {
  while (true) {
    const { payload: enabledSubscriptions } = yield take(
      SubscriptionActionTypes.SET_ENABLED_SUBSCRIPTIONS
    );
    const currentActiveSubscription = yield select(
      (state: RootState) => state.subscription.activeSubList
    );
    const updatedSubscriptions = yield select((state: RootState) => {
      const rssEndpoints = state.constant.rssEndpoints;
      return rssEndpoints
        .filter(endpoint => enabledSubscriptions.includes(endpoint.link))
        .sort((a, b) => a.order - b.order);
    });
    if (enabledSubscriptions.length === 0) {
      continue;
    }
    if (!enabledSubscriptions.includes(currentActiveSubscription)) {
      const activeSubscription = updatedSubscriptions[0].link;
      yield put(SubscriptionActions.setActiveSubList(activeSubscription));
    }
    yield put(SubscriptionActions.refreshSubscriptions.request({ showMessage: true }));
  }
}

function* watchSetActiveSubscription() {
  while (true) {
    const { payload: activeSubscription } = yield take(SubscriptionActionTypes.SET_ACTIVE_SUB_LIST);
    const remindSubscriptions = yield select(
      (state: RootState) => state.subscription.remindSubscriptions
    );
    if (remindSubscriptions.includes(activeSubscription)) {
      const updatedRemindSubscriptions = remindSubscriptions.filter(
        (sub: string) => sub !== activeSubscription
      );
      yield put(SubscriptionActions.setRemindSubscriptions(updatedRemindSubscriptions));
    }
  }
}

function* autoRefreshSubscriptionsTimer() {
  while (true) {
    yield delay(5 * 60 * 1000);
    yield put(SubscriptionActions.refreshSubscriptions.request({ showMessage: false }));
  }
}

export function* subscriptionSaga() {
  yield all([
    fork(watchRefreshSubscriptions),
    fork(watchSetEnabledSubscriptions),
    fork(watchSetActiveSubscription),
    fork(autoRefreshSubscriptionsTimer),
  ]);
}
