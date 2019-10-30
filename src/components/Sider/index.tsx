import './index.scss';

import { Badge, Button, Dropdown, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Site } from '../../store/constant/reducer';
import { setShowAddSubscriptionModal } from '../../store/modal/actions';
import { removeCustomSubscription } from '../../store/setting/actions';
import { setActiveSubList } from '../../store/subscription/actions';
import { activeSubscriptionsSelector } from '../../store/subscription/selector';
import SubscriptionFavicon from '../SubscriptionFavicon';
import VersionBar from '../VersionBar';

const Sider: React.FC = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<Site>();
  const rssEndpoints = useSelector(activeSubscriptionsSelector);
  const activeRssList = useSelector((state: RootState) => {
    return state.subscription.activeSubList ? [state.subscription.activeSubList] : [];
  });
  const dispatch = useDispatch();

  const handleClickMenuItem = useCallback(
    (params: ClickParam) => {
      const { key } = params;
      dispatch(setActiveSubList(key));
      const listDOM = document.querySelector('.virtualize-list') as HTMLDivElement;
      if (listDOM) {
        listDOM.scrollTo(0, 0);
      }
    },
    [dispatch]
  );

  const remindSubscriptions = useSelector(
    (state: RootState) => state.subscription.remindSubscriptions
  );

  const handleClickContextMenuItem = useCallback(
    (param: ClickParam) => {
      const { key, domEvent } = param;
      // 阻止事件冒泡被外层 SiderMenu 组件的 onClick 事件捕获
      domEvent.stopPropagation();
      if (!activeMenuItem) {
        return;
      }
      switch (key) {
        case 'DELETE': {
          dispatch(removeCustomSubscription(activeMenuItem));
          return false;
        }
        default: {
          return false;
        }
      }
    },
    [activeMenuItem, dispatch]
  );

  const menu = useMemo(
    () => (
      <Menu onClick={handleClickContextMenuItem}>
        <Menu.Item key="DELETE">删除</Menu.Item>
      </Menu>
    ),
    [handleClickContextMenuItem]
  );

  const handleClickAddSubscriptionButton = useCallback(() => {
    dispatch(setShowAddSubscriptionModal(true));
  }, [dispatch]);

  const handleSetActiveMenuItem = useCallback((visible: boolean, endpoint: Site) => {
    if (visible) {
      setActiveMenuItem(endpoint);
    }
  }, []);

  return (
    <div className="sider">
      <div className="sider-menu">
        <Menu mode="inline" selectedKeys={activeRssList} onClick={handleClickMenuItem}>
          {rssEndpoints.map(endpoint => (
            <Menu.Item key={endpoint.link}>
              <Dropdown
                overlay={menu}
                trigger={['contextMenu']}
                onVisibleChange={(visible: boolean) => handleSetActiveMenuItem(visible, endpoint)}
              >
                <div style={{ userSelect: 'none' }}>
                  {/* <div
                    style={{
                      display: 'inline-flex',
                      height: 14,
                      width: 14,
                      borderRadius: 4,
                      border: '2px solid #9fa5b1',
                      marginRight: 8,
                    }}
                  >
                    <img
                      style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                        borderRadius: 2,
                      }}
                      src={endpoint.favicon}
                      alt=""
                    />
                  </div> */}
                  <SubscriptionFavicon favicon={endpoint.favicon} />
                  <Badge dot={remindSubscriptions.includes(endpoint.link)}>{endpoint.name}</Badge>
                </div>
              </Dropdown>
            </Menu.Item>
          ))}
        </Menu>
      </div>
      <div className="sider-footer">
        <Button className="add-button" icon="plus" block onClick={handleClickAddSubscriptionButton}>
          添加订阅
        </Button>
        <VersionBar />
      </div>
    </div>
  );
};

export default Sider;
