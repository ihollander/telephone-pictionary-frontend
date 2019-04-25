import React, { useRef, useState, useEffect, useContext } from "react";
import { throttle } from "../helpers/timing";
import SocketContext from "../sockets/SocketContext";
import { useSocketListener } from "../sockets/useSocketListener";

const Canvas = ({ strokeColor = "black", lineWidth = 2 }) => {
  const canvasRef = useRef(null);
  const [lines, setLines] = useState([]);
  const socket = useContext(SocketContext);

  // this will run every time a new line is added to state
  useEffect(() => {
    console.log("do an effect");
    console.log("lines is", lines);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    lines.forEach(line => {
      setupLineStyle(ctx, line);
      drawLine(ctx, line.points);
    });
  }, [lines]);

  useSocketListener("line", newLine => {
    console.log("socket line", newLine);
    setLines([...lines, newLine]);
  });

  // not part of component state, use as a temp var to keep track track of mouse moves
  const tempState = {
    line: {
      points: [],
      strokeColor,
      lineWidth
    },
    isDrawing: false,
    ctx: null
  };

  const handleMouseDown = ({ nativeEvent: { offsetX, offsetY } }) =>
    handleDown(offsetX, offsetY);

  const handleTouchStart = ({ nativeEvent: { touches } }) => {
    handleDown(touches[0].clientX, touches[0].clientY);
  };

  const handleDown = (newX, newY) => {
    // setup context, is this the right place to do this...
    tempState.ctx = tempState.ctx || canvasRef.current.getContext("2d");
    setupLineStyle(tempState.ctx, tempState.line);
    // start the line
    tempState.isDrawing = true;
    tempState.line.points = [[newX, newY]];
  };

  const handleTouchEnd = () => {
    socket.emit("log", { touchEnd: tempState.line });
    handleUp();
  };

  const handleTouchCancel = () => {
    socket.emit("log", { touchCancel: tempState.line });
    handleUp();
  };

  const handleUp = () => {
    tempState.isDrawing = false;
    if (tempState.line.points.length) {
      socket.emit("line", tempState.line);
      setLines([...lines, tempState.line]);
    }
  };

  const handleMouseMove = ({ nativeEvent: { offsetX, offsetY } }) =>
    handleMove(offsetX, offsetY);

  const handleTouchMove = ({ nativeEvent: { touches } }) => {
    // const [touch] = touches;
    handleMove(touches[0].clientX, touches[0].clientY);
    socket.emit("log", { touchMove: [touches[0].clientX, touches[0].clientY] });
  };

  const handleMove = (newX, newY) => {
    if (!tempState.isDrawing) return;

    const [lastX, lastY] = tempState.line.points[
      tempState.line.points.length - 1
    ];

    if (lastX !== newX || lastY !== newY) {
      tempState.line.points = [...tempState.line.points, [newX, newY]];
      // only draw the newly added point
      drawLine(tempState.ctx, tempState.line.points.slice(-2));
      // or draw over the current points every time
      // drawLine(tempState.ctx, tempState.line.points);
      // or clear and redraw, this would need to rely on a second context so clear doesn't remove the lines from state
      // tempState.ctx.clearRect(
      //   0,
      //   0,
      //   tempState.ctx.canvas.width,
      //   tempState.ctx.canvas.height
      // );
      // drawLine(tempState.ctx, tempState.line.points);
    }
  };

  // how 2 style the line
  const setupLineStyle = (ctx, line) => {
    ctx.strokeStyle = line.strokeColor;
    ctx.lineWidth = line.lineWidth;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
  };

  // draw all points
  const drawLine = (ctx, points) => {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    points.slice(1).forEach(([x, y]) => {
      ctx.lineTo(x, y);
    });
    ctx.stroke();
  };

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseUp={handleUp}
      onMouseOut={handleUp}
      onMouseMove={throttle(handleMouseMove, 10)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onTouchMove={throttle(handleTouchMove, 10)}
    />
  );
};

export default Canvas;
