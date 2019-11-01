chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.title === 'RssTab') {
    chrome.tabs.query({ url: 'chrome://newtab/' }, oldTabs => {
      oldTabs
        .filter(tab => tab.id !== tabId)
        .forEach(tab => {
          if (tab.id != null) {
            chrome.tabs.remove(tab.id);
          }
        });
    });
  }
});
