import { LobbyClient } from "boardgame.io/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Lobby } from "boardgame.io/react";
import { Bridge } from "@/lib/Bridge";
import BridgeBoard from "./Board";
import BridgeClient from "./BridgeClient";

const MyLobby = () => {
  const [newMatchID, setNewMatchID] = useState(null);
  const [loading, setloading] = useState(true);
  const router = useRouter();
  const lobbyClient = new LobbyClient({ server: "http://localhost:5555" });
  const [match, setmatch] = useState(null);
  const [players, setplayers] = useState(null);

  async function getMatchID() {
    try {
      const { matchID } = await lobbyClient.createMatch("bridge", {
        numPlayers: 4,
      });
      setNewMatchID(matchID);
      setloading(false);
    } catch (error) {
      console.error("Failed get match id:", error);
      setloading(false);
    }
  }

  async function getLobbyInformations(newMatchID) {
    console.log("newMatchID :>> ", newMatchID);
    const match = await lobbyClient.getMatch("bridge", newMatchID);
    setmatch(match);
    setplayers(match.players);
    console.log("match :>> ", match);
  }

  useEffect(() => {
    getMatchID();
  }, []);

  useEffect(() => {
    let myIntervall;
    if (newMatchID) {
      myIntervall = setInterval(() => {
        getLobbyInformations(newMatchID);
      }, 2000);
    }
    return () => {
      clearInterval(myIntervall);
    };
  }, [newMatchID]);

  if (loading) return <Loading />;

  return (
    <>
      <Link href={`/joinGame/${newMatchID}`} target="_blank">
        GO to waiting lobby
      </Link>

      {match && <p> MatchID {match.matchID}</p>}
      {players &&
        players.map((player) => (
          <p key={player.id}>
            PlayerID: {player.id} // PlayerName:{player.name}
          </p>
        ))}

      {/* <Lobby
        gameServer={`http://localhost:5555`}
        lobbyServer={`http://localhost:5555`}
        gameComponents={[{ game: Bridge, board: BridgeBoard }]}
      /> */}
    </>
  );
};

export default MyLobby;
