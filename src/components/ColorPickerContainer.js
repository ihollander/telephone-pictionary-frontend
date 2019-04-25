import React from "react";
import ColorPickerCell from "./ColorPickerCell";

const colors = [
  "black",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink"
];

const ColorPickerContainer = ({ selectedColor, handleSelectColor }) => {
  const area = {
    width: colors.length / 2,
    height: 2
  };

  const cellProps = {
    size: area.width / area.height / colors.length
  };

  const renderColors = colors => {
    console.log(colors);
    return colors.map(color => (
      <ColorPickerCell
        key={color}
        color={color}
        size={cellProps.size}
        handleSelectColor={handleSelectColor}
      />
    ));
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gridGap: "3px"
      }}
    >
      {renderColors(colors)}
    </div>
  );
};

export default ColorPickerContainer;
