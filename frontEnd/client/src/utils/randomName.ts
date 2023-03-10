const names = ["Andy", "Danni", "David", "Rene", "Holscher"];

export const starterName: () => string = () => {
  const randomIndex = Math.floor(Math.random() * names.length);
  console.log("randomIndex :>> ", randomIndex);
  return names[randomIndex];
};
