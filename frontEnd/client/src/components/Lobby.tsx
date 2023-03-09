import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const Lobby = () => {
  const router = useRouter();

  useEffect(() => {
    console.log("router :>> ", router);
  }, [router.isReady]);

  // if (loading) return <Loading />;

  return <>Client Lobby</>;
};

export default Lobby;
