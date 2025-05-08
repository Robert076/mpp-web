import React from "react";

const GunComponent: React.FC<Gun> = ({
  name,
  caliber,
  weight,
  actionType,
  category,
  effectiveRange,
  selected,
  highlightedBlue,
  highlightedRed,
  manufacturerId,
}) => {
  const FONT_SIZE_PARAGRAPH = "13px";
  const border = selected ? "2px solid #539BF5" : "2px solid #f7f7f7";
  const backgroundColor = highlightedBlue
    ? "rgba(83, 156, 245, 0.16)"
    : highlightedRed
    ? "rgba(245, 83, 83, 0.16)"
    : "#f7f7f7";
  return (
    <div
      style={{
        width: "100%",
        border: highlightedBlue
          ? "2px solid rgba(83, 156, 245, 0.16)"
          : highlightedRed
          ? "2px solid rgba(245, 83, 83, 0.16)"
          : border,
        padding: "20px",
        boxSizing: "border-box",
        marginBottom: "10px",
        background: backgroundColor,
        borderRadius: "5px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
      }}
    >
      <h3 style={{ fontWeight: "500" }}>{name}</h3>
      <p style={{ fontSize: FONT_SIZE_PARAGRAPH }}>Caliber: {caliber}mm</p>
      <p style={{ fontSize: FONT_SIZE_PARAGRAPH }}>Weight: {weight}kg</p>
      <p style={{ fontSize: FONT_SIZE_PARAGRAPH }}>Action type: {actionType}</p>
      <p style={{ fontSize: FONT_SIZE_PARAGRAPH }}>Category: {category}</p>
      <p style={{ fontSize: FONT_SIZE_PARAGRAPH }}>Effective range: {effectiveRange}m</p>
      <p style={{ fontSize: FONT_SIZE_PARAGRAPH }}>Manufacturer ID: {manufacturerId}</p>
    </div>
  );
};

export default GunComponent;
