"use client";
import React, { useState } from "react";
import NavButtonDashboard from "../NavButtonDashboard/NavButtonDashboard";
import AddGunForm from "../AddGunForm/AddGunForm";
import DarkBg from "../DarkBg/DarkBg";
import GunComponent from "../GunComponent/GunComponent";

export default function DashboardPage() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [guns, setGuns] = useState<Gun[]>([]);
  const [selectedGunIndex, setSelectedGunIndex] = useState<number | null>(null);

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
        <>
          <DarkBg />
          <AddGunForm
            onClose={() => setIsOpenAdd(false)}
            onAddGun={(newGun) => setGuns([...guns, newGun])}
          />
        </>
      )}
      <div className="guns" style={{ width: "100%", padding: "20px" }}>
        {guns.map((gun, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedGunIndex(index);
            }}
          >
            <GunComponent
              name={gun.name}
              weight={gun.weight}
              actionType={gun.actionType}
              caliber={gun.caliber}
              category={gun.category}
              effectiveRange={gun.effectiveRange}
              selected={selectedGunIndex === index ? true : false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
