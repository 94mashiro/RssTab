import { combineReducers } from 'redux';
import { SubscriptionState, subscriptionReducer } from './subscription/reducer';
import { SettingState, settingReducer } from './setting/reducer';
import { all, fork } from 'redux-saga/effects';
import { subscriptionSaga } from './subscription/sagas';
import { settingSaga } from './setting/sagas';
import { ConstantState, constantReducer } from './constant/reducer';
import { ModalState, modalReducer } from './modal/reducers';

export type RootState = {
  subscription: SubscriptionState;
  setting: SettingState;
  constant: ConstantState;
  modal: ModalState;
};

const reducers = combineReducers({
  subscription: subscriptionReducer,
  setting: settingReducer,
  constant: constantReducer,
  modal: modalReducer,
});

export const rootSaga = function* root() {
  yield all([fork(subscriptionSaga), fork(settingSaga)]);
};

export default reducers;
