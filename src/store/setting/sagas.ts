import { find } from 'lodash-es';
import { all, fork, select, take } from 'redux-saga/effects';

import { RootState } from '..';
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

export function* settingSaga() {
  yield all([fork(watchKeywordSearchRequest)]);
}
