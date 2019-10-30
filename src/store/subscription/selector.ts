import { createSelector } from 'reselect';

import { RootState } from '..';

export const activeSubscriptionsSelector = createSelector(
  (state: RootState) => state.setting.customSubscriptions,
  (state: RootState) => state.subscription.enabledSubscriptions,
  (customSubscriptions, enabledSubscriptions) => {
    return customSubscriptions
      .filter(endpoint => enabledSubscriptions.includes(endpoint.link))
      .sort((a, b) => a.order - b.order);
  }
);
