import React, { useState } from "react";
import Input from "../../Input/Input";
import toast from "react-hot-toast";
import { handleAddGun } from "../../../helpers";

interface Props {
  onClose: () => void;
  onAddGun: (gun: Gun) => void;
  guns: Gun[];
}

const AddGunForm: React.FC<Props> = ({ onClose, onAddGun, guns }) => {
  const [name, setName] = useState("");
  const [caliber, setCaliber] = useState("");
  const [weight, setWeight] = useState("");
  const [actionType, setActionType] = useState("");
  const [category, setCategory] = useState("");
  const [effectiveRange, setEffectiveRange] = useState("");

  const handleSubmit = () => {
    try {
      const newGun = handleAddGun(name, caliber, weight, actionType, category, effectiveRange);
      if (newGun instanceof Error) {
        toast.error(newGun.message);
        return;
      }
      let isThereAlreadyAGunWithThisName = false;
      guns.forEach((gun) => {
        if (gun.name === name) {
          isThereAlreadyAGunWithThisName = true;
        }
      });
      if (!isThereAlreadyAGunWithThisName) {
        onAddGun(newGun);
        onClose();
        toast.success("Gun added successfully");
      } else {
        toast.error(`There already is a gun with the name ${name}`);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 2,
      }}
    >
      <h1
        style={{
          fontSize: "20px",
          color: "#539BF5",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Add Gun
      </h1>
      <Input label="Name" value={name} onChange={setName} mandatory={true} />
      <Input label="Caliber" value={caliber} onChange={setCaliber} mandatory={true} />
      <Input label="Weight" value={weight} onChange={setWeight} mandatory={true} />
      <Input
        label="Action Type"
        value={actionType}
        onChange={setActionType}
        mandatory={true}
      />
      <Input label="Category" value={category} onChange={setCategory} />
      <Input label="Effective range" value={effectiveRange} onChange={setEffectiveRange} />

      {/* THIS WILL BE REMOVED IN THE PROD */}
      <div className="quickadds">
        <button
          onClick={() => {
            setName("M4A1-S"),
              setCaliber("5.56"),
              setWeight("2.1"),
              setActionType("full-automatic"),
              setCategory("Rifle"),
              setEffectiveRange("1000");
          }}
        >
          Quickadd 1
        </button>
        <button
          onClick={() => {
            setName("AK-47"),
              setCaliber("7.62"),
              setWeight("1.6"),
              setActionType("full-automatic"),
              setCategory("Rifle"),
              setEffectiveRange("900");
          }}
        >
          Quickadd 2
        </button>
        <button
          onClick={() => {
            setName("USP-S"),
              setCaliber("9"),
              setWeight("0.4"),
              setActionType("semi-automatic"),
              setCategory("Pistol"),
              setEffectiveRange("300");
          }}
        >
          Quickadd 3
        </button>
      </div>
      {/* THE ABOVE WILL BE REMOVED IN THE PROD */}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <button
          style={{
            backgroundColor: "transparent",
            cursor: "pointer",
            width: "50%",
            border: "none",
          }}
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          style={{
            backgroundColor: "#539BF5",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
            padding: "5px 15px",
            border: "none",
            width: "50%",
          }}
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddGunForm;
