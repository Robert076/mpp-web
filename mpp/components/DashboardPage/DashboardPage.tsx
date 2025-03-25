"use client";
import React, { useState } from "react";
import NavButtonDashboard from "../NavButtonDashboard/NavButtonDashboard";
import AddGunForm from "../Forms/AddGunForm/AddGunForm";
import DarkBg from "../DarkBg/DarkBg";
import GunComponent from "../GunComponent/GunComponent";
import UpdateGunForm from "../Forms/UpdateGunForm/UpdateGunForm";
import toast from "react-hot-toast";
import {
  handleGunSelect,
  sortByCaliberAsc,
  sortByCaliberDesc,
  sortByNameAsc,
  sortByNameDesc,
} from "@/helpers";
import DeleteGunForm from "../Forms/DeleteGunForm/DeleteGunForm";

export default function DashboardPage() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [guns, setGuns] = useState<Gun[]>([]);
  const [selectedGunIndex, setSelectedGunIndex] = useState<number | null>(null);
  const [lastSortByNameWasAscending, setLastSortByNameWasAscending] = useState(false);
  const [lastSortByCaliberWasAscending, setLastSortByCaliberWasAscending] = useState(false);
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
            setIsOpenDelete(false);
          }}
          text="Add gun"
        />
        <NavButtonDashboard
          onClick={() => {
            if (selectedGun) {
              setIsOpenAdd(false);
              setIsOpenUpdate(true);
              setIsOpenDelete(false);
            } else {
              setIsOpenAdd(false);
              setIsOpenDelete(false);
              toast.error("You must select a gun first");
            }
          }}
          text="Update gun"
        />
        <NavButtonDashboard
          onClick={() => {
            if (selectedGun) {
              setIsOpenAdd(false);
              setIsOpenUpdate(false);
              setIsOpenDelete(true);
            } else {
              setIsOpenAdd(false);
              setIsOpenUpdate(false);
              toast.error("You must select a gun first");
            }
          }}
          text="Delete gun"
        />
        <NavButtonDashboard
          text="Sort by name"
          onClick={() => {
            if (lastSortByNameWasAscending) {
              setGuns(sortByNameAsc(guns));
              toast.success("Sorted by name in descending order");
            } else {
              setGuns(sortByNameDesc(guns));
              toast.success("Sorted by name in ascending order");
            }
            setLastSortByNameWasAscending(!lastSortByNameWasAscending);
          }}
        />
        <NavButtonDashboard
          text="Sort by caliber"
          onClick={() => {
            if (lastSortByNameWasAscending) {
              setGuns(sortByCaliberAsc(guns));
              toast.success("Sorted by caliber in descending order");
            } else {
              setGuns(sortByCaliberDesc(guns));
              toast.success("Sorted by caliber in ascending order");
            }
            setLastSortByNameWasAscending(!lastSortByNameWasAscending);
          }}
        />
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
      {isOpenDelete && (
        <>
          <DarkBg />
          <DeleteGunForm
            onClose={() => setIsOpenDelete(false)}
            guns={guns}
            deletedGun={selectedGun}
            onDeleteGun={(guns) => setGuns([...guns])}
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
