import { Button } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { refreshSubscriptions } from '../../store/subscription/actions';

const RefreshButton: React.FC = () => {
  const refreshing = useSelector((state: RootState) => state.subscription.refreshSubscriptions);
  const dispatch = useDispatch();
  const handleClickRefreshButton = useCallback(() => {
    dispatch(refreshSubscriptions.request({ showMessage: true }));
  }, []);
  return (
    <Button
      type="primary"
      shape="circle"
      icon="sync"
      size="large"
      style={{ position: 'fixed', right: 30, bottom: 30 }}
      onClick={handleClickRefreshButton}
      loading={refreshing}
    />
  );
};

export default RefreshButton;
