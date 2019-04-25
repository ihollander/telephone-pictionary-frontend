import React from "react";

const ColorPickerCell = ({ size, color, handleSelectColor }) => {
  console.log(color);

  return (
    <div
      onClick={() => handleSelectColor(color)}
      style={{
        backgroundColor: color,
        border: "1px solid black",
        cursor: "pointer"
      }}
    />
  );
};

export default ColorPickerCell;
