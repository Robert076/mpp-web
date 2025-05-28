import React from "react";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { SignOut } from "../SignOut/SignOut";

const JWT_SECRET = process.env.JWT_SECRET || "Supersecretkey";

async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let username = "Guest";

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { username?: string };
      username = decoded.username || username;
    } catch (err) {
      console.log("JWT verification failed:", err);
    }
  }

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
        <p>Dashboard - {username}</p>
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
