import './index.scss';

import { Icon } from 'antd';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';

const VersionBar: React.FC = () => {
  const extensionVersion = useSelector((state: RootState) => state.constant.version);
  const extensionHomepage = useSelector((state: RootState) => state.constant.homepage);
  const handleNavToGithubPage = useCallback(() => {
    window.open(extensionHomepage);
  }, [extensionHomepage]);
  return (
    <div className="version-bar">
      <span>RssTab {extensionVersion}</span>
      <Icon type="github" onClick={handleNavToGithubPage} />
    </div>
  );
};

export default VersionBar;
