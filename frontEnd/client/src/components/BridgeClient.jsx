import { Client } from "boardgame.io/react";
import { Bridge } from "../lib/Bridge";
import { players } from "../lib/players";
import BridgeBoard from "./Board";
import { SocketIO, Local } from "boardgame.io/multiplayer";

const BridgeClient = Client({
  game: Bridge,
  board: BridgeBoard,
  numPlayers: 4,
});

export default BridgeClient;
