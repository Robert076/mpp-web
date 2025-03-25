import React from "react";

const Input: React.FC<InputProps> = ({ label, value, placeholder, onChange, mandatory }) => {
  return (
    <div className="input" style={{ marginBottom: "15px" }}>
      <p style={{ fontSize: "12px" }}>
        {label}
        {mandatory ? "*" : ""}
      </p>
      <input
        style={{
          borderRadius: "5px",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          padding: "3px 5px",
          fontSize: "14px",
          outline: "none",
        }}
        type="text"
        value={value}
        placeholder={placeholder ? placeholder : ""}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
