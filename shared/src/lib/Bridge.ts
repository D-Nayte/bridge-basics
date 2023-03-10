// import type { Game, Move } from "boardgame.io";
import { dealCards } from "../utils/shuffleDeck";
import {
  ActivePlayers,
  INVALID_MOVE,
  TurnOrder,
} from "../../node_modules/boardgame.io/core";
import createDeck from "./deck";

const dealToPlayer = (G) => {
  const deck = G.deck;
  G.players = G.players.map((player) => {
    player.hand = dealCards(deck);
    return player;
  });
  G.dealt = true;
};

const players = [
  {
    name: "Andy",
    hand: [],
    passed: false,
    bid: {
      suit: null,
      level: null,
      double: null,
      redouble: null,
    },
  },
  {
    name: "Rene",
    hand: [],
    passed: false,
    bid: {
      suit: null,
      level: null,
      double: null,
      redouble: null,
    },
  },
  {
    name: "Holger",
    hand: [],
    passed: false,
    bid: {
      suit: null,
      level: null,
      double: null,
      redouble: null,
    },
  },
  {
    name: "Danni",
    hand: [],
    passed: false,
    bid: {
      suit: null,
      level: null,
      double: null,
      redouble: null,
    },
  },
];

const bid = ({ G, ctx }, { bidLevel, bidSuit }) => {
  const playerIndex = parseInt(ctx.currentPlayer);
  const player = G.players[playerIndex];

  const prevBid = G.madeBids.find(
    (bid) =>
      (bid.bidLevel === bidLevel && bid.bidSuit === bidSuit) ||
      (bid.bidsuit === bidSuit && bid.bidLevel >= bidLevel)
  );
  if (prevBid) return INVALID_MOVE;

  player.bid.level = bidLevel;
  player.bid.suit = bidSuit;
  player.passed = false;

  if (player.bid.suit !== bidSuit)
    (player.bid.double = false), (player.bid.redouble = false);

  G.madeBids.push({ bidLevel, bidSuit });
};

const playerpassed = ({ G, ctx, events }) => {
  events.endTurn({ next: "3" });
  G.players[parseInt(ctx.currentPlayer)].passed = true;
};

const checkIfPlayerHadPassed = ({ G, ctx, events }) => {
  if (G.players[parseInt(ctx.currentPlayer)].passed)
    events.endTurn({
      next: (ctx.playOrderPos + 1).toString(),
    });
};

const playCard = () => {
  console.log("play round");
};

const double = ({ G, ctx }) => {
  const currPlayerIndex = parseInt(ctx.currentPlayer);
  G.players[currPlayerIndex].passed = true;

  let previousPlayerIndex = currPlayerIndex - 1;
  if (previousPlayerIndex < 0) previousPlayerIndex = G.players.length - 1;

  const previousPlayer = G.players[previousPlayerIndex];

  if (previousPlayer.bid.suit && previousPlayer.bid.level) {
    previousPlayer.bid.double = true;
    return;
  }
  return INVALID_MOVE;
};

const reDouble = ({ G, ctx }) => {
  const currPlayerIndex = parseInt(ctx.currentPlayer);
  //redouble themself... needed?????
  // const currentPlayer = G.players[currPlayerIndex];
  // if (currentPlayer.bid.double) {
  //   return (currentPlayer.bid.redouble = true);
  // }
  G.players[currPlayerIndex].passed = true;

  let partnerIndex = currPlayerIndex - 2;
  if (partnerIndex < 0) partnerIndex = G.players.length - 2;

  const partner = G.players[partnerIndex];
  if (partner.bid.double) {
    partner.bid.redouble = true;
    return;
  }
  return INVALID_MOVE;
};

const addToG = ({ G, ctx }, player) => {
  console.log("player :>> ", player);
  if (G.players.find((currPlayer) => currPlayer.id === parseInt(player.id)))
    return INVALID_MOVE;
  G.players.push(player);
};

export const Bridge = {
  name: "bridge",
  setup: ({ ctx }) => {
    return {
      deck: createDeck(),
      tricks: [],
      madeBids: [],
      trickIndex: -1,
      contract: null,
      players: [],
    };
  },

  turn: {
    order: TurnOrder.CUSTOM(["0", "1", "2", "3"]),
  },

  phases: {
    create: {
      turn: {
        activePlayers: ActivePlayers.ALL,
      },
      moves: { addToG },
      start: true,
      endIf: ({ G }) => {
        return G.players.length >= 4;
      },
      next: "build",
    },

    build: {
      onBegin: ({ G, ctx }) => {
        dealToPlayer(G);
      },
      endIf: ({ G }) => {
        return G.deck.length < 1;
      },
      next: "bid",
    },
    bid: {
      moves: { bid, playerpassed, double, reDouble },
      endIf: ({ G }) => G.contract !== null, // end turn after contract was build
      next: "play",
      turn: {
        onBegin: ({ G, ctx, events }) => {
          checkIfPlayerHadPassed({ G, ctx, events });
        },
        maxMoves: 1,
        onEnd: ({ G, ctx }) => {
          // if 3 players pass, setup the contract
          let passedPlayers = 0;
          G.players.forEach((player) => {
            if (player.passed) passedPlayers++;
          });
          if (passedPlayers === 3) {
            const wonPlayer = G.players.find((player) => !player.passed);
            G.contract = wonPlayer.bid;
          }
        },
      },
    },
    play: {
      moves: {
        playCard,
      },
    },
  },
};
