import React from "react";
import SignIn from "../SignIn/SignIn";

const LoginPage = () => {
  return (
    <div
      className="background"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#d0d0d0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="window"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#539BF5",
          padding: "50px",
          borderRadius: "5px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ color: "white", paddingBottom: "10px" }}>Welcome to my MPP Project</h3>
        <SignIn />
      </div>
    </div>
  );
};

export default LoginPage;
