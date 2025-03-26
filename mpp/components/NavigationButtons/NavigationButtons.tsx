import React from "react";
import NavButtonDashboard from "../NavButtonDashboard/NavButtonDashboard";
import toast from "react-hot-toast";
import {
  handleHighlighted,
  sortByCaliberAsc,
  sortByCaliberDesc,
  sortByNameAsc,
  sortByNameDesc,
} from "@/helpers/helpers";

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  setIsOpenAdd,
  setIsOpenUpdate,
  setIsOpenDelete,
  setGuns,
  guns,
  selectedGun,
  lastSortByNameWasAscending,
  lastSortByCaliberWasAscending,
  setLastSortByNameWasAscending,
  setLastSortByCaliberWasAscending,
  setHighlightedGunName,
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
            const highlightedGunName = handleHighlighted(guns, setHighlightedGunName);
            toast.success(`Highlighted gun with name ${highlightedGunName}`);
          } catch (error: any) {
            toast.error(error.message);
          }
        }}
      />
    </div>
  );
};

export default NavigationButtons;
