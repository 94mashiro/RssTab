import React, { useMemo, useCallback } from 'react';
import { Icon, Dropdown, Menu } from 'antd';
import { useDispatch } from 'react-redux';
import './index.scss';
import { ClickParam } from 'antd/lib/menu';
import { setShowSubscriptionsSettingModal } from '../../store/modal/actions';

const SettingDropdown: React.FC = () => {
  const dispatch = useDispatch();

  const handleClickMenu = useCallback((param: ClickParam) => {
    const { key } = param;
    if (key === 'SUBSCRIPTIONS_SETTING') {
      dispatch(setShowSubscriptionsSettingModal(true));
    }
  }, []);

  const menu = useMemo(
    () => (
      <Menu onClick={handleClickMenu}>
        <Menu.Item key="SUBSCRIPTIONS_SETTING" style={{ fontSize: 12, color: '#8e8e93' }}>
          <Icon type="pushpin" style={{ marginRight: 8 }} />
          订阅管理
        </Menu.Item>
      </Menu>
    ),
    []
  );

  return (
    <Dropdown overlay={menu}>
      <span className="setting-dropdown">
        <Icon type="setting" />
      </span>
    </Dropdown>
  );
};

export default SettingDropdown;
