import React from "react";

const GunComponent: React.FC<Gun> = ({
  name,
  caliber,
  weight,
  actionType,
  category,
  effectiveRange,
}) => {
  const FONT_SIZE_PARAGRAPH = "13px";
  return (
    <div
      style={{
        width: "100%",
        border: "none",
        padding: "20px",
        boxSizing: "border-box",
        marginBottom: "10px",
        background: "#f7f7f7",
        borderRadius: "5px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 style={{ fontWeight: "500" }}>{name}</h3>
      <p style={{ fontSize: FONT_SIZE_PARAGRAPH }}>Caliber: {caliber}mm</p>
      <p style={{ fontSize: FONT_SIZE_PARAGRAPH }}>Weight: {weight}kg</p>
      <p style={{ fontSize: FONT_SIZE_PARAGRAPH }}>Action type: {actionType}</p>
      <p style={{ fontSize: FONT_SIZE_PARAGRAPH }}>Category: {category}</p>
      <p style={{ fontSize: FONT_SIZE_PARAGRAPH }}>Effective range: {effectiveRange}m</p>
    </div>
  );
};

export default GunComponent;
