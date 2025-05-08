import React from "react";

const ManufacturerComponent: React.FC<Manufacturer> = ({
  id,
  name,
  description,
  selected,
}) => {
  const FONT_SIZE_PARAGRAPH = "13px";
  const border = selected ? "2px solid #539BF5" : "2px solid #f7f7f7";

  return (
    <div
      style={{
        width: "100%",
        border: border,
        padding: "20px",
        boxSizing: "border-box",
        marginBottom: "10px",
        background: "#f7f7f7",
        borderRadius: "5px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
      }}
    >
      <h3 style={{ fontWeight: "500" }}>{name}</h3>
      <p style={{ fontSize: FONT_SIZE_PARAGRAPH }}>ID: {id}</p>
      <p style={{ fontSize: FONT_SIZE_PARAGRAPH }}>{description}</p>
    </div>
  );
};

export default ManufacturerComponent;
