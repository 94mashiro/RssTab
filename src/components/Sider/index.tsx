import React, { useCallback } from 'react';
import { Menu, Badge } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { ClickParam } from 'antd/lib/menu';
import { setActiveSubList } from '../../store/subscription/actions';
import './index.scss';
import { activeSubscriptionsSelector } from '../../store/subscription/selector';

const Sider: React.FC = () => {
  const rssEndpoints = useSelector(activeSubscriptionsSelector);
  const activeRssList = useSelector((state: RootState) => {
    return state.subscription.activeSubList ? [state.subscription.activeSubList] : [];
  });
  const dispatch = useDispatch();

  const handleClickMenuItem = useCallback((params: ClickParam) => {
    const { key } = params;
    dispatch(setActiveSubList(key));
    const listDOM = document.querySelector('.virtualize-list') as HTMLDivElement;
    if (listDOM) {
      listDOM.scrollTo(0, 0);
    }
  }, []);

  const remindSubscriptions = useSelector((state: RootState) => state.subscription.remindSubscriptions);

  return (
    <Menu
      mode="inline"
      style={{ height: '100%', borderRight: 0 }}
      selectedKeys={activeRssList}
      onClick={handleClickMenuItem}
    >
      {rssEndpoints.map(endpoint => (
        <Menu.Item key={endpoint.link}>
          <div
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
              style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: 2 }}
              src={endpoint.favicon}
              alt=""
            />
          </div>
          <Badge dot={remindSubscriptions.includes(endpoint.link)}>{endpoint.name}</Badge>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Sider;
