import { get } from './http';

export const fetchRssHubXml = async (path: string) => {
  const data = await get(path);
  if (data.status !== 200) {
    throw new Error('捕获异常状态码');
  }
  return data;
};

export const fetchFaviconFile = async (url: string) => {
  const data = await get(
    url,
    {},
    {
      headers: {
        'content-type': 'image/x-icon',
      },
    }
  );
  return data;
};
