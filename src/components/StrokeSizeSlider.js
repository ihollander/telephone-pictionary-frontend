import React from "react";
import styles from "./StokeSizeSlider.module.css";

const StrokeSizeSlider = ({ value, handleSelectSize }) => {
  return (
    <div className={styles.strokeSizeSlider}>
      <input
        type="range"
        onChange={({ target: { value } }) => handleSelectSize(value)}
        value={value}
        min={1}
        max={20}
        step={0.1}
      />
    </div>
  );
};

export default StrokeSizeSlider;
