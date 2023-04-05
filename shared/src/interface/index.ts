import type { Game, Move, Ctx, FnContext } from "boardgame.io";
import type { BoardProps } from "boardgame.io/react";
import { IconType } from "react-icons/lib";
import { JsxElement } from "typescript";

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
  playerID?: string;
  playerCredentials?: string;
  matchID: string;
}

export type Suit = "H" | "D" | "C" | "S" | "NT";

export interface Bid {
  suit: Suit;
  level: string;
  double?: null | boolean;
  redouble?: null | boolean;
}

export interface Card {
  name: string;
  suit: string;
  rank: number;
  image: string;
}

export interface DeckPoints {
  [key: string]: number;
}

export interface RawPlayer {
  id: number;
  data?: { imageURL: string };
  name: string | undefined;
  playerCredentials?: string;
  isConnected?: boolean;
}

export interface Vulnerability {
  [key: string]: number[];
}

export interface Player extends RawPlayer {
  hand: Card[];
  passed: boolean;
  bid: Bid | null;
  scores: number;
}

export interface Trick {
  cards: PlayerCard[];
  playerID: string;
}
export interface PlayerCard {
  card: Card;
  playerID: string;
}

export interface Contract extends Bid {
  playerID: string;
  getBonuses: string[];
}

//G
export interface BridgeState {
  deck: Card[];
  tricks: Trick[];
  highestBid: Bid | null;
  trickIndex: number;
  contract: null | Contract;
  players: Player[];
  dealt: boolean;
  turnOrder: string[];
  table: PlayerCard[];
  vulnerabilitySetup: {
    index: number;
    order: [[], [0, 2], [1, 3], [0, 1, 2, 3]];
  };
}

export interface BridgeParams
  extends FnContext<BridgeState, Record<string, unknown>> {}

// React component
export interface BridgeProps extends BoardProps<BridgeState> {}

export interface BidSelect {
  value: any;
  color?: string;
  id?: string | number;
}

export interface CarouselProps extends BridgeProps {
  setErrorStatement: React.Dispatch<React.SetStateAction<any>>;
}
