import React, { useEffect, useState } from "react";
import { LobbyClient } from "boardgame.io/client";
import { Match, URLS } from "@interface";
import { useRouter } from "next/router";

const Demo = ({ urls }: { urls: URLS }) => {
  const { serverURL, displayURL, clientURL } = urls;
  const lobbyClient = new LobbyClient({ server: serverURL.origin });
  const [matchID, setmatchID] = useState<string>("");
  const [matchURL, setmatchURL] = useState<string>("");
  const [displayJoinURL, setdisplayJoinURL] = useState<string>("");
  const router = useRouter();

  // create a game on server and return the matchID
  const createGame = async () => {
    const url = serverURL;
    url.pathname = "serverIp";

    try {
      const { matchID } = await lobbyClient.createMatch("bridge", {
        numPlayers: 5,
        setupData: { name: "display" },
      });

      setmatchID(matchID);
      createClientURL({ matchID });
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
      // setmatchData({ ...match, matchID });
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

  useEffect(() => {}, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      if (router.isReady) {
        const matchID: string | string[] | undefined = router?.query?.matchID;

        // get protocoll(http,https) from browser
        const protocoll = window.location.protocol;

        if (!matchID) {
          createGame();
          return;
        }
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    console.log("TEST!!!!!! :>> ", matchID);
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
    padding: "0",
  };

  const displayStyle = {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    boxShadow: "3px 3px 20px 0 black",
    padding: "0",
    aspectRatio: "1.7/1",
    scale: "0.75",
    top: "-12.5%",
    left: "-12.5%",
  };
  const clientStyle = {
    height: "48vh",
    boxShadow: "3px 3px 20px 0 black",
    padding: "0",
    aspectRatio: "9/16",
    margin: ".5rem",
  };
  const clients = {
    position: "fixed",
    bottom: "0",
    width: "max-content",
    right: "0",
  };

  return (
    <>
      <div>
        {displayJoinURL && (
          <div style={container}>
            {/*@ts-ignore*/}
            <iframe src={displayJoinURL} style={displayStyle}></iframe>

            {/*@ts-ignore*/}
            <div style={clients}>
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
