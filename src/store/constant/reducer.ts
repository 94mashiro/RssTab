import { ActionType } from 'typesafe-actions';

export type ConstantState = {
  searchEngines: SearchEngine[];
  version: string;
  homepage: string;
};

export type Site = {
  name: string;
  category: string;
  link: string;
  favicon?: string;
  order: number;
};

export type SearchEngine = {
  name: string;
  pattern: string;
};

type Action = ActionType<typeof Array>;

const initialState: ConstantState = {
  searchEngines: [
    {
      name: 'Google',
      pattern: 'https://www.google.com/search?q=#REPLACE#',
    },
    {
      name: 'Baidu',
      pattern: 'https://www.baidu.com/s?wd=#REPLACE#',
    },
    {
      name: 'DuckDuckGo',
      pattern: 'https://duckduckgo.com/?q=#REPLACE#',
    },
    {
      name: 'Bing',
      pattern: 'https://www.bing.com/search?q=#REPLACE#',
    },
    {
      name: 'Yandex',
      pattern: 'https://yandex.com/search/?text=#REPLACE#',
    },
    {
      name: '掘金',
      pattern: 'https://juejin.im/search?query=#REPLACE#&type=all',
    },
  ],
  version: '1.1.1',
  homepage: 'https://github.com/mashirowang/rsstab',
};

export const constantReducer = (state: ConstantState = initialState, action: Action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
