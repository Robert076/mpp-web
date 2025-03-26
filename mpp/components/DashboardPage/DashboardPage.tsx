"use client";
import React, { useState } from "react";
import NavButtonDashboard from "../NavButtonDashboard/NavButtonDashboard";
import AddGunForm from "../Forms/AddGunForm/AddGunForm";
import DarkBg from "../DarkBg/DarkBg";
import GunComponent from "../GunComponent/GunComponent";
import UpdateGunForm from "../Forms/UpdateGunForm/UpdateGunForm";
import toast from "react-hot-toast";
import "./DashboardPage.css";
import {
  handleGunSelect,
  handleHighlighted,
  sortByCaliberAsc,
  sortByCaliberDesc,
  sortByNameAsc,
  sortByNameDesc,
} from "@/helpers/helpers";
import DeleteGunForm from "../Forms/DeleteGunForm/DeleteGunForm";
import NavigationButtons from "../NavigationButtons/NavigationButtons";

export default function DashboardPage() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const [guns, setGuns] = useState<Gun[]>([]);
  const [selectedGunName, setSelectedGunName] = useState<string | "">("");
  const [lastSortByNameWasAscending, setLastSortByNameWasAscending] = useState(false);
  const [lastSortByCaliberWasAscending, setLastSortByCaliberWasAscending] = useState(false);
  const [highlightedGunName, setHighlightedGunName] = useState<string | "">("");

  const [currentPage, setCurrentPage] = useState(1);

  const selectedGun =
    selectedGunName !== "" ? guns.filter((gun) => gun.name === selectedGunName)[0] : null; // it will only have one element since name is unique, and [0] to get it so we dont give a list

  return (
    <div>
      <NavigationButtons
        setIsOpenAdd={setIsOpenAdd}
        setIsOpenUpdate={setIsOpenUpdate}
        setIsOpenDelete={setIsOpenDelete}
        setGuns={setGuns}
        guns={guns}
        selectedGun={selectedGun}
        setLastSortByCaliberWasAscending={setLastSortByCaliberWasAscending}
        setLastSortByNameWasAscending={setLastSortByNameWasAscending}
        lastSortByCaliberWasAscending={lastSortByCaliberWasAscending}
        lastSortByNameWasAscending={lastSortByNameWasAscending}
        setHighlightedGunName={setHighlightedGunName}
      />
      {isOpenAdd && (
        <>
          <DarkBg />
          <AddGunForm
            onClose={() => setIsOpenAdd(false)}
            onAddGun={(newGun) => setGuns([...guns, newGun])}
            guns={guns}
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
        {guns.map((gun) => (
          <div
            key={gun.name}
            onClick={() => {
              handleGunSelect(gun.name, selectedGunName, setSelectedGunName);
            }}
          >
            <GunComponent
              name={gun.name}
              weight={gun.weight}
              actionType={gun.actionType}
              caliber={gun.caliber}
              category={gun.category}
              effectiveRange={gun.effectiveRange}
              selected={selectedGunName === gun.name ? true : false}
              highlighted={highlightedGunName === gun.name ? true : false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
