import React, { useCallback, useState } from 'react';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { searchKeywordAction } from '../../store/setting/actions';
import './index.scss';

const SearchInput: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const handleKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13 && keyword.trim().length > 0) {
        dispatch(searchKeywordAction(keyword));
      }
    },
    [keyword]
  );
  const handleInputKeyword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
  }, []);
  return (
    <Input
      placeholder="搜索"
      onKeyDown={handleKeydown}
      value={keyword}
      onChange={handleInputKeyword}
      className="search-input"
    />
  );
};

export default SearchInput;
