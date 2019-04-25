import React, { useRef, useState, useEffect, useContext } from "react";
import { throttle } from "../helpers/timing";
import SocketContext from "../sockets/SocketContext";
import { useSocketListener } from "../sockets/useSocketListener";

const Canvas = ({ strokeColor = "black", lineWidth = 2 }) => {
  const canvasRef = useRef(null);
  const [lines, setLines] = useState([]);
  const socket = useContext(SocketContext);

  // this will run only on first render
  useEffect(() => {
    // set the canvas size based on its parent
    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }, []);

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

  // Event Handlers
  const handleMouseDown = ({ nativeEvent: { offsetX, offsetY } }) => {
    startDrawing(offsetX, offsetY);
  };

  const handleTouchStart = ({ nativeEvent: { touches } }) => {
    startDrawing(touches[0].clientX, touches[0].clientY);
  };

  const handleMouseMove = ({ nativeEvent: { offsetX, offsetY } }) => {
    drawNextPoint(offsetX, offsetY);
  };

  const handleTouchMove = event => {
    event.preventDefault();
    const { touches } = event.nativeEvent;
    drawNextPoint(touches[0].clientX, touches[0].clientY);
  };

  // drawing
  const tempState = {
    line: {
      points: [],
      strokeColor,
      lineWidth
    },
    isDrawing: false,
    ctx: null
  };

  const startDrawing = (startX, startY) => {
    // setup context, is this the right place to do this...
    tempState.ctx = canvasRef.current.getContext("2d");
    tempState.isDrawing = true;
    tempState.line.points.push([startX, startY]);
    setupLineStyle(tempState.ctx, tempState.line);
  };

  const drawNextPoint = (newX, newY) => {
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

  const endDrawing = () => {
    tempState.isDrawing = false;
    if (tempState.line.points.length) {
      socket.emit("line", tempState.line);
      setLines([...lines, tempState.line]);
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
      style={{
        touchAction: "none",
        cursor: "crosshair",
        height: "100%",
        width: "100%"
      }}
      ref={canvasRef}
      onPointerDown={handleMouseDown}
      onPointerMove={throttle(handleMouseMove, 10)}
      onPointerUp={endDrawing}
      // onPointerLeave={endDrawing}
      // onPointerOut={endDrawing}
      onPointerCancel={endDrawing}

      // onMouseDown={handleMouseDown}
      // onMouseUp={endDrawing}
      // onMouseOut={endDrawing}
      // onMouseMove={throttle(handleMouseMove, 10)}
      // onTouchStart={handleTouchStart}
      // onTouchEnd={endDrawing}
      // onTouchCancel={endDrawing}
      // onTouchMove={throttle(handleTouchMove, 10)}
    />
  );
};

export default Canvas;
