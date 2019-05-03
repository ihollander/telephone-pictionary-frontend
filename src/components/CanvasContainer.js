import React, { useState } from "react";
import Canvas from "./Canvas";
import ColorSlider from "./ColorSlider";
import StrokeSizeSlider from "./StrokeSizeSlider";

const CanvasContainer = () => {
  const [lineWidth, setLineWidth] = useState(6);
  const [rgb, setRgb] = useState("rgb(255,0,0)");

  const gradientSteps = [
    "rgb(255,0,0)",
    "rgb(255,0,255)",
    "rgb(0,0,255)",
    "rgb(0,255,255)",
    "rgb(0,255,0)",
    "rgb(255,255,0)",
    "rgb(255,0,0)",
    "rgb(0,0,0)",
    "rgb(255,255,255)"
  ];

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
        <ColorSlider gradientSteps={gradientSteps} onChange={setRgb} />
        <StrokeSizeSlider value={lineWidth} handleSelectSize={setLineWidth} />
      </div>
      <div className="canvas-container" style={{ height: "100%" }}>
        <Canvas strokeColor={rgb} lineWidth={lineWidth} />
      </div>
    </div>
  );
};

export default CanvasContainer;
