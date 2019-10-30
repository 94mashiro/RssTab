import { ActionType, getType } from 'typesafe-actions';

import * as SettingActions from '../setting/actions';
import * as SubscriptionActions from '../subscription/actions';

export type LoadingState = Readonly<{
  loadingAddCustomSubscription: boolean;
  loadingRefreshSubscriptions: boolean;
}>;

const initialState: LoadingState = {
  loadingAddCustomSubscription: false,
  loadingRefreshSubscriptions: false,
};

const actions = { ...SettingActions, ...SubscriptionActions };

type Action = ActionType<typeof actions>;

export const loadingReducer = (state: LoadingState = initialState, action: Action) => {
  switch (action.type) {
    case getType(SettingActions.addCustomSubscription.request): {
      return { ...state, loadingAddCustomSubscription: true };
    }
    case getType(SettingActions.addCustomSubscription.success):
    case getType(SettingActions.addCustomSubscription.failure): {
      return { ...state, loadingAddCustomSubscription: false };
    }
    case getType(SubscriptionActions.refreshSubscriptions.request): {
      return {
        ...state,
        loadingRefreshSubscriptions: true,
      };
    }
    case getType(SubscriptionActions.refreshSubscriptions.success):
    case getType(SubscriptionActions.refreshSubscriptions.failure): {
      return {
        ...state,
        loadingRefreshSubscriptions: false,
      };
    }
    default: {
      return state;
    }
  }
};
