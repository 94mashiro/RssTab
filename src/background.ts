chrome.tabs.onCreated.addListener(() => {
  chrome.tabs.query({ title: 'RssTab', active: false }, oldTabs => {
    oldTabs.forEach(tab => {
      if (tab.id != null) {
        chrome.tabs.remove(tab.id);
      }
    });
  });
});
