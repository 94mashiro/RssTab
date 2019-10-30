import Axios, { AxiosRequestConfig } from 'axios';

const axios = Axios.create({
  baseURL: 'https://rss.usememo.dev/',
  timeout: 60000,
});

axios.interceptors.response.use(
  config => {
    return config;
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 404: {
          error.message = '请求错误，未找到该资源';
          break;
        }
        default: {
          error.message = `连接错误：${error.response.status}`;
        }
      }
    } else {
      error.message = '连接到服务器失败';
    }
    return Promise.reject(error.message);
  }
);

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
