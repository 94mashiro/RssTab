import React, { useMemo, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import './index.scss';

interface Props {
  title: string;
  link: string;
  description: string;
  pubdate: string;
}

const RssListItem: React.FC<Props> = (props: Props) => {
  const imgLink = useMemo(() => {
    const srcReg = /src=['"]?([^'"]*)['"]?/i;
    const matchRet = (props.description || '').match(srcReg) || [];
    return matchRet.length > 1 ? matchRet[1] : null;
  }, [props.description]);

  const safeDesc = useMemo(() => {
    return (props.description || '').replace(/<[^>]*>/gi, '');
  }, [props.description]);

  const timeAgo = useMemo(() => {
    const from = dayjs(props.pubdate);
    const now = dayjs();
    const diffMin = now.diff(from, 'minute');
    const diffHour = now.diff(from, 'hour');
    const diffDay = now.diff(from, 'day');
    const diffMonth = now.diff(from, 'month');
    const diffYear = now.diff(from, 'year');
    if (diffMin < 60) {
      return diffMin + '分钟前';
    } else if (diffHour < 24) {
      return diffHour + '小时前';
    } else if (diffDay < 31) {
      return diffDay + '天前';
    } else if (diffMonth < 12) {
      return diffMonth + '月前';
    } else {
      return diffYear + '年前';
    }
  }, [props.pubdate]);

  const [fetchImageError, setFetchImageError] = useState(false);

  const handleFetchImageError = useCallback(() => {
    setFetchImageError(true);
  }, []);

  return (
    <div className="rss-list-item">
      <a href={props.link} target="_blank">
        <div className="item-header">
          <div className="title">{props.title}</div>
          <div className="date">{timeAgo}</div>
        </div>
        <div className="desc">
          <p>{safeDesc}</p>
          {imgLink && !fetchImageError && (
            <div className="cover">
              <div className="cover-wrapper">
                <img src={imgLink} alt="" onError={handleFetchImageError} />
              </div>
            </div>
          )}
        </div>
      </a>
    </div>
  );
};

export default RssListItem;
