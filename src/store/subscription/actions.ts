import { createAction, createAsyncAction } from 'typesafe-actions';
import { SubscriptionActionTypes, Subscription } from './types';

export const refreshSubscriptions = createAsyncAction(
  SubscriptionActionTypes.REFRESH_SUBSCRIPTIONS_REQUEST,
  SubscriptionActionTypes.REFRESH_SUBSCRIPTIONS_SUCCESS,
  SubscriptionActionTypes.REFRESH_SUBSCRIPTIONS_FAILURE
)<{ showMessage: boolean }, undefined, Error>();

export const setActiveSubList = createAction(SubscriptionActionTypes.SET_ACTIVE_SUB_LIST, action => {
  return (link: string) => action(link);
});

export const setSubscription = createAction(SubscriptionActionTypes.SET_SUBSCRIPTION, action => {
  return ({ link, data }: { link: string; data: Subscription }) => action({ link, data });
});

export const setEnabledSubscriptions = createAction(SubscriptionActionTypes.SET_ENABLED_SUBSCRIPTIONS, action => {
  return (subscriptions: string[]) => action(subscriptions);
});

export const setRemindSubscriptions = createAction(SubscriptionActionTypes.SET_REMIND_SUBSCRIPTIONS, action => {
  return (subscriptions: string[]) => action(subscriptions);
});
