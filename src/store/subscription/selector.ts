import { createSelector } from 'reselect';
import { RootState } from '..';

export const activeSubscriptionsSelector = createSelector(
  (state: RootState) => state.constant.rssEndpoints,
  (state: RootState) => state.subscription.enabledSubscriptions,
  (rssEndpoints, enabledSubscriptions) => {
    return rssEndpoints
      .filter(endpoint => enabledSubscriptions.includes(endpoint.link))
      .sort((a, b) => a.order - b.order);
  }
);
