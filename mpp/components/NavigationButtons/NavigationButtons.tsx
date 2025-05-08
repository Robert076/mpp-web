import React from "react";
import NavButtonDashboard from "../NavButtonDashboard/NavButtonDashboard";
import toast from "react-hot-toast";
import {
  handleAddGun,
  handleHighlightedBig,
  sortByCaliberAsc,
  sortByCaliberDesc,
  sortByNameAsc,
  sortByNameDesc,
  handleHighlightedSmall,
} from "@/helpers/helpers";
import NavButtonDashboardDropdown from "../NavButtonDashboardDropdown/NavButtonDashboardDropdown";

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  setIsOpenAddGun,
  setIsOpenUpdateGun,
  setIsOpenDeleteGun,
  setIsOpenAddManufacturer,
  setIsOpenUpdateManufacturer,
  setIsOpenDeleteManufacturer,
  setGuns,
  guns,
  selectedGun,
  lastSortByNameWasAscending,
  lastSortByCaliberWasAscending,
  setLastSortByNameWasAscending,
  setLastSortByCaliberWasAscending,
  setHighlightedGunNameBiggestCaliber,
  setHighlightedGunNameSmallestCaliber,
  showOnlyRifles,
  setShowOnlyRifles,
  setEntity,
  entity,
}) => {
  return (
    <div
      className="buttons"
      style={{
        backgroundColor: "#2b3137",
        width: "100vw",
        overflowX: "auto",
        height: "5vh",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        whiteSpace: "nowrap",
      }}
    >
      <NavButtonDashboardDropdown
        text="Entities"
        options={["Guns", "Manufacturers"]}
        setEntity={setEntity}
      />
      {entity === "Guns" && (
        <>
          <NavButtonDashboard
            onClick={() => {
              setIsOpenAddGun(true);
              setIsOpenUpdateGun(false);
              setIsOpenDeleteGun(false);
            }}
            text="Add gun"
          />
          <NavButtonDashboard
            onClick={() => {
              if (selectedGun) {
                setIsOpenAddGun(false);
                setIsOpenUpdateGun(true);
                setIsOpenDeleteGun(false);
              } else {
                setIsOpenAddGun(false);
                setIsOpenDeleteGun(false);
                toast.error("You must select a gun first");
              }
            }}
            text="Update gun"
          />
          <NavButtonDashboard
            onClick={() => {
              if (selectedGun) {
                setIsOpenAddGun(false);
                setIsOpenUpdateGun(false);
                setIsOpenDeleteGun(true);
              } else {
                setIsOpenAddGun(false);
                setIsOpenUpdateGun(false);
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
              if (lastSortByCaliberWasAscending) {
                setGuns(sortByCaliberAsc(guns));
                toast.success("Sorted by caliber in descending order");
              } else {
                setGuns(sortByCaliberDesc(guns));
                toast.success("Sorted by caliber in ascending order");
              }
              setLastSortByCaliberWasAscending(!lastSortByCaliberWasAscending);
            }}
          />
          <NavButtonDashboard
            text="Highlight biggest caliber"
            onClick={() => {
              try {
                const highlightedGunName = handleHighlightedBig(
                  guns,
                  setHighlightedGunNameBiggestCaliber
                );
                toast.success(`Highlighted gun with name ${highlightedGunName}`);
              } catch (error: any) {
                toast.error(error.message);
              }
            }}
          />
          <NavButtonDashboard
            text="Highlight smallest caliber"
            onClick={() => {
              try {
                const highlightedGunName = handleHighlightedSmall(
                  guns,
                  setHighlightedGunNameSmallestCaliber
                );
                toast.success(`Highlighted gun with name ${highlightedGunName}`);
              } catch (error: any) {
                toast.error(error.message);
              }
            }}
          />
          <NavButtonDashboard
            text="Filter only Rifles"
            onClick={() => {
              setShowOnlyRifles(!showOnlyRifles);
            }}
          />
          <NavButtonDashboard
            text="Caliber chart"
            onClick={() => {
              setEntity("Caliber-Chart");
            }}
          />
        </>
      )}
      {entity == "Manufacturers" && (
        <>
          <NavButtonDashboard
            text="Add manufacturer"
            onClick={() => {
              setIsOpenAddManufacturer(true);
              setIsOpenUpdateManufacturer(false);
              setIsOpenDeleteManufacturer(false);
            }}
          />
          <NavButtonDashboard
            text="Update manufacturer"
            onClick={() => {
              setIsOpenUpdateManufacturer(true);
              setIsOpenDeleteManufacturer(false);
              setIsOpenAddManufacturer(false);
            }}
          />
          <NavButtonDashboard
            text="Delete manufacturer"
            onClick={() => {
              setIsOpenDeleteManufacturer(true);
              setIsOpenAddManufacturer(false);
              setIsOpenUpdateManufacturer(false);
            }}
          />
        </>
      )}
    </div>
  );
};

export default NavigationButtons;
