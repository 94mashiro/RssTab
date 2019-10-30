import './index.scss';

import { Icon } from 'antd';
import React, { useCallback } from 'react';

const VersionBar: React.FC = () => {
  const handleNavToGithubPage = useCallback(() => {
    window.open('https://github.com/mashirowang/rsstab');
  }, []);
  return (
    <div className="version-bar">
      <span>RssTab 1.0.0</span>
      <Icon type="github" onClick={handleNavToGithubPage} />
    </div>
  );
};

export default VersionBar;
