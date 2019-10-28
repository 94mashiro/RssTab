export enum SubscriptionActionTypes {
  REFRESH_SUBSCRIPTIONS_REQUEST = '@@subscription/REFRESH_SUBSCRIPTIONS_REQUEST',
  REFRESH_SUBSCRIPTIONS_SUCCESS = '@@subscription/REFRESH_SUBSCRIPTIONS_SUCCESS',
  REFRESH_SUBSCRIPTIONS_FAILURE = '@@subscription/REFRESH_SUBSCRIPTIONS_FAILURE',
  SET_ACTIVE_SUB_LIST = '@@subscription/SET_ACTIVE_SUB_LIST',
  SET_SUBSCRIPTION = '@@subscription/SET_SUBSCRIPTION',
  SET_ENABLED_SUBSCRIPTIONS = '@@subscription/SET_ENABLED_SUBSCRIPTIONS',
  SET_REMIND_SUBSCRIPTIONS = '@@subscription/SET_REMIND_SUBSCRIPTIONS',
}

export type Subscription = {
  title: string;
  link: string;
  description: string;
  items: Article[];
};

export type Article = {
  title: string;
  description: string;
  pubDate: string;
  guid: string;
  link: string;
  author: string;
};

export type SubscriptionList = {
  [link: string]: Subscription;
};
