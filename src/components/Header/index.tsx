import './index.scss';

import { Icon } from 'antd';
import React from 'react';

import SearchEngineSelector from '../SearchEngineSelector';
import SearchInput from '../SearchInput';
import SettingDropdown from '../SettingDropdown';

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="search-area">
        <SearchEngineSelector />
        <SearchInput />
      </div>
      <div className="action-area">
        <SettingDropdown />
      </div>
    </div>
  );
};

export default Header;
