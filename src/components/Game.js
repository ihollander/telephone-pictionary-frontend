import React, { useState, useContext } from "react";
import JoinGame from "./JoinGame";
import v4 from "uuid";
import SocketContext from "../sockets/SocketContext";
import { useSocketListener } from "../sockets/useSocketListener";

const Game = () => {
  const socket = useContext(SocketContext);
  const [state, setState] = useState({
    players: [],
    localPlayerId: null
  });

  const handlePlayerLeft = id => {
    const filteredPlayers = state.players.filter(player => player.id !== id);
    setState({
      ...state,
      players: filteredPlayers,
      localPlayerId: id === state.localPlayerId ? null : state.localPlayerId
    });
  };

  const handleLocalPlayerJoin = name => {
    const newPlayer = { id: v4(), name };

    setState({
      ...state,
      players: [...state.players, newPlayer],
      localPlayerId: newPlayer.id
    });

    socket.emit("PLAYER_JOIN", newPlayer);
  };

  useSocketListener("PLAYER_JOIN", newPlayer => {
    console.log(newPlayer);
  });

  const mappedPlayers = state.players.map((player, index) => {
    let nextIndex = null;
    if (state.players.length > 1) {
      if (index === state.players.length - 1) {
        nextIndex = 0;
      } else {
        nextIndex = index + 1;
      }
    }

    return {
      ...player,
      next: nextIndex
    };
  });

  return (
    <div>
      <JoinGame handleNameSubmit={handleLocalPlayerJoin} />
      <ul>
        {mappedPlayers.map(player => {
          return (
            <li key={player.id} onClick={() => handlePlayerLeft(player.id)}>
              {player.name}
              {player.next !== null &&
                `| Next: ${mappedPlayers[player.next].name}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Game;
