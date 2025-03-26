import React, { useState } from "react";
import Input from "../../Input/Input";
import toast from "react-hot-toast";
import { handleAddGun, handleUpdateGun } from "../../../helpers/helpers";

interface Props {
  onClose: () => void;
  onSetGuns: (guns: Gun[]) => void;
  updatedGun: Gun | null;
  guns: Gun[];
}

const UpdateGunForm: React.FC<Props> = ({ onClose, onSetGuns, updatedGun, guns }) => {
  if (!updatedGun) {
    return;
  }
  const [caliber, setCaliber] = useState(updatedGun.caliber.toString());
  const [weight, setWeight] = useState(updatedGun.weight.toString());
  const [actionType, setActionType] = useState(updatedGun.actionType);
  const [category, setCategory] = useState(updatedGun.category?.toString());
  const [effectiveRange, setEffectiveRange] = useState(updatedGun.effectiveRange?.toString());

  const handleSubmit = () => {
    try {
      const newGuns = handleUpdateGun(
        guns,
        updatedGun.name,
        caliber,
        weight,
        actionType,
        category,
        effectiveRange
      );
      if (newGuns instanceof Error) {
        toast.error(newGuns.message);
        return;
      }
      onSetGuns(newGuns);
      onClose();
      toast.success("Gun updated successfully");
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
        Update {updatedGun?.name}
      </h1>
      <Input label="Name" value={updatedGun.name} onChange={() => {}} />
      <Input label="Caliber" value={caliber} onChange={setCaliber} />
      <Input label="Weight" value={weight} onChange={setWeight} />
      <Input label="Action Type" value={actionType} onChange={setActionType} />
      <Input label="Category" value={category ? category : ""} onChange={setCategory} />
      <Input
        label="Effective range"
        value={effectiveRange ? effectiveRange : ""}
        onChange={setEffectiveRange}
      />

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
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateGunForm;
