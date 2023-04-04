import { getURLs } from "@shared/utils/urls";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import createBridgeClient from "../../components/BridgeClient";
import { URLS } from "@interface";

const Index = ({ urls }: { urls: URLS }) => {
  const { serverURL } = urls;
  const router = useRouter();
  const [matchData, setmatchData] = useState<{
    matchID: string;
    playerCredentials: string;
    playerID: string;
  } | null>(null);
  const BrideClient = createBridgeClient({
    socketAdress: `${serverURL}`,
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
