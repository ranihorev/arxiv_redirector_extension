import * as icon_off_32 from "../img/icon_off_32.png";
import * as icon_on_32 from "../img/icon_on_32.png";
require("./importIcons");

const host = "https://www.scihive.org/paper/";
const icons = {
  off: icon_off_32,
  on: icon_on_32,
};
const ignoreString = "download=1";
let isActive;

// Sync if already in storage
chrome.storage.sync.get("isActive", function (data) {
  if (data.isActive !== undefined) {
    isActive = data.isActive;
  } else {
    // First run;
    isActive = true;
    chrome.storage.sync.set({ isActive });
  }
});

// Update state on change
chrome.storage.onChanged.addListener(function (changes, area) {
  if (area == "sync" && "isActive" in changes) {
    isActive = changes.isActive.newValue;
    chrome.browserAction.setIcon({ path: isActive ? icons.on : icons.off });
  }
});

// chrome.webRequest.onBeforeRequest.addListener(
//   function(details) {
//     if (!isActive) return;
//     if (details.url.indexOf(ignoreString) > 0) return;
//     try {
//       const regResult = /(?<paperId>(\d{4}\.\d{4,5})|([a-zA-Z\-.]+\/\d{6,10}))(v(?<version>\d+))?(\.pdf)?$/.exec(
//         details.url
//       );
//       if (regResult && regResult.groups) {
//         return { redirectUrl: host + regResult.groups.paperId };
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   },
//   {
//     urls: ["*://arxiv.org/*.pdf", "*://www.arxiv.org/*.pdf"],
//     types: ["main_frame"]
//   },
//   ["blocking"]
// );

chrome.runtime.onMessageExternal.addListener(
  (message, sender, sendResponse) => {
    if (message == "version") {
      const manifest = chrome.runtime.getManifest();
      sendResponse({ type: "success", version: manifest.version });
      return true;
    }
    return true;
  }
);

// Set state on click
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.storage.sync.set({ isActive: !isActive });
});
