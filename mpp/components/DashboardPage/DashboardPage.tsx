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
  handleNextPage,
  handlePageChange,
  handlePreviousPage,
  sortByCaliberAsc,
  sortByCaliberDesc,
  sortByNameAsc,
  sortByNameDesc,
} from "@/helpers/helpers";
import DeleteGunForm from "../Forms/DeleteGunForm/DeleteGunForm";
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import { ITEMS_PER_PAGE } from "@/constants";
import CaliberChart from "../Charts/CaliberChart/CaliberChart";

export default function DashboardPage() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const [showGuns, setShowGuns] = useState(true); // initially show guns, but if user goes on statistics dont show them

  const [guns, setGuns] = useState<Gun[]>([]);
  const [selectedGunName, setSelectedGunName] = useState<string | "">("");
  const [lastSortByNameWasAscending, setLastSortByNameWasAscending] = useState(false);
  const [lastSortByCaliberWasAscending, setLastSortByCaliberWasAscending] = useState(false);
  const [highlightedGunName, setHighlightedGunName] = useState<string | "">("");

  const caliberCounts = guns.reduce((acc, gun) => {
    acc[gun.caliber] = (acc[gun.caliber] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // Convert to array format
  const chartData = Object.entries(caliberCounts).map(([caliber, count]) => ({
    caliber: parseFloat(caliber), // Ensure number type
    count,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(guns.length / ITEMS_PER_PAGE);
  const displayedGuns = guns.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
        setShowGuns={setShowGuns}
        showGuns={showGuns}
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
      {showGuns && (
        <>
          <div className="guns" style={{ width: "100%", padding: "20px" }}>
            {displayedGuns.map((gun) => (
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
          <div
            className="pagination"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => {
                handlePreviousPage(currentPage, totalPages, setCurrentPage);
              }}
              disabled={currentPage === 1}
              style={{
                padding: "5px 20px",
                width: "100px",
                border: "none",
                background: "white",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            >
              Previous
            </button>
            {(() => {
              let startPage = Math.max(1, currentPage - 2);
              let endPage = startPage + 4;

              if (endPage > totalPages) {
                endPage = totalPages;
                startPage = Math.max(1, endPage - 4);
              }

              return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                const page = startPage + index;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page, setCurrentPage)}
                    disabled={currentPage === page}
                    style={{
                      padding: "5px 10px",
                      border: "none",
                      backgroundColor: "transparent",
                      color: currentPage === page ? "lightgray" : "black",
                      borderRadius: "5px",
                    }}
                  >
                    {page}
                  </button>
                );
              });
            })()}

            <button
              style={{
                padding: "5px 20px",
                width: "100px",
                border: "none",
                background: "white",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
              onClick={() => {
                handleNextPage(currentPage, totalPages, setCurrentPage);
              }}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
      {!showGuns && (
        <div
          style={{
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
            padding: "20px",
            border: "1px solid red",
          }}
        >
          <h1 style={{ fontWeight: 500, fontSize: "18px" }}>Guns by caliber chart</h1>
          <CaliberChart data={chartData} />
        </div>
      )}
    </div>
  );
}
