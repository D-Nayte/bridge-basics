import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { LobbyClient } from "boardgame.io/client";
import { Match, MatchData, RawPlayer, URLS } from "@interface";
import Link from "next/link";
import { starterName } from "../utils/randomName";

const Lobby = ({ urls }: { urls: URLS }) => {
  const router = useRouter();
  const { serverURL } = urls;
  const [matchData, setmatchData] = useState<MatchData | null>(null);
  const [playerName, setplayerName] = useState<string>(starterName());
  const [currPlayerData, setcurrPlayerData] = useState<RawPlayer | null>(null);
  const [demo, setdemo] = useState(false);
  const randomAvatarURL = `https://api.dicebear.com/5.x/micah/svg?seed=${encodeURI(
    playerName
  )}`;
  const lobbyClient = new LobbyClient({ server: serverURL.origin });

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
    if (matchData) {
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

      await lobbyClient.updatePlayer("bridge", matchData.matchID, {
        credentials: playerCredentials,
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
    <>
      <h2>CurrentPlayer</h2>
      <h3>{currPlayerData?.name}</h3>
      <img src={currPlayerData?.data?.imageURL} alt="" width="50px" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="changeName"
          onChange={(e) => setplayerName(e.target.value)}
        />
        <button>Change</button>
      </form>

      <button>
        <Link
          href={`/game?id=${matchData?.matchID}&&playerID=${currPlayerData?.id}&&playerCredentials=${currPlayerData?.playerCredentials}`}>
          PLAY!
        </Link>
      </button>
      <button onClick={() => setdemo(true)}>Demo Play!</button>

      {demo && (
        <iframe
          src={`/game?id=${matchData?.matchID}&&playerID=${currPlayerData?.id}&&playerCredentials=${currPlayerData?.playerCredentials}`}
          width="90%"
          height={"300px"}
          style={{
            border: "5px solid red",
            marginBottom: "2rem",
            boxShadow: "0 5px 10px 3px black",
          }}></iframe>
      )}
    </>
  );
};

export default Lobby;
