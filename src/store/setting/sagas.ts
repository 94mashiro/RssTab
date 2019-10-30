import { message } from 'antd';
import { find, isEqual } from 'lodash-es';
import { all, call, fork, put, select, take } from 'redux-saga/effects';

import { RootState } from '..';
import { fetchRssHubXml } from '../../utils/api';
import { Site } from '../constant/reducer';
import { setShowAddSubscriptionModal } from '../modal/actions';
import {
  refreshSubscriptions,
  setActiveSubList,
  setEnabledSubscriptions,
} from '../subscription/actions';
import { activeSubscriptionsSelector } from '../subscription/selector';
import { addCustomSubscription, setCustomSubscriptons } from './actions';
import { SettingActionTypes } from './types';

function* watchKeywordSearchRequest() {
  while (true) {
    const { payload: keyword } = yield take(SettingActionTypes.SEARCH_KEYWORD_ACTION);
    const searchEngine = yield select((state: RootState) => {
      const activeEngine = state.setting.activeSearchEngine;
      const engines = state.constant.searchEngines;
      return find(engines, engine => engine.name === activeEngine);
    });
    if (searchEngine) {
      const pattern = searchEngine.pattern;
      const replaceUrl = pattern.replace('#REPLACE#', keyword);
      window.open(replaceUrl);
    }
  }
}

function* watchAddCustomSubcription() {
  while (true) {
    const {
      payload: { name, link, favicon },
    } = yield take(SettingActionTypes.ADD_CUSTOM_SUBSCRIPTION_REQUEST);
    try {
      const site: Site = {
        name,
        link,
        favicon,
        order: Number.MAX_SAFE_INTEGER,
        category: '自定义',
      };
      yield call(fetchRssHubXml, link);
      const customSubscriptions: Site[] = yield select(
        (state: RootState) => state.setting.customSubscriptions
      );
      const ifAlreadyHasCurrentCustomLink = find(
        customSubscriptions,
        sub => sub.link === site.link
      );
      if (ifAlreadyHasCurrentCustomLink) {
        throw new Error('已存在该订阅，请勿重复添加');
      }
      const enabledSubscriptions: string[] = yield select(
        (state: RootState) => state.subscription.enabledSubscriptions
      );
      yield put(setCustomSubscriptons([...customSubscriptions, site]));
      yield put(setEnabledSubscriptions([...enabledSubscriptions, site.link]));
      yield put(refreshSubscriptions.request({ showMessage: true }));
      yield put(setActiveSubList(link));
      yield put(addCustomSubscription.success());
      yield put(setShowAddSubscriptionModal(false));
    } catch (err) {
      message.error(err);
      yield put(addCustomSubscription.failure(err));
    }
  }
}

export function* watchRemoveCustomSubscription() {
  while (true) {
    const { payload: targetSubscription }: { payload: Site } = yield take(
      SettingActionTypes.REMOVE_CUSTOM_SUBSCRIPTION
    );
    const customSubscriptions: Site[] = yield select(
      (state: RootState) => state.setting.customSubscriptions
    );
    const updatedCustomSubscriptions = customSubscriptions.filter(
      customSubscription => !isEqual(targetSubscription, customSubscription)
    );
    const enabledSubscriptions: string[] = yield select(
      (state: RootState) => state.subscription.enabledSubscriptions
    );
    const activeSubscription: string | undefined = yield select(
      (state: RootState) => state.subscription.activeSubList
    );
    const updatedEnabledSubscriptions = enabledSubscriptions.filter(
      enabledSubscription => enabledSubscription !== targetSubscription.link
    );
    yield put(setEnabledSubscriptions(updatedEnabledSubscriptions));
    yield put(setCustomSubscriptons(updatedCustomSubscriptions));
    const activeSubscriptions: Site[] = yield select(activeSubscriptionsSelector);
    let updatedActiveSubscription = activeSubscription;
    if (activeSubscriptions.length === 0) {
      updatedActiveSubscription = undefined;
    } else if (!updatedActiveSubscription || activeSubscription === targetSubscription.link) {
      updatedActiveSubscription = activeSubscriptions[0].link;
    }
    yield put(setActiveSubList(updatedActiveSubscription));
  }
}

export function* settingSaga() {
  yield all([
    fork(watchKeywordSearchRequest),
    fork(watchAddCustomSubcription),
    fork(watchRemoveCustomSubscription),
  ]);
}
