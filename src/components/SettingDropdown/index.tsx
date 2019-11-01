import './index.scss';

import { Dropdown, Icon, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

const SettingDropdown: React.FC = () => {
  const dispatch = useDispatch();

  const handleClickMenu = useCallback((param: ClickParam) => {
    const { key } = param;
    if (key === 'SUBSCRIPTIONS_SETTING') {
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
    [handleClickMenu]
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
