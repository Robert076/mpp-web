import React, { useState } from "react";
import Input from "../../Input/Input";
import toast from "react-hot-toast";
import { handleAddManufacturer } from "../../../helpers/helpers";

interface Props {
  onClose: () => void;
  onAddManufacturer: (manufacturer: Manufacturer) => void;
  manufacturers: Manufacturer[];
}

const AddManufacturerForm: React.FC<Props> = ({
  onClose,
  onAddManufacturer,
  manufacturers,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      const newManufacturer = await handleAddManufacturer(name, description);

      if (!newManufacturer) {
        toast.error("Failed to add manufacturer");
        return;
      }

      onAddManufacturer(newManufacturer);
      onClose();
      toast.success("Manufacturer added successfully");
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
        Add Manufacturer
      </h1>
      <Input label="Name" value={name} onChange={setName} mandatory={true} />
      <Input
        label="Description"
        value={description}
        onChange={setDescription}
        mandatory={true}
      />

      {/* THIS WILL BE REMOVED IN THE PROD */}
      <div
        className="quickadds"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => {
            setName("Lockhead Martin LLC");
          }}
        >
          Quickadd 1
        </button>
        <button
          onClick={() => {
            setName("Arme Romania SRL");
          }}
        >
          Quickadd 2
        </button>
        <button
          onClick={() => {
            setName("US Weapon Registry");
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

export default AddManufacturerForm;
