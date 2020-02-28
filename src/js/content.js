import App from "./App.jsx";
import React from "react";
import { render } from "react-dom";

// Sync if already in storage
chrome.storage.sync.get("isActive", function(data) {
  if (data.isActive !== false) {
    const app = document.createElement("div");
    document.body.appendChild(app);
    render(<App />, app);
  }
});
