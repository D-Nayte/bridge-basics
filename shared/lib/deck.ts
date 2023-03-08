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
  const ranks = [...Array(14 - 2 + 1)].map((_, index) => (2 + index).toString()).reverse();

  const newDeck = suits.reduce((acc, suit) => {
    return acc.concat(ranks.map((rank) => createCard(suit, rank)));
  }, []);
  return newDeck;
};

export default createDeck;
