import React from "react";
import styles from "./ColorSlider.module.css";

const ColorSlider = ({ value, handleSelectColor }) => {
  return (
    <div className={styles.colorSlider}>
      <input
        type="range"
        onChange={({ target: { value } }) => handleSelectColor(value)}
        value={value}
        min={0}
        max={8}
        step={0.01}
      />
    </div>
  );
};

export default ColorSlider;
