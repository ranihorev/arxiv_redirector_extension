import React from "react";
import * as icon from "../img/scihive_white.png";

const Button = ({ children }) => {
  const [isHover, setIsHover] = React.useState(false);
  return (
    <button
      style={{
        padding: 5,
        width: 60,
        borderRadius: 4,
        cursor: "pointer",
        lineHeight: 1,
        fontSize: 14,
        backgroundColor: isHover ? "#f2f2f2" : "white"
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {children}
    </button>
  );
};

const App = () => {
  const [isHidden, setIsHidden] = React.useState(false);
  if (isHidden) return null;
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
          color: "white"
        }}
      >
        <a href="https://www.scihive.org" target="_blank">
          <img
            src={chrome.runtime.getURL(icon)}
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
          >
            <Button>Yes</Button>
          </a>
        </div>
        <div
          style={{
            lineHeight: 1,
            fontSize: 22,
            cursor: "pointer"
          }}
          onClick={() => setIsHidden(true)}
        >
          ×
        </div>
      </div>
    </div>
  );
};

export default App;
