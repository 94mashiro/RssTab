import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { constantReducer, ConstantState } from './constant/reducer';
import { loadingReducer, LoadingState } from './loading/reducer';
import { modalReducer, ModalState } from './modal/reducers';
import { settingReducer, SettingState } from './setting/reducer';
import { settingSaga } from './setting/sagas';
import { subscriptionReducer, SubscriptionState } from './subscription/reducer';
import { subscriptionSaga } from './subscription/sagas';

export type RootState = {
  subscription: SubscriptionState;
  setting: SettingState;
  constant: ConstantState;
  modal: ModalState;
  loading: LoadingState;
};

const reducers = combineReducers({
  subscription: subscriptionReducer,
  setting: settingReducer,
  constant: constantReducer,
  modal: modalReducer,
  loading: loadingReducer,
});

export const rootSaga = function* root() {
  yield all([fork(subscriptionSaga), fork(settingSaga)]);
};

export default reducers;
