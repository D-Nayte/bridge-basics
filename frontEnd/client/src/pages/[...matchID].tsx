import BridgeClient from "@components/BridgeClient";
import { LobbyClient } from "boardgame.io/dist/types/packages/client";
import Lobby from "@components/Lobby";

import { Router, useRouter } from "next/router";
import { useEffect } from "react";

const index = () => {
  const router = useRouter();

  useEffect(() => {
    console.log("router :>> ", router);
  }, [router.isReady]);

  return (
    <>
      <main>
        <Lobby />
        {/* <BridgeClient /> */}
      </main>
    </>
  );
};

export default index;
