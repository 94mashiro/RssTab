import { createAction } from 'typesafe-actions';
import { ModalActionTypes } from './types';

export const setShowSubscriptionsSettingModal = createAction(
  ModalActionTypes.SET_SHOW_SUBSCRIPTIONS_SETTING_MODAL,
  action => {
    return (show: boolean) => action(show);
  }
);
