import { useEffect, useContext } from "react";
import SocketContext from "./SocketContext";

export const useSocketListener = (eventKey, callback) => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (eventKey && callback) {
      socket.on(eventKey, callback);

      return () => socket.removeListener(eventKey, callback);
    }
  });

  return socket;
};
