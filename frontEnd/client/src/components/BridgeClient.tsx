import { Client } from "boardgame.io/react";
import { Bridge } from "@shared/lib/Bridge";
import BridgeBoard from "./Board";
import { SocketIO, Local } from "boardgame.io/multiplayer";

const BridgeClient = Client({
  game: Bridge,
  board: BridgeBoard,
  numPlayers: 4,
});

export default BridgeClient;
