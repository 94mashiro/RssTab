import React, { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import RssListItem from '../RssListItem';
import { get } from 'lodash-es';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

import './index.scss';
const RssList: React.FC = () => {
  const listItems = useSelector((state: RootState) => {
    const activeRssList = state.subscription.activeSubList || '';
    const list = get(state.subscription, ['list', activeRssList, 'items']) || [];
    const sortedList = list.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    return sortedList;
  });
  const itemCount = useMemo(() => {
    return listItems.length;
  }, [listItems]);
  const renderRow = useCallback(
    ({ index, style }) => {
      const item = listItems[index];
      const { link, title, description, pubDate } = item;
      return (
        <div
          style={{
            ...style,
            margin: '20px 0',
            padding: '0 24px',
          }}
        >
          <RssListItem key={link} title={title} description={description} link={link} pubdate={pubDate} />
        </div>
      );
    },
    [listItems]
  );
  return listItems.length > 0 ? (
    <AutoSizer>
      {({ height, width }) => (
        <List height={height} width={width} itemCount={itemCount} itemSize={130} className="virtualize-list">
          {renderRow}
        </List>
      )}
    </AutoSizer>
  ) : null;
};

export default RssList;
