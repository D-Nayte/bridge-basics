// import type { Game, Move } from "boardgame.io";
import { dealCards } from "../utils/shuffleDeck";
import {
  ActivePlayers,
  INVALID_MOVE,
  TurnOrder,
} from "../../../node_modules/boardgame.io/core";
import createDeck, { suitOrder } from "./deck";
import {
  Bid,
  BridgeParams,
  BridgeState,
  Card,
  Contract,
  DeckPoints,
  Player,
  PlayerCard,
  Suit,
  Trick,
  Vulnerability,
} from "../interface/index";
import type { Game, Move, Ctx, FnContext } from "boardgame.io";

const dealToPlayer = ({ G }: { G: BridgeState }) => {
  const deck: Card[] = G.deck;
  G.players = G.players.map((player: Player) => {
    if (player) {
      player.hand = dealCards(deck);
      return player;
    }
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

const bid: Move<BridgeState> = (
  { G, ctx },
  { bidLevel, bidSuit }: { bidLevel: string; bidSuit: Suit }
) => {
  const playerIndex = parseInt(ctx.currentPlayer);
  const player = G.players[playerIndex];

  if (G.highestBid) {
    const { level, suit } = G.highestBid;
    const currLevel: number = parseInt(bidLevel);
    const currSuitLevel: number = suitOrder.indexOf(bidSuit);
    const highestSuitLevel: number = suitOrder.indexOf(suit);

    if (
      currLevel < parseInt(level) ||
      (currLevel === parseInt(level) && currSuitLevel <= highestSuitLevel)
    )
      return INVALID_MOVE;
  }

  player.bid = { level: bidLevel, suit: bidSuit };
  player.passed = false;

  if (player.bid.suit !== bidSuit)
    (player.bid.double = false), (player.bid.redouble = false);

  G.highestBid = { level: bidLevel, suit: bidSuit };
};

const playerpassed: Move<BridgeState> = ({ G, playerID }) => {
  const playerIndex = parseInt(playerID);
  // events.endTurn && events.endTurn({ next: playerIndex+1 });

  G.players[playerIndex].passed = true;
};

const checkIfPlayerHadPassed = ({ G, ctx, events }: BridgeParams) => {
  if (G.players[parseInt(ctx.currentPlayer)]?.passed)
    events.endTurn &&
      events.endTurn({
        next: (ctx.playOrderPos + 1).toString(),
      });
};

const playCard: Move<BridgeState> = ({ G, ctx, events }, card: Card) => {
  const playerID = ctx.currentPlayer;
  const player = G.players[parseInt(playerID)];
  let serveColor: Card | null | undefined = null;

  //check if some cards was already played
  if (G.table.length > 0)
    serveColor = checkHandforSameColor({ player, tableCard: G.table[0] });

  // if cards was played and you are able to server color, alert if suits not match
  if (serveColor && card.suit !== serveColor.suit) return INVALID_MOVE;

  const cardIndex = player.hand.findIndex(
    (currCard) => currCard.name === card.name
  );
  const [choosedCard] = player.hand.splice(cardIndex, 1);
  G.table.push({ card: choosedCard, playerID });
  events.endTurn && events.endTurn();
};

const checkHandforSameColor = ({
  player,
  tableCard,
}: {
  player: Player;
  tableCard: PlayerCard;
}) => {
  const { suit } = tableCard.card;
  return player.hand.find((card) => card.suit === suit);
};

const double: Move<BridgeState> = ({ G, ctx }) => {
  const currPlayerIndex = parseInt(ctx.currentPlayer);
  G.players[currPlayerIndex].passed = true;

  let previousPlayerIndex = currPlayerIndex - 1;
  if (previousPlayerIndex < 0) previousPlayerIndex = G.players.length - 1;

  const previousPlayer = G.players[previousPlayerIndex];

  if (previousPlayer.bid?.suit && previousPlayer.bid.level) {
    previousPlayer.bid.double = true;
    return;
  }
  return INVALID_MOVE;
};

const reDouble: Move<BridgeState> = ({ G, ctx }) => {
  const currPlayerIndex = parseInt(ctx.currentPlayer);
  G.players[currPlayerIndex].passed = true;

  let partnerIndex = currPlayerIndex - 2;
  if (partnerIndex < 0) partnerIndex = G.players.length - 2;

  const partner = G.players[partnerIndex];
  if (partner.bid?.double) {
    partner.bid.redouble = true;
    return;
  }
  return INVALID_MOVE;
};

const addToG: Move<BridgeState> = ({ G, ctx }, player) => {
  // add player only one because of "useEffect" running twice
  if (G.players.find((currPlayer) => currPlayer.id === player.id))
    return INVALID_MOVE;

  G.players.push({
    ...player,
    hand: [],
    scores: 0,
    passed: false,
    bid: {
      suit: null,
      level: null,
      double: null,
      redouble: null,
    },
  });
};

const _setupTurnOrder = ({ G }: { G: BridgeState }) => {
  //start with next player wich comes after contract winner
  if (!G.contract?.playerID)
    return console.error("Failed to find start player in G.{contract}");

  let startIndex = parseInt(G.contract?.playerID) + 1;
  G.turnOrder = [];
  while (G.turnOrder.length < 4) {
    if (startIndex >= G.players.length) startIndex = 0;
    G.turnOrder.push(startIndex.toString());
    startIndex++;
  }
};

const finishGame: Move<BridgeState> = ({ G, ctx }) => {
  while (G.players[3].hand.length > 0) {
    const cards: PlayerCard[] = [];
    for (let cardIndex = 0; cardIndex < 4; cardIndex++) {
      const [card] = G.players[cardIndex].hand.splice(0, 1);
      cards.push({ card, playerID: cardIndex.toString() });
    }

    G.tricks.push({ cards, playerID: "0" });
  }
};

const startNewRound: Move<BridgeState> = ({ G, events }) => {
  G.tricks = [];
  G.deck = createDeck();
  G.highestBid = null;
  G.contract = null;
  G.dealt = false;
  G.table = [];
  G.vulnerabilitySetup.index =
    G.vulnerabilitySetup.index >= 3
      ? (G.vulnerabilitySetup.index = 0)
      : (G.vulnerabilitySetup.index = G.vulnerabilitySetup.index + 1);

  G.players = G.players.map((player: Player): Player => {
    return { ...player, hand: [], passed: false, bid: null };
  });
  events.setPhase("build");
};

export const Bridge: Game<BridgeState> = {
  name: "bridge",
  setup: ({ ctx }) => {
    return {
      deck: createDeck(),
      tricks: [],
      highestBid: null,
      trickIndex: -1,
      contract: null,
      players: [],
      dealt: false,
      turnOrder: ["0", "1", "2", "3"],
      vulnerabilitySetup: {
        index: 0,
        order: [[], [0, 2], [1, 3], [0, 1, 2, 3]], // none, N/S, E/W, all
      },
      table: [],
    };
  },

  phases: {
    create: {
      turn: {
        order: TurnOrder.CUSTOM_FROM("turnOrder"),
        activePlayers: ActivePlayers.ALL,
      },
      moves: { addToG },
      start: true,
      endIf: ({ G }) => G.players.length >= 4,
      next: "build",
    },

    build: {
      onBegin: ({ G, ctx }) => {
        G.players = G.players.sort(
          (aPlayer, bPlayer) => aPlayer.id - bPlayer.id
        );
        dealToPlayer({ G });
      },

      endIf: ({ G }) => {
        return G.deck.length < 1 && G.dealt;
      },
      next: "bid",
    },

    bid: {
      moves: { bid, playerpassed, double, reDouble },
      endIf: ({ G }) => G.contract !== null, // end Phase after contract was build
      next: "play",
      onEnd: ({ G, ctx }) => {
        _setupTurnOrder({ G });
      },
      turn: {
        maxMoves: 1,
        order: TurnOrder.CUSTOM_FROM("turnOrder"),
        onBegin: checkIfPlayerHadPassed,
        onEnd: ({ G, ctx }) => {
          // if 3 players pass, setup the contract
          let passedPlayers = 0;
          G.players.forEach((player) => {
            if (player.passed) passedPlayers++;
          });
          if (passedPlayers === 3) {
            const wonPlayer: Player | undefined = G.players.find(
              (player: Player) => !player.passed
            );
            // setup contrat and use wonplayerID as strart index for turn order for the actuall game
            wonPlayer?.bid
              ? (G.contract = {
                  ...wonPlayer.bid,
                  playerID: wonPlayer.id.toString(),
                })
              : console.error("Error finding the won player in play/onEnd");
          }
        },
      },
    },

    play: {
      moves: {
        playCard,
        finishGame,
      },
      endIf: ({ G, ctx }) => G.tricks.length === 13,
      next: "calcScores",
      turn: {
        maxMoves: 1,
        order: TurnOrder.CUSTOM_FROM("turnOrder"),
        onBegin: ({ G, ctx, events }) => {
          // start the very first turn with the player next to bid winner
          if (ctx.turn === 1 && G.contract?.playerID) {
            const bidWinner: number = parseInt(G.contract.playerID);
            const startingPlayer: string = (bidWinner + 1).toString();
            events.endTurn({ next: startingPlayer || "0" });
            return;
          }
          if (G.table.length >= 4) {
            const firstSuit = G.table[0].card.suit;
            const trumpSuit = G.contract?.suit;

            // sort reverse the actual table and find the winner on the first index after sorting
            const sortet: PlayerCard[] = G.table
              .filter((pCard: PlayerCard) => {
                const { card } = pCard;
                return card.suit === firstSuit;
              })
              .sort(
                (aCard: PlayerCard, bCard: PlayerCard) =>
                  bCard.card.rank - aCard.card.rank
              );
            const sortetTrump: PlayerCard[] = G.table
              .filter((pCard: PlayerCard) => {
                const { card } = pCard;
                return card.suit === trumpSuit;
              })
              .sort(
                (aCard: PlayerCard, bCard: PlayerCard) =>
                  bCard.card.rank - aCard.card.rank
              );
            let { playerID } = sortet[0];

            if (sortetTrump.length > 0) {
              // if player played trump suit, will egt that player the trick
              playerID = sortetTrump[0].playerID;
            }
            //change turnorder in order to have the last trick winner be te next first player

            G.tricks.push({ cards: [...G.table.splice(0)], playerID });
            events.endTurn &&
              events.endTurn({
                next: playerID,
              });
          }
        },
      },
    },

    calcScores: {
      turn: { order: TurnOrder.CUSTOM_FROM("turnOrder") },
      onBegin: ({ G, ctx }) => {
        if (!G.contract)
          return console.error("Failed calculate Scores, no contract!");
        const { level, double, redouble, suit, playerID } = G.contract;
        if (!level || !suit || !playerID)
          return console.error(
            "Failed calculate Scores, values on contract missing!"
          );
        const deckPoints: DeckPoints = {
          C: 20, //treff
          D: 20, //Karo/Diamond
          H: 30, //Heart/Coeur
          S: 30, //Pid/Spead
          NT: 40,
        };

        const vulnerability: Vulnerability = {
          none: [],
          "N/S": [0, 2],
          "O/W": [1, 3],
          all: [0, 1, 2, 3],
        };

        const getBonus = (
          { level, suit, playerID }: Contract,
          G: BridgeState
        ): number => {
          if (!level || !suit) {
            console.error("error getting Bonus!");
            return 50;
          }

          // checks wich team is in danger, based on vulnerabilitySetup index and order
          const { vulnerabilitySetup } = G;
          const { index, order } = vulnerabilitySetup;
          const isVulnerable: boolean = order[index].some(
            (number) => number === parseInt(playerID)
          );

          let bonusKey: string | null = null;
          let scores = 0;

          const bidTricks: number = parseInt(level);
          if (bidTricks === 7) bonusKey = "bigSlam";
          if (bidTricks === 6) bonusKey = "smallSlam";

          switch (bonusKey) {
            case "bigSlam":
              scores = isVulnerable ? 1500 : 1000;
              break;
            case "smallSlam":
              scores = isVulnerable ? 750 : 500;
              break;
          }

          scores +=
            // add points for fullgame or partGame, based on the initial bid. Calculated from bid level times color value
            bidTricks * deckPoints[suit] >= 100
              ? isVulnerable
                ? 500
                : 300
              : 50;

          return scores;
        };

        // level is amount of promised tricks, suit is color
        const teamMateID = (parseInt(playerID) + 2).toString();

        let scores: any;
        let tricksCount: number = 0;

        G.tricks.forEach((trick: Trick) => {
          if (trick.playerID === playerID) tricksCount++;
        });

        let trickPoints: number | false =
          tricksCount >= parseInt(level)
            ? (tricksCount - 6) * deckPoints[suit]
            : false;

        const bonus: number = getBonus({ level, suit, playerID }, G);
        if (!trickPoints) {
          //TODO! calc if loosing the game after tricksCount is false
          return;
        }

        if (suit === "NT") {
          const MAX_TRICKS = 6;
          const REDUC_NT_POINTS = 30;
          const NT_SECIAL_POINTS = 10;
          const totaltrickToCalc = tricksCount - MAX_TRICKS;
          trickPoints = totaltrickToCalc * REDUC_NT_POINTS + NT_SECIAL_POINTS;
        }

        scores = trickPoints + bonus;
        const player = G.players[parseInt(playerID)];
        player.scores += scores;
      },
      moves: { startNewRound },
    },
  },
};

// 6 NT

// 13

// 1 x 40 + 5 x 30 = 190 (> 100 => Vollspiel)

// 1 x 40 + 6 x 30 = 220

// 300 + 500 (Vollspielprämie + Kleinschlemmprämie)

// 1020
