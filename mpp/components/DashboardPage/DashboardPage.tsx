"use client";
import React, { useState } from "react";
import NavButtonDashboard from "../NavButtonDashboard/NavButtonDashboard";
import AddGunForm from "../AddGunForm/AddGunForm";
import DarkBg from "../DarkBg/DarkBg";

export default function DashboardPage() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [guns, setGuns] = useState<Gun[]>([]);

  return (
    <div>
      <div
        className="buttons"
        style={{
          backgroundColor: "#2b3137",
          width: "100vw",
          height: "5vh",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <NavButtonDashboard
          onClick={() => {
            setIsOpenAdd(!isOpenAdd);
          }}
          text="Add gun"
        />
        <NavButtonDashboard text="Update gun" />
        <NavButtonDashboard text="Delete gun" />
        <NavButtonDashboard text="Sort by name" />
        <NavButtonDashboard text="Sort by caliber" />
      </div>
      {isOpenAdd && (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            zIndex: 1,
            position: "fixed",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        ></div>
      )}
      {isOpenAdd && (
        <>
          <DarkBg />
          <AddGunForm
            onClose={() => setIsOpenAdd(false)}
            onAddGun={(newGun) => setGuns([...guns, newGun])}
          />
        </>
      )}
    </div>
  );
}
