import React, { useEffect, useState } from "react";
import { LobbyClient } from "boardgame.io/client";
import Link from "next/link";
import { Match, MatchData, URLS } from "@interface";
import BridgeClient from "./BridgeClient";
import createBridgeClient from "./BridgeClient";

const Lobby = ({ urls }: { urls: URLS }) => {
  const clientPort: String | undefined = process.env.NEXT_PUBLIC_CLIENT_PORT;
  const { serverURL } = urls;
  const [matchURL, setmatchURL] = useState<null | String>(null);
  const lobbyClient = new LobbyClient({ server: serverURL.origin });
  const [matchData, setmatchData] = useState<MatchData | null>(null);
  const [BridgeClient, setBridgeClient] = useState<any>();

  // create a game on server and return the matchID
  const createGame = async (protocoll: string) => {
    // url to server request for server IP
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
    console.log("lobbyURL :>> ", lobbyURL);
    setmatchURL(lobbyURL.href);
    const BrideClient = createBridgeClient({ socketAdress: "localhost:8080" });
    setBridgeClient((prev: any) => (prev = BrideClient));
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      // get protocoll(http,https) from browser
      const protocoll = window.location.protocol;
      createGame(protocoll);
    }
  }, []);

  return (
    <>
      <h1>MatchID{matchURL}</h1>
      <p>
        <Link href={`${matchURL}`} target="_blank">
          LINK TO CLIENT
        </Link>
      </p>
      {BridgeClient && matchData && (
        <BridgeClient matchID={matchData.matchID} />
      )}
    </>
  );
};

export default Lobby;
