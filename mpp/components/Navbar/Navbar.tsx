import { auth } from "@/auth";
import React from "react";
import { SignOut } from "../SignOut/SignOut";

async function Navbar() {
  const session = await auth();
  return (
    <div
      className="navbar"
      style={{
        height: "6vh",
        padding: "0px 20px",
        width: "100vw",
        backgroundColor: "#539BF5",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "16px",
      }}
    >
      <div
        className="name"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          color: "white",
        }}
      >
        <p>Dashboard - {session?.user?.name}</p>
      </div>
      <div
        className="buttons"
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SignOut />
      </div>
    </div>
  );
}

export default Navbar;
