import React from "react";
import SocketProvider from "../sockets/SocketProvider";
import CanvasContainer from "./CanvasContainer";

// const serverUrl = "http://localhost:3456"
const serverUrl = "http://0284309d.ngrok.io";

function App() {
  return (
    <SocketProvider url={serverUrl}>
      <CanvasContainer />
    </SocketProvider>
  );
}

export default App;
