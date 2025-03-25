import React from "react";
import { SignOut } from "../SignOut/SignOut";
import { auth } from "@/auth";
import NavButtonDashboard from "../NavButtonDashboard/NavButtonDashboard";

export default async function DashboardPage() {
  const session = await auth();
  return (
    <div>
      <div
        className="buttons"
        style={{
          backgroundColor: "#2b3137",
          width: "100vw",
          height: "3.5vh",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <NavButtonDashboard text="Add gun" />
        <NavButtonDashboard text="Update gun" />
        <NavButtonDashboard text="Delete gun" />
        <NavButtonDashboard text="Sort by name" />
        <NavButtonDashboard text="Sort by caliber" />
      </div>
    </div>
  );
}
