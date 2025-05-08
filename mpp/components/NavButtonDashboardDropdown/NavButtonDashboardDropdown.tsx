import React, { useState } from "react";
import "./NavButtonDashboardDropdown.css";

interface NavButtonDashboardDropdownProps {
  text: string;
  options: string[];
  setEntity: (option: string) => void;
}

const NavButtonDashboardDropdown: React.FC<NavButtonDashboardDropdownProps> = ({
  text,
  options,
  setEntity,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: string) => {
    setEntity(option);
    setIsOpen(false); // Close the popup on selecting an option
  };

  return (
    <div className="nav-button-dashboard-dropdown-container" style={{ height: "100%" }}>
      <button
        style={{
          background: "transparent",
          color: "white",
          border: "none",
          padding: "0 28px",
          fontSize: "13px",
          height: "100%",
        }}
        onClick={togglePopup}
        className="nav-button-dashboard-dropdown"
      >
        {text}
      </button>

      {isOpen && (
        <div className="popup-overlay" onClick={() => setIsOpen(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>Select an option</h3>
              <button className="close-button" onClick={() => setIsOpen(false)}>
                x
              </button>
            </div>
            <div className="popup-options">
              {options.map((option, index) => (
                <button
                  key={index}
                  className="popup-option"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavButtonDashboardDropdown;
