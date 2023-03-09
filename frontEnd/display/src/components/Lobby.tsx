import React, { useEffect, useState } from "react";
import { LobbyClient } from "boardgame.io/client";
import Link from "next/link";
import Qrcode from "./Qrcode";
import {
  BsFillSuitClubFill,
  BsFillSuitDiamondFill,
  BsFillSuitHeartFill,
  BsFillSuitSpadeFill,
} from "react-icons/bs";
//import Loading from "@shared/components/Loading";

const Lobby = () => {
  const serverPort: string | undefined = process.env.NEXT_PUBLIC_SERVER_PORT;
  const clientPort: string | undefined = process.env.NEXT_PUBLIC_CLIENT_PORT;
  const [matchURL, setmatchURL] = useState<string>("");

  // create a game on server and return the matchID
  const createGame = async (protocoll: string) => {
    if (!serverPort) return console.error("Missing port for creating game!");

    const url = new URL(`${protocoll}localhost:${serverPort}`);

    url.pathname = "serverIp";
    console.log("url", url);
    const lobbyClient = new LobbyClient({ server: url.origin });

    try {
      const { matchID } = await lobbyClient.createMatch("bridge", {
        numPlayers: 5,
      });
      const response = await fetch(url.href, { method: "POST" });
      const { serverIp } = await response.json();

      createClientURL({ serverIp, matchID, protocoll });
    } catch (error) {
      console.error("Failed to get match id and server ip", error);
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
    lobbyURL.pathname = `matchID=${matchID}`;

    setmatchURL(lobbyURL.href);
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      // get protocoll(http,https) from browser
      const protocoll = window.location.protocol;
      createGame(protocoll);
    }
  }, []);

  return (
    <div>
      MatchID{matchURL}
      <p>
        {matchURL !== "" && (
          <Link href={`${matchURL}`} target="_blank">
            <Qrcode matchURL={matchURL} />
          </Link>
        )}
      </p>
      <div className="loading-screen">
        <div className="loading-screen__text">
          <h1>Loading</h1>
        </div>
        <div className="loading-screen__icon suit-club">
          <BsFillSuitClubFill />
        </div>
        <div className="loading-screen__icon suit-diamond">
          <BsFillSuitDiamondFill />
        </div>
        <div className="loading-screen__icon suit-heart">
          <BsFillSuitHeartFill />
        </div>
        <div className="loading-screen__icon suit-spade">
          <BsFillSuitSpadeFill />
        </div>
      </div>
    </div>
  );
};

export default Lobby;
