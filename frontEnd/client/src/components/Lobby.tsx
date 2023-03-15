import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { LobbyClient } from "boardgame.io/client";
import { Match, MatchData, RawPlayer, URLS } from "@interface";
import Link from "next/link";
import { starterName } from "../utils/randomName";
import lobby from "../style/lobby.module.css";

const Lobby = ({ urls }: { urls: URLS }) => {
  console.log("urls", urls);
  const router = useRouter();
  const { serverURL } = urls;
  const [matchData, setmatchData] = useState<MatchData | null>(null);
  const [playerName, setplayerName] = useState<string>(starterName());
  const [currPlayerData, setcurrPlayerData] = useState<RawPlayer | null>(null);
  const [demo, setdemo] = useState(false);
  const randomAvatarURL = `https://api.dicebear.com/5.x/micah/svg?seed=${encodeURI(
    playerName
  )}`;
  console.log("randomAvatarURL", randomAvatarURL);
  const lobbyClient = new LobbyClient({ server: serverURL.origin });
  const gameURL = `/game?id=${matchData?.matchID}&&playerID=${currPlayerData?.id}&&playerCredentials=${currPlayerData?.playerCredentials}`;

  // join a match and store relevant data in state
  const joinMatch = async (matchID: string) => {
    const lobbyClient = new LobbyClient({ server: serverURL.origin });
    const playerData: { playerName: string; imageURL: string } = {
      playerName,
      imageURL: randomAvatarURL,
    };

    try {
      const match: Match = await lobbyClient.joinMatch("bridge", matchID, {
        playerName: playerData.playerName,
        data: { imageURL: playerData.imageURL },
      });
      setmatchData({ ...match, matchID });
    } catch (error: any) {
      if (error?.details?.includes("maximum number of players"))
        return alert("Maximun players reached");
      console.error("Failed join match", error);
    }
  };

  // get current macth and sture userData in state
  const getCurrentMatch = async () => {
    if (matchData?.playerID) {
      const { playerID, playerCredentials, matchID } = matchData;
      try {
        const { players } = await lobbyClient.getMatch(
          "bridge",
          matchData.matchID
        );
        const { id, data, name } = players[parseInt(playerID)];
        setcurrPlayerData({
          id,
          data,
          name,
          playerCredentials,
        });
      } catch (error) {
        console.error("Failed to get current match", error);
      }
    }
  };

  //change player name and later also image link
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (matchData) {
      const { playerID, playerCredentials, matchID } = matchData;
      if (!playerID || !playerCredentials)
        return console.error("Can't update player. Match data wrong");

      await lobbyClient.updatePlayer("bridge", matchID, {
        credentials: playerCredentials || "undefined",
        playerID,
        newName: playerName,
      });
      getCurrentMatch();
    }
  };

  useEffect(() => {
    if (matchData) getCurrentMatch();
  }, [matchData]);

  useEffect(() => {
    if (router?.query?.matchID && typeof router?.query?.matchID === "string") {
      const matchID: string = router.query.matchID;
      joinMatch(matchID);
    }
  }, [router.isReady]);

  return (
    <div className={lobby.wrapper}>
      <div>
        <img src={currPlayerData?.data?.imageURL} alt="" />
        <h3>{currPlayerData?.name}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="changeName"
            onChange={(e) => setplayerName(e.target.value)}
          />
          <button>Change Name</button>
        </form>
      </div>
      <button>
        <Link href={gameURL}>Join Game</Link>
      </button>
    </div>
  );
};

export default Lobby;
