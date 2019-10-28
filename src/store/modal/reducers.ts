import * as actions from './actions';
import { ActionType, getType } from 'typesafe-actions';

export type ModalState = {
  showSubscriptionsSettingModal: boolean;
};

type Action = ActionType<typeof actions>;

const initialState: ModalState = {
  showSubscriptionsSettingModal: false,
};

export const modalReducer = (state: ModalState = initialState, action: Action) => {
  switch (action.type) {
    case getType(actions.setShowSubscriptionsSettingModal): {
      return {
        ...state,
        showSubscriptionsSettingModal: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
