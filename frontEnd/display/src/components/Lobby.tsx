import React, { useEffect, useState } from "react";
import { LobbyClient } from "boardgame.io/client";
import { Match, MatchData, URLS } from "@interface";
import createBridgeClient from "./BridgeClient";
import { useRouter } from "next/router";
import lobby from "../styles/lobby.module.css";

const Lobby = ({ urls }: { urls: URLS }) => {
  const clientPort: String | undefined = process.env.NEXT_PUBLIC_CLIENT_PORT;
  const { serverURL } = urls;
  const lobbyClient = new LobbyClient({ server: serverURL.origin });
  const [matchData, setmatchData] = useState<MatchData | null>(null);
  const BridgeClient = createBridgeClient({
    socketAdress: `${process.env.NEXT_PUBLIC_Server_ADDRESS}:${process.env.NEXT_PUBLIC_SERVER_PORT}`,
  });
  // const [BridgeClient, setBridgeClient] = useState<any>();
  const [matchURL, setmatchURL] = useState<string>("");
  const router = useRouter();

  // create a game on server and return the matchID
  const createGame = async (protocoll: string) => {
    const url = serverURL;
    url.pathname = "serverIp";
    try {
      const { matchID } = await lobbyClient.createMatch("bridge", {
        numPlayers: 5,

        setupData: { test: "kasldnlk", name: "display" },
      });
      const response = await fetch(url.href, { method: "POST" });
      const { serverIp } = await response.json();

      createClientURL({ serverIp, matchID, protocoll });
      joinMatch(matchID);
      setmatchData({ matchID });
    } catch (error) {
      console.error("Failed to get match id and server ip", error);
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
  const createClientURL = ({
    serverIp,
    matchID,
    protocoll,
  }: {
    serverIp: string;
    matchID: string;
    protocoll: string;
  }) => {
    const lobbyURL = new URL(`${protocoll}${serverIp}:${clientPort}`);
    lobbyURL.pathname = "lobby";
    lobbyURL.searchParams.set("matchID", matchID);
    setmatchURL(lobbyURL.href);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      if (router.isReady) {
        const matchID: string | string[] | undefined = router?.query?.matchID;

        // get protocoll(http,https) from browser
        const protocoll = window.location.protocol;

        if (!matchID) {
          createGame(protocoll);
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
      <div className={lobby.lobby}>
        {BridgeClient && matchData && (
          <BridgeClient matchID={matchData.matchID} matchURL={matchURL} />
        )}
      </div>
    </>
  );
};

export default Lobby;
