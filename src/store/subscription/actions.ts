import { createAction, createAsyncAction } from 'typesafe-actions';

import { Subscription, SubscriptionActionTypes } from './types';

export const refreshSubscriptions = createAsyncAction(
  SubscriptionActionTypes.REFRESH_SUBSCRIPTIONS_REQUEST,
  SubscriptionActionTypes.REFRESH_SUBSCRIPTIONS_SUCCESS,
  SubscriptionActionTypes.REFRESH_SUBSCRIPTIONS_FAILURE
)<{ showMessage: boolean }, undefined, Error>();

export const setActiveSubList = createAction(
  SubscriptionActionTypes.SET_ACTIVE_SUB_LIST,
  (link: string) => link
)();

export const setSubscription = createAction(
  SubscriptionActionTypes.SET_SUBSCRIPTION,
  ({ link, data }: { link: string; data: Subscription }) => ({ link, data })
)();

export const setEnabledSubscriptions = createAction(
  SubscriptionActionTypes.SET_ENABLED_SUBSCRIPTIONS,
  (subscriptions: string[]) => subscriptions
)();

export const setRemindSubscriptions = createAction(
  SubscriptionActionTypes.SET_REMIND_SUBSCRIPTIONS,
  (subscriptions: string[]) => subscriptions
)();
