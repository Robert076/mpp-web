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
  handleDelete,
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
  getCaliberRepartization,
  getCaliberDataForCaliberChart,
  filterGunsByRifleCategory,
  computeNumberOfTotalPages,
  getDisplayedGuns,
  getSelectedGun,
} from "@/helpers/helpers";
import DeleteGunForm from "../Forms/DeleteGunForm/DeleteGunForm";
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import { ITEMS_PER_PAGE } from "@/constants";
import CaliberChart from "../Charts/CaliberChart/CaliberChart";
import { ErrorMessages } from "@/enums/ErrorMessages";

export default function DashboardPage() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const [showGuns, setShowGuns] = useState(true);
  const [guns, setGuns] = useState<Gun[]>([]);
  const [selectedGunName, setSelectedGunName] = useState<string | "">("");
  const [lastSortByNameWasAscending, setLastSortByNameWasAscending] = useState(false);
  const [lastSortByCaliberWasAscending, setLastSortByCaliberWasAscending] = useState(false);
  const [highlightedGunNameBiggestCaliber, setHighlightedGunNameBiggestCaliber] =
    useState<string>("");
  const [highlightedGunNameSmallestCaliber, setHighlightedGunNameSmallestCaliber] =
    useState<string>("");
  const [showOnlyRifles, setShowOnlyRifles] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const caliberCounts = getCaliberRepartization(guns);

  const chartData = getCaliberDataForCaliberChart(caliberCounts);

  const filteredGuns = filterGunsByRifleCategory(guns, showOnlyRifles);

  const totalPages = computeNumberOfTotalPages(filteredGuns.length, ITEMS_PER_PAGE);

  const displayedGuns = getDisplayedGuns(filteredGuns, currentPage, ITEMS_PER_PAGE);

  const selectedGun = getSelectedGun(guns, selectedGunName);

  useEffect(() => {
    const fetchGuns = async () => {
      try {
        const response = await fetch("/api/guns");
        if (!response.ok) {
          throw new Error(ErrorMessages.FETCH_GUNS);
        }
        const data = await response.json();
        setGuns(data);
      } catch (error) {
        console.error(ErrorMessages.FETCH_GUNS, ": ", error);
        toast.error(ErrorMessages.FETCH_GUNS);
      }
    };

    fetchGuns();
  }, []);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
    }
  }, [totalPages]);

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
            onDeleteGun={() => {
              if (selectedGun) handleDelete(selectedGun.name);
            }}
          />
        </>
      )}
      {showGuns && (
        <>
          <div className="guns">
            {filterGunsByRifleCategory(displayedGuns, showOnlyRifles).map((gun) => (
              <div
                key={gun.id}
                onClick={() => {
                  handleGunSelect(gun.name, selectedGunName, setSelectedGunName);
                }}
              >
                <GunComponent
                  {...gun}
                  selected={selectedGunName === gun.name}
                  highlightedBlue={highlightedGunNameBiggestCaliber === gun.name}
                  highlightedRed={highlightedGunNameSmallestCaliber === gun.name}
                />
              </div>
            ))}
          </div>
          <div className="pagination">
            <button
              onClick={() => {
                handlePreviousPage(currentPage, totalPages, setCurrentPage);
              }}
              disabled={currentPage === 1}
              className="pagination-button"
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
                    className="pagination-button-number-of-page"
                    style={{ color: currentPage === page ? "lightgray" : "black" }}
                  >
                    {page}
                  </button>
                );
              });
            })()}

            <button
              onClick={() => {
                handleNextPage(currentPage, totalPages, setCurrentPage);
              }}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </>
      )}
      {!showGuns && (
        <div className="caliber-chart">
          <h1 className="caliber-chart-header">Guns by caliber chart</h1>
          <CaliberChart data={chartData} />
        </div>
      )}
    </div>
  );
}
