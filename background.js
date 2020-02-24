const host = 'https://www.scihive.org/paper/';
const icons = {
  off: 'icons/icon_off_32.png',
  on: 'icons/icon_on_32.png'
};
const ignoreString = 'download=1';
let isActive;

// Sync if already in storage
chrome.storage.sync.get('isActive', function(data) {
  if (data.isActive !== undefined) {
    isActive = data.isActive;
  }
});

// Update state on change
chrome.storage.onChanged.addListener(function(changes, area) {
  if (area == 'sync' && 'isActive' in changes) {
    isActive = changes.isActive.newValue;
    chrome.browserAction.setIcon({path: isActive ? icons.on : icons.off});
  }
});

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if (!isActive) return;
      const reg = /(\d+)\.(\d+)/;
      if (details.url.indexOf(ignoreString) > 0) return;
      try {
        const id = reg.exec(details.url);
        if (id) return {redirectUrl: host + id[0]};
      } catch (e) {
        console.log(e);
      }
    },
    {
      urls: [
        '*://arxiv.org/pdf/*',
        '*://www.arxiv.org/pdf/*',
      ],
      types: ['main_frame']
    },
    ['blocking']);

chrome.runtime.onMessageExternal.addListener(
    (message, sender, sendResponse) => {
      if (message == 'version') {
        const manifest = chrome.runtime.getManifest();
        sendResponse({type: 'success', version: manifest.version});
        return true;
      }
      return true;
    });

/* when the toolbar button is clicked, insert a script to extract data from the current tab */
chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.executeScript(null, { file: "extract.js" }, function(result) {
    window.open("http://www.scihive.org/import/?" + build_params(result[0]), "SciHive", "width=980,height=670");
  });
});

// Set state on click
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('click' + isActive);
  chrome.storage.sync.set({'isActive': !isActive});
});
