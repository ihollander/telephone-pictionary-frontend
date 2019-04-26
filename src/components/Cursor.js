import React from "react";

const Cursor = ({ visible, color, y, x, size }) => {
  return (
    <div
      style={{
        display: visible ? "block" : "none",
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: color,
        top: `${y}px`,
        left: `${x}px`
      }}
    />
  );
};

export default Cursor;
