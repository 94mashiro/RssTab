import Axios, { AxiosRequestConfig } from 'axios';

const axios = Axios.create({
  baseURL: 'https://rss.usememo.dev/',
  timeout: 60000,
});

export const get = (
  endpoint: string,
  params: Record<string, any> = {},
  config: AxiosRequestConfig = {}
) => {
  return axios.get(endpoint, {
    ...config,
    params,
  });
};
