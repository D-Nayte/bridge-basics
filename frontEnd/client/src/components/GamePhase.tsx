import { BridgeProps, Card, Player } from "@interface";
import React from "react";
import bidStyle from "../style/bidPhase.module.css";
import BidButtons from "./BidButtons";
import BidSelection from "./BidSelection";

interface GamePhaseProps extends BridgeProps {
  player: Player | null;
}

const GamePhase = ({ moves, player, playerID, ctx }: GamePhaseProps) => {
  console.log("player :>> ", player);

  const handlePlayCard = (card: Card) => {
    moves.playCard(card);
  };

  return (
    <div className={bidStyle.wrapper}>
      <h1 className={bidStyle.temp_text}>{player?.name}</h1>
      {player && (
        <ul className={bidStyle.gamephase_cards}>
          {player.hand.map((card, index) => (
            <li key={index} onClick={() => handlePlayCard(card)}>
              <img src={card.image}></img>
            </li>
          ))}
        </ul>
      )}
      {ctx.phase === "bid" && (
        <div>
          <BidSelection moves={moves} playerID={playerID} />

          <ul className={bidStyle.buttons_wrapper}>
            <BidButtons moves={moves} />
          </ul>
        </div>
      )}
    </div>
  );
};

export default GamePhase;
