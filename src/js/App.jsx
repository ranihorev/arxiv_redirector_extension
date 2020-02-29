/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import ReactHintFactory from "react-hint";
import "../styles.css";
import * as icon from "../img/iconWhite.png";
import * as iconWithText from "../img/scihive_white.png";

const ReactHint = ReactHintFactory(React);

const Button = ({ onClick, children }) => {
  return (
    <button
      style={{
        padding: 5,
        width: 60,
        borderRadius: 4,
        cursor: "pointer",
        lineHeight: 1,
        fontSize: 12,
        border: "none"
      }}
      css={{
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: "#dedede"
        }
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const DisabledMode = ({ onShow }) => {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 99999999,
        bottom: 6,
        left: 6
      }}
    >
      <img
        src={chrome.runtime.getURL(icon)}
        height={16}
        style={{ marginRight: 10, cursor: "pointer" }}
        data-rh="Click to re-activate domain"
        data-rh-at="right"
        onClick={() => {
          const { host } = new URL(window.location);
          chrome.storage.sync.get(["blacklist"], data => {
            let blacklist = data.blacklist;
            if (blacklist) {
              blacklist = blacklist.filter(currentHost => currentHost !== host);
              chrome.storage.sync.set({ blacklist });
            }
            onShow();
          });
        }}
      />
    </div>
  );
};

const ActiveMode = ({ onHide }) => {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 99999999,
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#36a0f5"
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          padding: "12px 24px",
          fontFamily: "Arial",
          fontSize: 14,
          color: "white"
        }}
      >
        <a href="https://www.scihive.org" target="_blank">
          <img
            src={chrome.runtime.getURL(iconWithText)}
            height={20}
            style={{ marginRight: 10 }}
          />
        </a>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <div style={{ marginRight: 10 }}>
            PDF file was detected. Would you like to read it on SciHive?
          </div>
          <a
            href={`https://www.scihive.org/library?upload_link=${window.location}`}
            style={{ marginRight: 10 }}
          >
            <Button>Yes</Button>
          </a>
          <Button onClick={onHide}>No</Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <div
            style={{ fontSize: 10, lineHeight: 1, cursor: "pointer" }}
            css={{ "&:hover": { textDecoration: "underline" } }}
            onClick={() => {
              const url = new URL(window.location);
              chrome.storage.sync.get(["blacklist"], data => {
                let blacklist = data.blacklist;
                if (!blacklist) blacklist = [];
                if (!blacklist.includes(url.host)) {
                  blacklist.push(url.host);
                  chrome.storage.sync.set({ blacklist });
                }
                onHide();
              });
            }}
          >
            Never for this domain
          </div>
        </div>
      </div>
    </div>
  );
};

const App = ({ enabled }) => {
  const [isHidden, setIsHidden] = React.useState(!enabled);
  return (
    <React.Fragment>
      <ReactHint events={{ hover: true }} delay={{ show: 300 }} />
      {isHidden ? (
        <DisabledMode onShow={() => setIsHidden(false)} />
      ) : (
        <ActiveMode onHide={() => setIsHidden(true)} />
      )}
    </React.Fragment>
  );
};

export default App;
