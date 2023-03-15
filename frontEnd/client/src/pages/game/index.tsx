import { getURLs } from "@shared/utils/urls";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import createBridgeClient from "../../components/BridgeClient";

const Index = () => {
  const router = useRouter();
  const [matchData, setmatchData] = useState<{
    matchID: string;
    playerCredentials: string;
    playerID: string;
  } | null>(null);
  const BrideClient = createBridgeClient({
    socketAdress: `${process.env.NEXT_PUBLIC_Server_ADDRESS}:${process.env.NEXT_PUBLIC_SERVER_PORT}`,
  });

  useEffect(() => {
    if (router?.query.id && router?.query.playerID) {
      const { id, playerID, playerCredentials } = router.query;
      if (
        typeof id === "string" &&
        typeof playerID === "string" &&
        typeof playerCredentials === "string"
      )
        setmatchData({ matchID: id, playerID, playerCredentials });
    }
  }, [router.isReady]);

  return (
    <main>
      {matchData && (
        <BrideClient
          matchID={matchData.matchID}
          playerID={matchData.playerID}
          credentials={matchData.playerCredentials}
        />
      )}
    </main>
  );
};

export default Index;
