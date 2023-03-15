import React, { useEffect, useState } from "react";
import { LobbyClient } from "boardgame.io/client";
import { Match, MatchData, URLS } from "@interface";
import createBridgeClient from "@displayComponents/BridgeClient";
import { useRouter } from "next/router";

const Demo = ({ urls }: { urls: URLS }) => {
  const clientPort: String | undefined = process.env.NEXT_PUBLIC_CLIENT_PORT;
  const { serverURL, displayURL } = urls;
  const lobbyClient = new LobbyClient({ server: serverURL.origin });
  const [matchData, setmatchData] = useState<MatchData | null>(null);
  const [BridgeClient, setBridgeClient] = useState<any>();
  const [matchID, setmatchID] = useState<string>("");
  const [matchURL, setmatchURL] = useState<string>("");
  const [displayJoinURL, setdisplayJoinURL] = useState<string>("");
  const [joiningDisplay, setjoiningDisplay] = useState<string>("");
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
      setmatchID(matchID);
      createClientURL({ serverIp, matchID, protocoll });
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
    const BrideClient = createBridgeClient({
      socketAdress: `${process.env.NEXT_PUBLIC_Server_ADDRESS}:${process.env.NEXT_PUBLIC_SERVER_PORT}`,
    });
    setBridgeClient((prev: any) => (prev = BrideClient));
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
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    console.log("TEST!!!!!! :>> ", matchData);
    if (matchID) {
      joinMatch(matchID);
      displayURL.searchParams.set("matchID", matchID);
      setdisplayJoinURL(displayURL.href);
      console.log("displayURL :>> ", displayURL);
    }
  }, [matchID]);

  const container = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    gap: "2rem",
    padding: "0 1rem",
  };

  const displayStyle = {
    height: "70vh",
    boxShadow: "3px 3px 20px 0 black",
    padding: "0",
    aspectRatio: "1.7/1",
  };
  const clientStyle = {
    height: "48vh",
    boxShadow: "3px 3px 20px 0 black",
    padding: "0",
    aspectRatio: "9/16",
    margin: ".5rem",
  };

  return (
    <>
      <div>
        {displayJoinURL && (
          <div style={container}>
            <iframe src={displayJoinURL} style={displayStyle}></iframe>

            <div className="clients">
              <iframe src={matchURL} style={clientStyle}></iframe>
              <iframe src={matchURL} style={clientStyle}></iframe>
              <iframe src={matchURL} style={clientStyle}></iframe>
              <iframe src={matchURL} style={clientStyle}></iframe>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Demo;
