"use client";
import React, { useState } from "react";
import NavButtonDashboard from "../NavButtonDashboard/NavButtonDashboard";
import AddGunForm from "../Forms/AddGunForm/AddGunForm";
import DarkBg from "../DarkBg/DarkBg";
import GunComponent from "../GunComponent/GunComponent";
import UpdateGunForm from "../Forms/UpdateGunForm/UpdateGunForm";
import toast from "react-hot-toast";
import { handleGunSelect } from "@/helpers";

export default function DashboardPage() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [guns, setGuns] = useState<Gun[]>([]);
  const [selectedGunIndex, setSelectedGunIndex] = useState<number | null>(null);
  const selectedGun = selectedGunIndex !== null ? guns[selectedGunIndex] : null;

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
            setIsOpenAdd(true);
            setIsOpenUpdate(false);
          }}
          text="Add gun"
        />
        <NavButtonDashboard
          onClick={() => {
            if (selectedGun) {
              setIsOpenAdd(false);
              setIsOpenUpdate(true);
            } else {
              toast.error("You must select a gun first");
            }
          }}
          text="Update gun"
        />
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
      {isOpenUpdate && (
        <>
          <DarkBg />
          <UpdateGunForm
            onClose={() => setIsOpenUpdate(false)}
            guns={guns}
            onSetGuns={(guns) => setGuns([...guns])}
            updatedGun={selectedGun}
          />
        </>
      )}
      <div className="guns" style={{ width: "100%", padding: "20px" }}>
        {guns.map((gun, index) => (
          <div
            key={index}
            onClick={() => {
              handleGunSelect(index, selectedGunIndex, setSelectedGunIndex);
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
