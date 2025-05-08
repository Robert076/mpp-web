import React, { useState } from "react";
import Input from "../../Input/Input";
import toast from "react-hot-toast";
import { handleUpdateManufacturer } from "../../../helpers/helpers";

interface Props {
  onClose: () => void;
  updatedManufacturer: Manufacturer | null | undefined;
  manufacturers: Manufacturer[];
}

const UpdateManufacturerForm: React.FC<Props> = ({
  onClose,
  updatedManufacturer,
  manufacturers,
}) => {
  if (!updatedManufacturer) {
    return;
  }
  const [description, setManufacturerDescription] = useState(
    updatedManufacturer.description.toString()
  );

  const handleSubmit = async () => {
    try {
      const newManufacturers = await handleUpdateManufacturer(
        manufacturers,
        updatedManufacturer.name,
        description
      );
      if (newManufacturers instanceof Error) {
        toast.error(newManufacturers.message);
        return;
      }
      onClose();
      toast.success("Manufacturer updated successfully");
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
        Update {updatedManufacturer?.name}
      </h1>
      <Input label="Name" value={updatedManufacturer.name} onChange={() => {}} />
      <Input label="Description" value={description} onChange={setManufacturerDescription} />

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

export default UpdateManufacturerForm;
