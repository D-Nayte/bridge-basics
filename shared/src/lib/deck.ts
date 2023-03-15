import { Card } from "../interface/index";

export const suitOrder: string[] = ["C", "D", "H", "S", "NT"];

const createCard = (suit: string, rank: string) => {
  return {
    name: rank + suit,
    suit,
    rank: parseInt(rank),
    image: `./cards/${rank}${suit}.png`,
  };
};

const createDeck: () => Card[] = () => {
  const suits = ["C", "D", "H", "S"];
  const ranks = [...Array(14 - 2 + 1)]
    .map((_, index) => (2 + index).toString())
    .reverse();

  const newDeck: Card[] = suits.reduce<Card[]>((acc, suit) => {
    return acc.concat(ranks.map((rank: string) => createCard(suit, rank)));
  }, []);
  return newDeck;
};

export const deckPoints = {
  C: 20, //treff
  D: 20, //Karo/Diamond
  H: 30, //Heart/Coeur
  S: 30, //Pid/Spead
  NT: 40,
};

export default createDeck;
