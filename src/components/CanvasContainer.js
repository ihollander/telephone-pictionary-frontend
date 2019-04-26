import React, { useState } from "react";
import Canvas from "./Canvas";
import ColorSlider from "./ColorSlider";
import StrokeSizeSlider from "./StrokeSizeSlider";
import { valueToRGB, gradientStepToRBG } from "../helpers/colors";

const CanvasContainer = () => {
  const [lineWidth, setLineWidth] = useState(6);
  const [colorValue, setColorValue] = useState(0);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "500px",
        height: "600px",
        border: "3px solid #ccc",
        margin: "0 auto",
        padding: "0px"
      }}
    >
      <div className="tool-container">
        <ColorSlider value={colorValue} handleSelectColor={setColorValue} />
        <StrokeSizeSlider value={lineWidth} handleSelectSize={setLineWidth} />
      </div>
      <div className="canvas-container" style={{ height: "100%" }}>
        <Canvas
          strokeColor={gradientStepToRBG(colorValue)}
          lineWidth={lineWidth}
        />
      </div>
    </div>
  );
};

export default CanvasContainer;
