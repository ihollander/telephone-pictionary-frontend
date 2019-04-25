import React, { useState } from "react";
import Canvas from "./Canvas";
import SocketProvider from "../sockets/SocketProvider";
import ColorPickerContainer from "./ColorPickerContainer";

// const serverUrl = "http://localhost:3456"
const serverUrl = "http://e435ac4b.ngrok.io";

function App() {
  const [strokeColor, setStrokeColor] = useState("black");
  const [lineWidth, setLineWidth] = useState(2);

  return (
    <SocketProvider url={serverUrl}>
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          height: "600px",
          border: "3px solid #ccc",
          margin: "0 auto"
        }}
      >
        <div className="tool-container">
          <ColorPickerContainer
            selectedColor={strokeColor}
            handleSelectColor={setStrokeColor}
          />
        </div>
        <input
          type="range"
          min={1}
          max={10}
          value={lineWidth}
          onChange={({ target: { value } }) => setLineWidth(value)}
        />
        <div className="canvas-container" style={{ height: "100%" }}>
          <Canvas strokeColor={strokeColor} lineWidth={lineWidth} />
        </div>
      </div>
    </SocketProvider>
  );
}

export default App;
