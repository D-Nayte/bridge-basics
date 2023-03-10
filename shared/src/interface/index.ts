import type { Game, Move, Ctx, FnContext } from "boardgame.io";

export interface URLS {
  serverURL: URL;
  clientURL: URL;
  displayURL: URL;
  clientPort: string | undefined;
  serverPort: string | undefined;
  displayPort: string | undefined;
}

export interface Match {
  playerID: string;
  playerCredentials: string;
  imageURL?: string;
}

export interface MatchData {
  playerID: string;
  playerCredentials: string;
  matchID: string;
}

export interface Bid {
  suit: null | string;
  level: null | string;
  double?: null | boolean;
  redouble?: null | boolean;
}

export interface RawPlayer {
  id: number;
  data?: { imageURL: string };
  name: string | undefined;
  playerCredentials?: string;
  isConnected?: boolean;
}

export interface Player extends RawPlayer {
  hand: string[];
  passed: boolean;
  bid: Bid;
}

export interface BridgeState {
  deck: string[];
  tricks: string[];
  madeBids: Bid[];
  trickIndex: number;
  contract: null | Bid;
  players: Player[];
  dealt: boolean;
}

export interface BridgeParams
  extends FnContext<BridgeState, Record<string, unknown>> {}
