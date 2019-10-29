import { ActionType, getType } from 'typesafe-actions';

import * as actions from './actions';
import { SubscriptionList } from './types';

export type SubscriptionState = Readonly<{
  list: SubscriptionList;
  activeSubList?: string;
  refreshSubscriptions: boolean;
  enabledSubscriptions: string[];
  remindSubscriptions: string[];
}>;

const initialState: SubscriptionState = {
  list: {},
  refreshSubscriptions: false,
  activeSubList: 'jiemian/list/35',
  enabledSubscriptions: ['jiemian/list/35'],
  remindSubscriptions: [],
};

type Action = ActionType<typeof actions>;

export const subscriptionReducer = (state: SubscriptionState = initialState, action: Action) => {
  switch (action.type) {
    case getType(actions.setSubscription): {
      const { link, data } = action.payload;
      return {
        ...state,
        list: {
          ...state.list,
          [link]: data,
        },
      };
    }
    case getType(actions.setActiveSubList): {
      return {
        ...state,
        activeSubList: action.payload,
      };
    }
    case getType(actions.refreshSubscriptions.request): {
      return {
        ...state,
        refreshSubscriptions: true,
      };
    }
    case getType(actions.refreshSubscriptions.success):
    case getType(actions.refreshSubscriptions.failure): {
      return {
        ...state,
        refreshSubscriptions: false,
      };
    }
    case getType(actions.setEnabledSubscriptions): {
      return {
        ...state,
        enabledSubscriptions: action.payload,
      };
    }
    case getType(actions.setRemindSubscriptions): {
      return {
        ...state,
        remindSubscriptions: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
