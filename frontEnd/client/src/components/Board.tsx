import { BridgeProps, Card, Player } from "@/../../shared/src/interface";
import { useEffect } from "react";
import GamePhase from "./GamePhase";

const BridgeBoard = (props: BridgeProps) => {
  const { G, ctx, moves, playerID, matchData, events } = props;
  const player: Player | null = playerID ? G.players[parseInt(playerID)] : null;
  const phases: string = ctx.phase;
  console.log("props :>> ", props);

  useEffect(() => {
    if (matchData && playerID) moves.addToG(matchData[parseInt(playerID)]);
  }, []);

  //like Lobby, before entering the real game
  if (phases === "create") return <h1>Waiting for all players to Join...</h1>;

  return (
    <main>
      <GamePhase {...props} player={player}></GamePhase>;
      <button
        style={{
          position: "absolute",
          top: "0px",
          right: "0px",
          padding: ".5rem",
        }}
        onClick={() => moves.finishGame()}>
        Finish play Phase
      </button>
      <button
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          padding: ".5rem",
        }}
        onClick={() => moves.startNewRound()}>
        start new Round
      </button>
    </main>
  );
};

export default BridgeBoard;
