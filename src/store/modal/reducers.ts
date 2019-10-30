import { ActionType, getType } from 'typesafe-actions';

import * as actions from './actions';

export type ModalState = {
  showSubscriptionsSettingModal: boolean;
  showAddSubscriptionModal: boolean;
};

type Action = ActionType<typeof actions>;

const initialState: ModalState = {
  showSubscriptionsSettingModal: false,
  showAddSubscriptionModal: false,
};

export const modalReducer = (state: ModalState = initialState, action: Action) => {
  switch (action.type) {
    case getType(actions.setShowSubscriptionsSettingModal): {
      return {
        ...state,
        showSubscriptionsSettingModal: action.payload,
      };
    }
    case getType(actions.setShowAddSubscriptionModal): {
      return {
        ...state,
        showAddSubscriptionModal: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
