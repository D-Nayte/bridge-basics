import { BridgeState, Contract } from "../interface/index";
import { deckPoints } from "../lib/deck";

export const getIsVulnerable = (G: BridgeState) => {
  if (!G.contract) return false;
  const { vulnerabilitySetup, contract } = G;
  const { playerID } = contract;
  const { index, order } = vulnerabilitySetup;
  return order[index].some((number) => number === parseInt(playerID));
};

export const getOpponentPoints = (
  tricks: number,
  level: number,
  doubleType: string | null,
  danger: boolean
) => {
  const reDouble = doubleType === "redouble";
  const double = doubleType === "double";
  const overFallBonus = double ? 300 : 600;
  const basePoints = reDouble ? 200 : double ? 100 : 50;
  const points = danger ? basePoints * 2 : basePoints;
  const touchable = level + 6;
  const notToucable = 13 - touchable;

  const maxUseableTricks = tricks - notToucable;

  const result = {
    double: {
      1: !danger ? 100 : 200,
      2: !danger ? 300 : 500,
      3: !danger ? 500 : 800,
    },
    redouble: {
      1: !danger ? 200 : 400,
      2: !danger ? 600 : 1000,
      3: !danger ? 1000 : 1600,
    },
  };

  if (!double && !reDouble) return maxUseableTricks * points;

  //@ts-ignore
  if (maxUseableTricks <= 3) return result[doubleType][maxUseableTricks];

  if (maxUseableTricks > 3)
    return result[doubleType][3] + overFallBonus * (maxUseableTricks - 3);
  return null;
};

export const getBonus = (
  { level, suit, playerID }: Contract,
  G: BridgeState
): number => {
  if (!level || !suit || !G.contract) {
    console.error("error getting Bonus!");
    return 50;
  }
  const { contract } = G;

  // checks wich team is in danger, based on vulnerabilitySetup index and order

  const { getBonuses } = contract;
  let bonusKey: string | null = null;
  let scores = 0;
  const bidTricks: number = parseInt(level);
  const isVulnerable: boolean = getIsVulnerable(G);

  isVulnerable && getBonuses.push("danger");

  if (bidTricks === 7) (bonusKey = "grand slam"), getBonuses.push("grand slam");
  if (bidTricks === 6) (bonusKey = "small slam"), getBonuses.push("small slam");

  switch (bonusKey) {
    case "grand slam":
      scores = isVulnerable ? 1500 : 1000;
      break;
    case "small slam":
      scores = isVulnerable ? 750 : 500;
      break;
  }

  // add points for fullgame or partGame, based on the initial bid. Calculated from bid level times color value
  bidTricks * deckPoints[suit] >= 100
    ? isVulnerable
      ? ((scores += 500), getBonuses.push("game"))
      : ((scores += 300), getBonuses.push("game"))
    : ((scores += 50), getBonuses.push("partial"));

  return scores;
};
