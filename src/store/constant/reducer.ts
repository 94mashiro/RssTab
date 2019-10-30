import { ActionType } from 'typesafe-actions';

export type ConstantState = {
  rssEndpoints: Site[];
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
  rssEndpoints: [
    {
      name: '界面新闻',
      link: '/jiemian/list/35',
      category: '传统媒体',
      favicon: 'https://www.jiemian.com/favicon.ico',
      order: 1,
    },
    {
      name: 'BBC',
      link: '/bbc/chinese',
      category: '传统媒体',
      favicon: 'https://www.bbc.com/favicon.ico',
      order: 4,
    },
    {
      name: 'Solidot',
      link: '/solidot/www',
      category: '传统媒体',
      favicon: 'https://www.solidot.org/favicon.ico',
      order: 5,
    },
    {
      name: 'NHK',
      link: '/nhk/news_web_easy',
      category: '传统媒体',
      favicon: 'https://www.nhk.or.jp/favicon.ico',
      order: 6,
    },
    {
      name: 'The Economist',
      link: '/the-economist/latest',
      category: '传统媒体',
      favicon: 'http://www.economist.com/assets/favicon.ico',
      order: 7,
    },
    {
      name: '澎湃新闻',
      link: '/thepaper/featured',
      category: '传统媒体',
      favicon: 'http://www.thepaper.cn/favicon.ico',
      order: 8,
    },
    {
      name: 'cnBeta',
      link: '/cnbeta',
      category: '新媒体',
      favicon: 'https://www.cnbeta.com/favicon.ico',
      order: 9,
    },
    {
      name: '36kr',
      link: '/36kr/newsflashes',
      category: '新媒体',
      favicon: 'http://www.36kr.com/favicon.ico',
      order: 10,
    },
    {
      name: 'Engadget',
      link: '/engadget-cn',
      category: '新媒体',
      favicon:
        'https://s.blogsmithmedia.com/www.engadget.com/assets-h045db91064c248cf4d54f147b8a59a95/images/favicon-16x16.png?h=288a0831497b5dbbde1fdb670dc8a62c',
      order: 11,
    },
    {
      name: 'InfoQ 中文',
      link: '/infoq/recommend',
      category: '新媒体',
      favicon: 'https://static001.infoq.cn/static/infoq/www/img/InfoQ-share-icon2.jpg',
      order: 12,
    },
    {
      name: 'The Verge',
      link: '/verge',
      category: '新媒体',
      favicon: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/7395367/favicon-16x16.0.png',
      order: 13,
    },
    {
      name: 'ifanr',
      link: '/ifanr/app',
      category: '新媒体',
      favicon: 'https://www.ifanr.com/favicon.ico',
      order: 14,
    },
    {
      name: '币世界',
      link: '/bishijie/kuaixun',
      category: '新媒体',
      favicon: 'https://www.bishijie.com/favicon.ico',
      order: 16,
    },
    {
      name: '后续',
      link: '/houxu/lives/new',
      category: '新媒体',
      favicon: 'https://assets-1256259474.cos.ap-shanghai.myqcloud.com/icon-180.jpg',
      order: 17,
    },
    {
      name: '虎嗅',
      link: '/huxiu/article',
      category: '新媒体',
      favicon: 'https://wwww.huxiu.com/favicon.ico',
      order: 18,
    },
    {
      name: '机核网',
      link: '/gcores/category/news',
      category: '新媒体',
      favicon: 'https://www.gcores.com/favicon.ico',
      order: 19,
    },
    {
      name: '什么值得买',
      link: '/smzdm/ranking/pinlei/11/3',
      category: '购物',
      favicon: 'https://www.smzdm.com/favicon.ico',
      order: 20,
    },
    {
      name: '大麦网',
      link: '/damai/activity/全部/全部/全部',
      category: '购物',
      favicon: 'https://www.damai.cn/favicon.ico',
      order: 21,
    },
    {
      name: '中国地震局',
      link: '/earthquake',
      category: '预报预警',
      order: 22,
    },
    {
      name: '国家应急广播网',
      link: '/cneb/yjxx',
      category: '预报预警',
      favicon: 'http://www.cneb.gov.cn/favicon.ico',
      order: 23,
    },
    {
      name: 'Dribbble',
      link: '/dribbble/popular/week',
      category: '设计',
      favicon:
        'https://cdn.dribbble.com/assets/favicon-63b2904a073c89b52b19aa08cebc16a154bcf83fee8ecc6439968b1e6db569c7.ico',
      order: 24,
    },
    {
      name: 'UI 中国',
      link: '/ui-cn/article',
      category: '设计',
      favicon: 'https://www.ui.cn/favicon.ico',
      order: 25,
    },
    {
      name: '站酷',
      link: '/zcool/recommend/all',
      category: '设计',
      favicon: 'https://www.zcool.com.cn/favicon.ico',
      order: 26,
    },
    {
      name: 'V2EX',
      link: '/v2ex/topics/latest',
      category: '论坛',
      favicon: 'https://www.v2ex.com/favicon.ico',
      order: 27,
    },
    {
      name: '虎扑步行街',
      link: '/hupu/bbs/bxj/2',
      category: '论坛',
      favicon: 'https://www.hupu.com/favicon.ico',
      order: 28,
    },
  ],
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
  version: '1.0.0',
  homepage: 'https://github.com/mashirowang/rsstab',
};

export const constantReducer = (state: ConstantState = initialState, action: Action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
