import './index.scss';

import React, { useCallback, useMemo, useState } from 'react';

import RssIcon from '../../assets/image/rss.png';

interface Props {
  favicon?: string;
}

const SubscriptionFavicon: React.FC<Props> = (props: Props) => {
  const { favicon } = props;
  const [hasError, setHasError] = useState(favicon ? false : true);
  const handleFetchFaviconError = useCallback(() => {
    setHasError(true);
  }, []);
  const faviconSrc = useMemo(() => {
    return hasError ? RssIcon : favicon;
  }, [favicon, hasError]);
  return (
    <div className="subscription-favicon">
      <img src={faviconSrc} onError={handleFetchFaviconError} />
    </div>
  );
};

export default SubscriptionFavicon;
