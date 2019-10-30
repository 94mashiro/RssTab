import { ActionType, getType } from 'typesafe-actions';

import { Site } from '../constant/reducer';
import * as SettingActions from './actions';

export type SettingState = Readonly<{
  activeSearchEngine: string;
  showSubscribeSettingModal: boolean;
  customSubscriptions: Site[];
}>;

const initialState: SettingState = {
  activeSearchEngine: 'Google',
  showSubscribeSettingModal: false,
  customSubscriptions: [],
};

type Action = ActionType<typeof SettingActions>;

export const settingReducer = (state: SettingState = initialState, action: Action) => {
  switch (action.type) {
    case getType(SettingActions.setActiveSearchEngine): {
      return { ...state, activeSearchEngine: action.payload };
    }
    case getType(SettingActions.setCustomSubscriptons): {
      return { ...state, customSubscriptions: action.payload };
    }
    default: {
      return state;
    }
  }
};
