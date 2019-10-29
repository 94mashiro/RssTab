import './index.scss';

import { Layout } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from '../../components/Header';
import RefreshButton from '../../components/RefreshButton';
import RssList from '../../components/RssList';
import Sider from '../../components/Sider';
import SubscriptionsSettingModal from '../../components/SubscriptionsSettingModal';
import { refreshSubscriptions } from '../../store/subscription/actions';

const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshSubscriptions.request({ showMessage: false }));
  }, []);

  return (
    <Layout style={{ height: '100%' }}>
      <Layout.Header
        style={{
          background: '#fff',
          padding: 0,
          height: 54,
          boxShadow: '0 1px 5px #ddd',
          zIndex: 1,
        }}
      >
        <Header />
      </Layout.Header>
      <Layout.Content>
        <Layout style={{ height: '100%', maxWidth: 800, margin: '0 auto' }}>
          <Layout.Sider
            width={200}
            style={{
              background: '#fff',
              overflowY: 'auto',
              overflowX: 'hidden',
              borderRight: '1px solid #eee',
            }}
          >
            <Sider />
          </Layout.Sider>
          <Layout.Content style={{ backgroundColor: '#fff' }}>
            <RssList />
            <SubscriptionsSettingModal />
            <RefreshButton />
          </Layout.Content>
        </Layout>
      </Layout.Content>
    </Layout>
  );
};

export default MainLayout;
