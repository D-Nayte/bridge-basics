import { BridgeProps, Card, Player } from "@interface";
import React from "react";
import bidStyle from "../style/bidPhase.module.css";
import BidButtons2 from "./BidButtons2";
import BidSelection from "./BidSelection";
import { suitOrder } from "@shared/lib/deck";
import ErrorMessage from "./ErrorMessage";
import ScrollWheel from "./ScrollWheel";
import BidCarousel from "./BidCarousel";

interface GamePhaseProps extends BridgeProps {
  player: Player | null;
}

const GamePhase = (props: GamePhaseProps) => {
  const { G, moves, player, playerID, ctx } = props;
  const handlePlayCard = (card: Card) => {
    moves.playCard(card);
  };

  //logic for sorting the cards in the hand of each player

  const sortCards = (cards: Card[]) => {
    const unSortedCards = [...cards];
    const sortByRank = unSortedCards.sort((aCard, bCard) => {
      return aCard.rank - bCard.rank;
    });
    const sortByColor = sortByRank.sort((aCard, bCard) => {
      const aSuit = suitOrder.indexOf(aCard.suit);
      const bSuit = suitOrder.indexOf(bCard.suit);
      return aSuit - bSuit;
    });
    return sortByColor;
  };

  return (
    <div
      className={bidStyle.wrapper}
      /*style={{
        border: ctx.currentPlayer === playerID ? "5px solid white" : "none",
      }}*/
    >
      <ErrorMessage message={"you can't do this shit"} />
      <h1 className={bidStyle.temp_text}>{player?.name}</h1>

      {player && (
        <ul className={bidStyle.gamephase_cards}>
          {sortCards(player.hand).map((card, index) => (
            <li key={index} onClick={() => handlePlayCard(card)}>
              <img src={card.image}></img>
            </li>
          ))}
        </ul>
      )}
      {ctx.phase === "bid" && (
        <>
          <BidCarousel />
          <ul className={bidStyle.buttons_wrapper}>
            <BidButtons2 moves={moves} />
          </ul>
          {/*<>
          <div className={bidStyle.bidselection_wrapper}>
            <BidSelection {...props} />
          </div>
          <ul className={bidStyle.buttons_wrapper}>
            <BidButtons moves={moves} />
          </ul>
      </>*/}
        </>
      )}
    </div>
  );
};

export default GamePhase;
