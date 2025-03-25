import React, { useState } from "react";
import Input from "../../Input/Input";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
  onDeleteGun: (guns: Gun[]) => void;
  guns: Gun[];
  deletedGun: Gun | null;
}

const DeleteGunForm: React.FC<Props> = ({ onClose, onDeleteGun, guns, deletedGun }) => {
  if (!deletedGun) {
    return;
  }
  const [name, setName] = useState("");

  const handleSubmit = () => {
    const newGunsArray = guns.filter((gun) => gun.name !== deletedGun.name);
    onDeleteGun(newGunsArray);
    toast.success("Gun deleted successfully");
    onClose();
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
        Delete Gun
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
          width: "200px",
        }}
      >
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
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteGunForm;
