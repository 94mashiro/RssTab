import { createAction } from 'typesafe-actions';

import { ModalActionTypes } from './types';

export const setShowAddSubscriptionModal = createAction(
  ModalActionTypes.SET_SHOW_ADD_SUBSCRIPTION_MODAL,
  (show: boolean) => show
)();
