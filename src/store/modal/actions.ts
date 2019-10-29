import { createAction } from 'typesafe-actions';

import { ModalActionTypes } from './types';

export const setShowSubscriptionsSettingModal = createAction(
  ModalActionTypes.SET_SHOW_SUBSCRIPTIONS_SETTING_MODAL,
  (show: boolean) => show
)();

export const setShowAddSubscriptionModal = createAction(
  ModalActionTypes.SET_SHOW_ADD_SUBSCRIPTION_MODAL,
  (show: boolean) => show
)();
