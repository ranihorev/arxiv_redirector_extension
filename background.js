const host = "http://localhost:3000/paper/";
const icons = {off: "icons/icon_off_32.png", on: "icons/icon_on_32.png"};

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    chrome.storage.sync.get(['isActive'], function(result) {
      if (!result.isActive) return;
      const reg = /(\d+).(\d+)/;
      try {
        const id = reg.exec(details.url)[0];
        return {redirectUrl: host + id};
      } catch (e) {
        console.log(e);
      }
    });
  },
  {
    urls: [
      "*://arxiv.org/pdf/*"
    ],
    types: ["main_frame"]
  },
  ["blocking"]
);

chrome.browserAction.onClicked.addListener(function(tab) {
  // chrome.storage.sync.set({ "isActive": false })
  chrome.storage.sync.get(['isActive'], function(items) {
    chrome.browserAction.setIcon({path: items.isActive ? icons.off : icons.on});
    chrome.storage.sync.set({ "isActive": !items.isActive });
  });
});