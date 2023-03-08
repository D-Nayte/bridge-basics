import React, { useEffect, useState } from "react";
import { LobbyClient } from "boardgame.io/client";

const Lobby = () => {
  const port: String | undefined = process.env.NEXT_PUBLIC_SERVER_PORT;
  const [matchID, setmatchID] = useState<null | String>(null);

  const createGame = async () => {
    if (!port) return console.error("Missing port for creating game!");
    // create a game on server and return the matchID
    const lobbyClient = new LobbyClient({ server: `http://localhost:${port}` });
    const { matchID } = await lobbyClient.createMatch("bridge", {
      numPlayers: 5,
    });

    setmatchID(matchID);
  };

  useEffect(() => {
    createGame();
  }, []);

  return <div>MatchID{matchID}</div>;
};

export default Lobby;
