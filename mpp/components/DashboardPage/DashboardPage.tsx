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
  handleDeleteGun,
  handleDeleteManufacturer,
  handleGunSelect,
  handleManufacturerSelect,
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
  getSelectedManufacturer,
  getDisplayedManufacturers,
  sortManufacturersByNameAscending,
} from "@/helpers/helpers";
import DeleteGunForm from "../Forms/DeleteGunForm/DeleteGunForm";
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import { ITEMS_PER_PAGE } from "@/constants";
import CaliberChart from "../Charts/CaliberChart/CaliberChart";
import { ErrorMessages } from "@/enums/ErrorMessages";
import AddManufacturerForm from "../Forms/AddManufacturerForm/AddManufacturerForm";
import ManufacturerComponent from "../ManufacturerComponent/ManufacturerComponent";
import UpdateManufacturerForm from "../Forms/UpdateManufacturerForm/UpdateManufacturerForm";
import DeleteManufacturerForm from "../Forms/DeleteManufacturerForm/DeleteManufacturerForm";

export default function DashboardPage() {
  const [isOpenAddGun, setIsOpenAddGun] = useState(false);
  const [isOpenUpdateGun, setIsOpenUpdateGun] = useState(false);
  const [isOpenDeleteGun, setIsOpenDeleteGun] = useState(false);
  const [isOpenAddManufacturer, setIsOpenAddManufacturer] = useState(false);
  const [isOpenUpdateManufacturer, setIsOpenUpdateManufacturer] = useState(false);
  const [isOpenDeleteManufacturer, setIsOpenDeleteManufacturer] = useState(false);

  const [showGuns, setShowGuns] = useState(true);
  const [guns, setGuns] = useState<Gun[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [selectedGunName, setSelectedGunName] = useState<string | "">("");
  const [selectedManufacturerName, setSelectedManufacturerName] = useState<string | "">("");
  const [lastSortByNameWasAscending, setLastSortByNameWasAscending] = useState(false);
  const [lastSortByCaliberWasAscending, setLastSortByCaliberWasAscending] = useState(false);
  const [highlightedGunNameBiggestCaliber, setHighlightedGunNameBiggestCaliber] =
    useState<string>("");
  const [highlightedGunNameSmallestCaliber, setHighlightedGunNameSmallestCaliber] =
    useState<string>("");
  const [showOnlyRifles, setShowOnlyRifles] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentManufacturerPage, setCurrentManufacturerPage] = useState(1);
  const [entity, setEntity] = useState("Guns");

  const caliberCounts = getCaliberRepartization(guns);
  const chartData = getCaliberDataForCaliberChart(caliberCounts);
  const filteredGuns = filterGunsByRifleCategory(guns, showOnlyRifles);
  const totalPages = computeNumberOfTotalPages(filteredGuns.length, ITEMS_PER_PAGE);
  const displayedGuns = getDisplayedGuns(filteredGuns, currentPage, ITEMS_PER_PAGE);
  const selectedGun = getSelectedGun(guns, selectedGunName);
  const selectedManufacturer = getSelectedManufacturer(
    manufacturers,
    selectedManufacturerName
  );

  const totalManufacturerPages = computeNumberOfTotalPages(
    manufacturers.length,
    ITEMS_PER_PAGE
  );
  const displayedManufacturers = getDisplayedManufacturers(
    manufacturers,
    currentPage,
    ITEMS_PER_PAGE
  );

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
    const fetchManufacturers = async () => {
      try {
        const response = await fetch("/api/manufacturers");
        if (!response.ok) {
          throw new Error(ErrorMessages.FETCH_GUNS);
        }
        const data = await response.json();
        setManufacturers(data);
      } catch (error) {
        console.error(ErrorMessages.FETCH_GUNS, ": ", error);
        toast.error(ErrorMessages.FETCH_GUNS);
      }
    };

    fetchManufacturers();
  }, []);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
    }
  }, [totalPages]);

  useEffect(() => {
    if (currentManufacturerPage > totalManufacturerPages) {
      setCurrentManufacturerPage(totalManufacturerPages > 0 ? totalManufacturerPages : 1);
    }
  }, [totalManufacturerPages]);

  // Reset pagination when switching between entities
  useEffect(() => {
    if (entity === "Guns") {
      setCurrentPage(1);
    } else if (entity === "Manufacturers") {
      setCurrentManufacturerPage(1);
    }
  }, [entity]);

  return (
    <div>
      <NavigationButtons
        setIsOpenAddGun={setIsOpenAddGun}
        setIsOpenUpdateGun={setIsOpenUpdateGun}
        setIsOpenDeleteGun={setIsOpenDeleteGun}
        setIsOpenAddManufacturer={setIsOpenAddManufacturer}
        setIsOpenUpdateManufacturer={setIsOpenUpdateManufacturer}
        setGuns={setGuns}
        guns={guns}
        selectedGun={selectedGun}
        setLastSortByCaliberWasAscending={setLastSortByCaliberWasAscending}
        setLastSortByNameWasAscending={setLastSortByNameWasAscending}
        lastSortByCaliberWasAscending={lastSortByCaliberWasAscending}
        lastSortByNameWasAscending={lastSortByNameWasAscending}
        setHighlightedGunNameBiggestCaliber={setHighlightedGunNameBiggestCaliber}
        setHighlightedGunNameSmallestCaliber={setHighlightedGunNameSmallestCaliber}
        showOnlyRifles={showOnlyRifles}
        setShowOnlyRifles={setShowOnlyRifles}
        setEntity={setEntity}
        entity={entity}
        setIsOpenDeleteManufacturer={setIsOpenDeleteManufacturer}
      />
      {entity === "Guns" && isOpenAddGun && (
        <>
          <DarkBg />
          <AddGunForm
            onClose={() => setIsOpenAddGun(false)}
            onAddGun={(newGun) => setGuns([...guns, newGun])}
            guns={guns}
          />
        </>
      )}
      {entity === "Guns" && isOpenUpdateGun && (
        <>
          <DarkBg />
          <UpdateGunForm
            onClose={() => setIsOpenUpdateGun(false)}
            guns={guns}
            updatedGun={selectedGun}
          />
        </>
      )}
      {entity === "Guns" && isOpenDeleteGun && (
        <>
          <DarkBg />
          <DeleteGunForm
            onClose={() => setIsOpenDeleteGun(false)}
            guns={guns}
            deletedGun={selectedGun}
            onDeleteGun={() => {
              if (selectedGun) handleDeleteGun(selectedGun.name);
            }}
          />
        </>
      )}
      {entity === "Guns" && (
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
      {entity === "Caliber-Chart" && (
        <div className="caliber-chart">
          <h1 className="caliber-chart-header">Guns by caliber chart</h1>
          <CaliberChart data={chartData} />
        </div>
      )}

      {entity === "Manufacturers" && isOpenAddManufacturer && (
        <div>
          <DarkBg />
          <AddManufacturerForm
            onClose={() => setIsOpenAddManufacturer(false)}
            onAddManufacturer={(newManufacturer) =>
              setManufacturers([...manufacturers, newManufacturer])
            }
            manufacturers={manufacturers}
          />
        </div>
      )}
      {entity === "Manufacturers" && isOpenUpdateManufacturer && (
        <>
          <DarkBg />
          <UpdateManufacturerForm
            onClose={() => setIsOpenUpdateManufacturer(false)}
            updatedManufacturer={selectedManufacturer}
            manufacturers={manufacturers}
          />
        </>
      )}
      {entity === "Manufacturers" && isOpenDeleteManufacturer && (
        <>
          <DarkBg />
          <DeleteManufacturerForm
            onClose={() => setIsOpenDeleteManufacturer(false)}
            deletedManufacturer={selectedManufacturer}
            manufacturers={manufacturers}
            onDeleteManufacturer={() => {
              if (selectedManufacturer) handleDeleteManufacturer(selectedManufacturer.name);
            }}
          />
        </>
      )}
      {entity === "Manufacturers" && (
        <>
          <div className="manufacturers">
            {displayedManufacturers.map((manufacturer) => (
              <div
                key={manufacturer.id}
                onClick={() => {
                  handleManufacturerSelect(
                    manufacturer.name,
                    selectedManufacturerName,
                    setSelectedManufacturerName
                  );
                }}
              >
                <ManufacturerComponent
                  {...manufacturer}
                  selected={selectedManufacturerName === manufacturer.name}
                />
              </div>
            ))}
          </div>
          <div className="pagination">
            <button
              onClick={() => {
                handlePreviousPage(
                  currentManufacturerPage,
                  totalManufacturerPages,
                  setCurrentManufacturerPage
                );
              }}
              disabled={currentManufacturerPage === 1}
              className="pagination-button"
            >
              Previous
            </button>
            {(() => {
              let startPage = Math.max(1, currentManufacturerPage - 2);
              let endPage = startPage + 4;

              if (endPage > totalManufacturerPages) {
                endPage = totalManufacturerPages;
                startPage = Math.max(1, endPage - 4);
              }

              return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                const page = startPage + index;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page, setCurrentManufacturerPage)}
                    disabled={currentManufacturerPage === page}
                    className="pagination-button-number-of-page"
                    style={{ color: currentManufacturerPage === page ? "lightgray" : "black" }}
                  >
                    {page}
                  </button>
                );
              });
            })()}

            <button
              onClick={() => {
                handleNextPage(
                  currentManufacturerPage,
                  totalManufacturerPages,
                  setCurrentManufacturerPage
                );
              }}
              disabled={currentManufacturerPage === totalManufacturerPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
