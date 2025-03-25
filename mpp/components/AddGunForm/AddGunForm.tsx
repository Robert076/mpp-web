import React, { useState } from "react";
import Input from "../Input/Input";
import toast from "react-hot-toast";
import { handleAddGun } from "../../helpers";

interface Props {
  onClose: () => void;
  onAddGun: (gun: Gun) => void;
}

const AddGunForm: React.FC<Props> = ({ onClose, onAddGun }) => {
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
      onAddGun(newGun);
      onClose();
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
      <Input label="Name" value={name} onChange={setName} />
      <Input label="Caliber" value={caliber} onChange={setCaliber} />
      <Input label="Weight" value={weight} onChange={setWeight} />
      <Input label="Action Type" value={actionType} onChange={setActionType} />
      <Input label="Category" value={category} onChange={setCategory} />
      <Input label="Effective range" value={effectiveRange} onChange={setEffectiveRange} />
      <button
        onClick={() => {
          setName("M4A1-S"),
            setCaliber("5.56"),
            setWeight("2.1"),
            setActionType("full-automatic"),
            setCategory("Rifle"),
            setEffectiveRange("1km");
        }}
      >
        Quickadd
      </button>
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
