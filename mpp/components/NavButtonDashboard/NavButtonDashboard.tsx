import React from "react";
import "./NavButtonDashboard.css";

const NavButtonDashboard: React.FC<NavButtonDashboardProps> = ({ text, onClick }) => {
  return (
    <button
      style={{
        background: "transparent",
        color: "white",
        border: "none",
        padding: "0 28px",
        fontSize: "13px",
        height: "100%",
      }}
      onClick={onClick}
      className="nav-button-dashboard"
    >
      {text}
    </button>
  );
};

export default NavButtonDashboard;
