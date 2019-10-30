import { message } from 'antd';
import dayjs from 'dayjs';
import { get, uniqBy } from 'lodash-es';
import { all, call, delay, fork, put, select, take } from 'redux-saga/effects';

import { RootState } from '..';
import { fetchRssHubXml } from '../../utils/api';
import { parseXmlToJson } from '../../utils/xml';
import * as SubscriptionActions from './actions';
import { activeSubscriptionsSelector } from './selector';
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
      const enabledSubscriptions: string[] = yield select(
        (state: RootState) => state.subscription.enabledSubscriptions
      );
      const refreshActions = enabledSubscriptions.map(link => {
        return call(fetchSubscription, link);
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
    fork(watchSetActiveSubscription),
    fork(autoRefreshSubscriptionsTimer),
  ]);
}
