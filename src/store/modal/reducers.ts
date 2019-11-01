import { ActionType, getType } from 'typesafe-actions';

import * as actions from './actions';

export type ModalState = {
  showAddSubscriptionModal: boolean;
};

type Action = ActionType<typeof actions>;

const initialState: ModalState = {
  showAddSubscriptionModal: false,
};

export const modalReducer = (state: ModalState = initialState, action: Action) => {
  switch (action.type) {
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
