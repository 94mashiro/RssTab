import { ActionType, getType } from 'typesafe-actions';

import * as SettingActions from './actions';

export type SettingState = Readonly<{
  activeSearchEngine: string;
  showSubscribeSettingModal: boolean;
}>;

const initialState: SettingState = {
  activeSearchEngine: 'Google',
  showSubscribeSettingModal: false,
};

type Action = ActionType<typeof SettingActions>;

export const settingReducer = (state: SettingState = initialState, action: Action) => {
  switch (action.type) {
    case getType(SettingActions.setActiveSearchEngine): {
      return { ...state, activeSearchEngine: action.payload };
    }
    default: {
      return state;
    }
  }
};
