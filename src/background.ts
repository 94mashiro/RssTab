import { browser } from 'webextension-polyfill-ts';

const main = () => {
  try {
    browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      // 用户切换 tab，会弹出警告框
      console.log(tab.url);
    });
  } catch (err) {
    console.error('WRONG ENV:', err.message);
  }
};

main();
