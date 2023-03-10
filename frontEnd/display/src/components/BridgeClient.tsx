import { Client } from "boardgame.io/react";
import { Bridge } from "@shared/src/lib/Bridge";
import BridgeBoard from "./BridgeBoard";
import { SocketIO, Local } from "boardgame.io/multiplayer";

export const createBridgeClient = ({
  socketAdress,
}: {
  socketAdress: string;
}) => {
  const BridgeClient = Client({
    game: Bridge,
    board: BridgeBoard,
    multiplayer: SocketIO({ server: socketAdress }),
  });
  return BridgeClient;
};

export default createBridgeClient;
