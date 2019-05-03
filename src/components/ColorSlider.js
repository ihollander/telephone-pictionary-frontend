import React from "react";
import styles from "./ColorSlider.module.css";
import { gradientRangeAdapter } from "../helpers/colors";

const ColorSlider = ({ gradientSteps, onChange }) => {
  const handleChange = ({ target: { value } }) => {
    const gradientHelper = gradientRangeAdapter(gradientSteps);
    const rgb = gradientHelper.valueToRgb(value);
    onChange(rgb);
  };

  return (
    <div className={styles.colorSlider}>
      <input
        type="range"
        onChange={handleChange}
        defaultValue={0}
        min={0}
        max={gradientSteps.length - 1}
        step={0.01}
      />
    </div>
  );
};

ColorSlider.defaultProps = {
  gradientSteps: [
    "rgb(255,0,0)",
    "rgb(255,0,255)",
    "rgb(0,0,255)",
    "rgb(0,255,255)",
    "rgb(0,255,0)",
    "rgb(255,255,0)",
    "rgb(255,0,0)",
    "rgb(0,0,0)",
    "rgb(255,255,255)"
  ],
  onChange: () => {}
};

export default ColorSlider;
