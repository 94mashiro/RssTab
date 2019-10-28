import React from 'react';
import { Icon } from 'antd';
import SearchEngineSelector from '../SearchEngineSelector';
import './index.scss';
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
