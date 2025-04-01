"use client";
import React, { useEffect, useState } from "react";
import NavButtonDashboard from "../NavButtonDashboard/NavButtonDashboard";
import AddGunForm from "../Forms/AddGunForm/AddGunForm";
import DarkBg from "../DarkBg/DarkBg";
import GunComponent from "../GunComponent/GunComponent";
import UpdateGunForm from "../Forms/UpdateGunForm/UpdateGunForm";
import toast from "react-hot-toast";
import "./DashboardPage.css";
import {
  handleGunSelect,
  handleHighlightedBig,
  handleHighlightedSmall,
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

  const [showGuns, setShowGuns] = useState(true);
  const [guns, setGuns] = useState<Gun[]>([]);
  const [selectedGunName, setSelectedGunName] = useState<string | "">("");
  const [lastSortByNameWasAscending, setLastSortByNameWasAscending] = useState(false);
  const [lastSortByCaliberWasAscending, setLastSortByCaliberWasAscending] = useState(false);
  const [highlightedGunNameBiggestCaliber, setHighlightedGunNameBiggestCaliber] = useState<
    string | ""
  >("");
  const [highlightedGunNameSmallestCaliber, setHighlightedGunNameSmallestCaliber] = useState<
    string | ""
  >("");
  const [showOnlyRifles, setShowOnlyRifles] = useState(false);

  useEffect(() => {
    const fetchGuns = async () => {
      try {
        const response = await fetch("/api/guns");
        if (!response.ok) {
          throw new Error("Failed to fetch guns");
        }
        const data = await response.json();
        setGuns(data);
      } catch (error) {
        console.error("Error fetching guns:", error);
        toast.error("Failed to load guns.");
      }
    };

    fetchGuns();
  }, []);

  const caliberCounts = guns.reduce((acc, gun) => {
    acc[gun.caliber] = (acc[gun.caliber] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const chartData = Object.entries(caliberCounts).map(([caliber, count]) => ({
    caliber: parseFloat(caliber),
    count,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const filteredGuns = guns.filter((gun) =>
    showOnlyRifles ? gun.category?.toLowerCase() === "rifle" : true
  );

  const totalPages = Math.ceil(filteredGuns.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
    }
  }, [totalPages]);

  const displayedGuns = filteredGuns.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const selectedGun =
    selectedGunName !== "" ? guns.find((gun) => gun.name === selectedGunName) : null;

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
        setHighlightedGunNameBiggestCaliber={setHighlightedGunNameBiggestCaliber}
        setHighlightedGunNameSmallestCaliber={setHighlightedGunNameSmallestCaliber}
        setShowGuns={setShowGuns}
        showGuns={showGuns}
        showOnlyRifles={showOnlyRifles}
        setShowOnlyRifles={setShowOnlyRifles}
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
            {displayedGuns
              .filter((gun) =>
                showOnlyRifles ? gun.category?.toLowerCase() === "rifle" : true
              )
              .map((gun) => (
                <div
                  key={gun.id}
                  onClick={() => {
                    handleGunSelect(gun.name, selectedGunName, setSelectedGunName);
                  }}
                >
                  <GunComponent
                    id={gun.id}
                    name={gun.name}
                    weight={gun.weight}
                    actionType={gun.actionType}
                    caliber={gun.caliber}
                    category={gun.category}
                    effectiveRange={gun.effectiveRange}
                    selected={selectedGunName === gun.name ? true : false}
                    highlightedBlue={
                      highlightedGunNameBiggestCaliber === gun.name ? true : false
                    }
                    highlightedRed={
                      highlightedGunNameSmallestCaliber === gun.name ? true : false
                    }
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
          }}
        >
          <h1 style={{ fontWeight: 500, fontSize: "18px" }}>Guns by caliber chart</h1>
          <CaliberChart data={chartData} />
        </div>
      )}
    </div>
  );
}
