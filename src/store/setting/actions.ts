import { createAction, createAsyncAction } from 'typesafe-actions';

import { Site } from '../constant/reducer';
import { SettingActionTypes } from './types';

export const setActiveSearchEngine = createAction(
  SettingActionTypes.SET_ACTIVE_SEARCH_ENGINE,
  (engine: string) => engine
)();

export const searchKeywordAction = createAction(
  SettingActionTypes.SEARCH_KEYWORD_ACTION,
  (keyword: string) => keyword
)();

type AddCustomSubscriptionActionPayload = {
  name: string;
  link: string;
  favicon?: string;
};

export const addCustomSubscription = createAsyncAction(
  SettingActionTypes.ADD_CUSTOM_SUBSCRIPTION_REQUEST,
  SettingActionTypes.ADD_CUSTOM_SUBSCRIPTION_SUCCESS,
  SettingActionTypes.ADD_CUSTOM_SUBSCRIPTION_FAILURE
)<AddCustomSubscriptionActionPayload, undefined, Error>();

export const setCustomSubscriptons = createAction(
  SettingActionTypes.SET_CUSTOM_SUBSCRIPTIONS,
  (subscriptions: Site[]) => subscriptions
)();

export const removeCustomSubscription = createAction(
  SettingActionTypes.REMOVE_CUSTOM_SUBSCRIPTION,
  (subscription: Site) => subscription
)();
