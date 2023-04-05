export const getTeammateIndexString = (index: string) => {
  const currIndex = parseInt(index);
  return (currIndex < 2 ? currIndex + 2 : currIndex + 2 - 4).toString();
};

export const getTeam = (playerID: string) => {
  const nextOpponent =
    playerID === "3" ? "" : (parseInt(playerID) + 1).toString();
  const opponentTeamMate = getTeammateIndexString(nextOpponent);

  return [nextOpponent, opponentTeamMate];
};
