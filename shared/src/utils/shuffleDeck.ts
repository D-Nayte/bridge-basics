export const dealCards = (deck) => {
  const randomcards = [];

  for (let index = 0; index < 13; index++) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    randomcards.push(deck.splice(randomIndex, 1)[0]);
  }

  return randomcards;
};
