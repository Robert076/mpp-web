import React from "react";
import NavButtonDashboard from "../NavButtonDashboard/NavButtonDashboard";
import toast from "react-hot-toast";
import {
  handleAddGun,
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
      {/* DELETE THIS IN PROD */}
      <NavButtonDashboard
        text="Add 15 guns script"
        onClick={() => {
          const newGun1 = handleAddGun(
            "M4A1",
            "5.56",
            "2.9",
            "gas-operated",
            "assault",
            "800"
          );
          const newGun2 = handleAddGun(
            "AK-47",
            "7.62",
            "3.3",
            "gas-operated",
            "assault",
            "900"
          );
          const newGun3 = handleAddGun("M16", "5.56", "3.5", "gas-operated", "assault", "850");
          const newGun4 = handleAddGun("F2000", "5.56", "3.2", "bullpup", "assault", "750");
          const newGun5 = handleAddGun(
            "G3A3",
            "7.62",
            "4.0",
            "roller-delayed",
            "battle rifle",
            "600"
          );
          const newGun6 = handleAddGun(
            "FN SCAR-H",
            "7.62",
            "3.8",
            "gas-operated",
            "assault",
            "900"
          );
          const newGun7 = handleAddGun(
            "Tavor X95",
            "5.56",
            "3.0",
            "bullpup",
            "assault",
            "600"
          );
          const newGun8 = handleAddGun(
            "FAL",
            "7.62",
            "4.2",
            "gas-operated",
            "battle rifle",
            "700"
          );
          const newGun9 = handleAddGun(
            "Steyr AUG",
            "5.56",
            "3.6",
            "bullpup",
            "assault",
            "800"
          );
          const newGun10 = handleAddGun(
            "M14",
            "7.62",
            "4.3",
            "gas-operated",
            "battle rifle",
            "1000"
          );
          const newGun11 = handleAddGun(
            "Ruger Mini-14",
            "5.56",
            "3.0",
            "gas-operated",
            "carbine",
            "500"
          );
          const newGun12 = handleAddGun(
            "UMP45",
            "0.45",
            "2.5",
            "blowback",
            "submachine gun",
            "200"
          );
          const newGun13 = handleAddGun(
            "MP5",
            "9",
            "2.5",
            "roller-delayed",
            "submachine gun",
            "150"
          );
          const newGun14 = handleAddGun(
            "PP-19 Bizon",
            "9",
            "2.7",
            "blowback",
            "submachine gun",
            "200"
          );
          const newGun15 = handleAddGun(
            "CZ Scorpion Evo 3",
            "9",
            "2.7",
            "blowback",
            "submachine gun",
            "150"
          );
          setGuns([
            ...guns,
            newGun1,
            newGun2,
            newGun3,
            newGun4,
            newGun5,
            newGun6,
            newGun7,
            newGun8,
            newGun9,
            newGun10,
            newGun11,
            newGun12,
            newGun13,
            newGun14,
            newGun15,
          ]);
          toast.success(`Added 15 guns`);
        }}
      />
    </div>
  );
};

export default NavigationButtons;
