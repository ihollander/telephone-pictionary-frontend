import React from "react";
import io from "socket.io-client";
import SocketContext from "./SocketContext";

const SocketProvider = ({ url, children }) => {
  console.log("provider render");
  const socket = io(url);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
