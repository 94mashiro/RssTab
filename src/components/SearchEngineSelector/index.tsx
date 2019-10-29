import './index.scss';

import { Icon, Menu, Popover } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { setActiveSearchEngine } from '../../store/setting/actions';

const SearchEngineSelector: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const activeSearchEngine = useSelector((state: RootState) => state.setting.activeSearchEngine);
  const searchEngines = useSelector((state: RootState) => state.constant.searchEngines);
  const dispatch = useDispatch();
  const handleSelectSearchEngine = useCallback(
    (params: ClickParam) => {
      const { key } = params;
      dispatch(setActiveSearchEngine(key));
      setShowDropdown(false);
    },
    [dispatch, setShowDropdown]
  );
  const selectedKeys = useMemo(() => {
    return [activeSearchEngine];
  }, [activeSearchEngine]);
  const content = useMemo(
    () => (
      <Menu onClick={handleSelectSearchEngine} selectedKeys={selectedKeys}>
        {searchEngines.map(engine => (
          <Menu.Item key={engine.name}>{engine.name}</Menu.Item>
        ))}
      </Menu>
    ),
    [searchEngines, selectedKeys]
  );
  return (
    <Popover
      visible={showDropdown}
      content={content}
      onVisibleChange={setShowDropdown}
      trigger="click"
      align={{
        offset: [20, 20],
      }}
      overlayClassName="search-engine-dropdown"
    >
      <div className="search-engine-selector">
        <div style={{ minWidth: 50 }}>{activeSearchEngine}</div>
        <Icon type={showDropdown ? 'caret-up' : 'caret-down'} />
      </div>
    </Popover>
  );
};

export default SearchEngineSelector;
