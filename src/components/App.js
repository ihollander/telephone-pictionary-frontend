import React, { useState } from "react";
import Canvas from "./Canvas";
import SocketProvider from "../sockets/SocketProvider";

const colors = ["black", "red", "orange", "yellow", "green", "blue", "purple"];

function App() {
  const [strokeColor, setStrokeColor] = useState("black");
  const [lineWidth, setLineWidth] = useState(2);

  return (
    <SocketProvider url="http://5fba75db.ngrok.io">
      <div>
        <select
          value={strokeColor}
          onChange={({ target: { value } }) => setStrokeColor(value)}
        >
          {colors.map(color => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
        <input
          type="range"
          min={1}
          max={10}
          value={lineWidth}
          onChange={({ target: { value } }) => setLineWidth(value)}
        />
        <Canvas strokeColor={strokeColor} lineWidth={lineWidth} />
      </div>
    </SocketProvider>
  );
}

export default App;
