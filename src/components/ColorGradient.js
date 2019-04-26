import React, { useRef, useEffect } from "react";

const ColorGradient = ({ handleSelectColor }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;
    fillColorGradient(ctx);
    fillGreyscaleGradient(ctx);
  }, []);

  const fillColorGradient = ctx => {
    const colorGradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);

    colorGradient.addColorStop(0, "rgb(255, 0, 0)");
    colorGradient.addColorStop(0.15, "rgb(255, 0, 255)");
    colorGradient.addColorStop(0.33, "rgb(0, 0, 255)");
    colorGradient.addColorStop(0.49, "rgb(0, 255, 255)");
    colorGradient.addColorStop(0.67, "rgb(0, 255, 0)");
    colorGradient.addColorStop(0.84, "rgb(255, 255, 0)");
    colorGradient.addColorStop(1, "rgb(255, 0, 0)");

    ctx.fillStyle = colorGradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const fillGreyscaleGradient = ctx => {
    const grayscaleGradient = ctx.createLinearGradient(
      0,
      0,
      0,
      ctx.canvas.height
    );

    grayscaleGradient.addColorStop(0, "rgba(255,255,255,1)");
    grayscaleGradient.addColorStop(0.5, "rgba(255,255,255,0)");
    grayscaleGradient.addColorStop(0.5, "rgba(0,0,0,0)");
    grayscaleGradient.addColorStop(1, "rgba(0,0,0,1)");

    ctx.fillStyle = grayscaleGradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const handleClick = ({ nativeEvent: { offsetX, offsetY } }) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(offsetX, offsetY, 1, 1);
    console.log(imageData);
    handleSelectColor(
      "rgb(" +
        imageData.data[0] +
        ", " +
        imageData.data[1] +
        ", " +
        imageData.data[2] +
        ")"
    );
  };

  return (
    <div style={{ height: "100px", width: "100%" }}>
      <canvas
        style={{ height: "100%", width: "100%" }}
        ref={canvasRef}
        onClick={handleClick}
      />
    </div>
  );
};

export default ColorGradient;
