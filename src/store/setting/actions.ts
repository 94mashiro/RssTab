import { createAction } from 'typesafe-actions';

import { SettingActionTypes } from './types';

export const setActiveSearchEngine = createAction(
  SettingActionTypes.SET_ACTIVE_SEARCH_ENGINE,
  (engine: string) => engine
)();

export const searchKeywordAction = createAction(
  SettingActionTypes.SEARCH_KEYWORD_ACTION,
  (keyword: string) => keyword
)();
