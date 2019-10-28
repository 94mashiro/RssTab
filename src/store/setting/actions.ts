import { createAction } from 'typesafe-actions';
import { SettingActionTypes } from './types';

export const setActiveSearchEngine = createAction(SettingActionTypes.SET_ACTIVE_SEARCH_ENGINE, action => {
  return (engine: string) => action(engine);
});

export const searchKeywordAction = createAction(SettingActionTypes.SEARCH_KEYWORD_ACTION, action => {
  return (keyword: string) => action(keyword);
});
