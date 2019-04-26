import React from "react";
import styles from "./StokeSizeSlider.module.css";

const StrokeSizeSlider = ({ value, handleSelectSize }) => {
  const handleChange = ({ target: { value } }) => {
    console.log(value);
    handleSelectSize(value);
  };

  return (
    <div>
      <input
        type="range"
        onChange={handleChange}
        value={value}
        min={1}
        max={20}
        step={0.1}
      />
    </div>
  );
};

export default StrokeSizeSlider;
