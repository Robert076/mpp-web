import React from "react";

const DarkBg = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        zIndex: 1,
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}
    ></div>
  );
};

export default DarkBg;
