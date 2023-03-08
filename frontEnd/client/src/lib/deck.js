const createCard = (suit, rank) => {
  return {
    name: rank + suit,
    suit,
    rank: parseInt(rank),
    image: `./cards/${rank}${suit}.png`,
  };
};

const createDeck = () => {
  const suits = ["C", "D", "H", "S"];
  const ranks = [
    "14",
    "13",
    "12",
    "11",
    "10",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ];

  const newDeck = suits.reduce((acc, suit) => {
    return acc.concat(ranks.map((rank) => createCard(suit, rank)));
  }, []);
  return newDeck;
};

export default createDeck;
