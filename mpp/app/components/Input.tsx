import React from "react";

const Input: React.FC<InputProps> = ({ label, value, placeholder, onChange }) => {
  return (
    <div className="input">
      <p>{label}</p>
      <input
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
