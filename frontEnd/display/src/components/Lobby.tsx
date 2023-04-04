import React, { useEffect, useState } from "react";
import { LobbyClient } from "boardgame.io/client";
import { Match, MatchData, URLS } from "@interface";
import createBridgeClient from "./BridgeClient";
import { useRouter } from "next/router";
import lobby from "../styles/lobby.module.css";

const Lobby = ({ urls }: { urls: URLS }) => {
  const { serverURL, clientURL } = urls;
  const lobbyClient = new LobbyClient({ server: serverURL.origin });
  const [matchData, setmatchData] = useState<MatchData | null>(null);
  const [matchURL, setmatchURL] = useState<string>("");
  const router = useRouter();
  const BridgeClient = createBridgeClient({
    socketAdress: `${serverURL}`,
  });
  console.log("serverURL :>> ", serverURL);
  // create a game on server and return the matchID
  const createGame = async () => {
    try {
      const { matchID } = await lobbyClient.createMatch("bridge", {
        numPlayers: 5,
        setupData: { name: "display" },
      });

      createClientURL({ matchID });
      joinMatch(matchID);
      setmatchData({ matchID });
    } catch (error) {
      console.error("Failed to get match id ", error);
    }
  };

  // join match as display
  const joinMatch = async (matchID: string) => {
    const lobbyClient = new LobbyClient({ server: serverURL.origin });
    const playerData = {
      playerName: "display",
      playerID: "4",
    };

    try {
      const match: Match = await lobbyClient.joinMatch(
        "bridge",
        matchID,
        playerData
      );
      setmatchData({ ...match, matchID });
    } catch (error: any) {
      if (error.details.includes("maximum number of players"))
        return alert("Maximun players reached");
      console.error("Failed join match", error);
    }
  };

  //create Client URL for qr code
  const createClientURL = ({ matchID }: { matchID: string }) => {
    const lobbyURL = clientURL;
    lobbyURL.pathname = "lobby";
    lobbyURL.searchParams.set("matchID", matchID);
    setmatchURL(lobbyURL.href);
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      if (router.isReady) {
        const matchID: string | string[] | undefined = router?.query?.matchID;

        // get (http,https) from browser

        if (!matchID) {
          createGame();
          return;
        }

        if (matchID && typeof matchID === "string") {
          setmatchData({ matchID });
          joinMatch(matchID);
        }
      }
    }
  }, [router.isReady]);

  return (
    <>
      <h1>DISPLAY!!!</h1>
      <div className={lobby.lobby}>
        {BridgeClient && matchData && (
          <BridgeClient matchID={matchData.matchID} matchURL={matchURL} />
        )}
      </div>
    </>
  );
};

export default Lobby;
