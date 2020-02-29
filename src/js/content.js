import App from "./App.jsx";
import React from "react";
import { render } from "react-dom";

// Sync if already in storage
chrome.storage.sync.get(["isActive", "blacklist"], data => {
  if (data.isActive === false) return;
  const url = new URL(window.location);
  let enabled = true;
  if (data.blacklist) {
    enabled = !data.blacklist.includes(url.host);
  }
  const app = document.createElement("div");
  document.body.appendChild(app);
  render(<App enabled={enabled} />, app);
});
