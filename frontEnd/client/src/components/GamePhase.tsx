import React, { useState, Dispatch } from "react";
import { BidSelect, BridgeProps, Card, Player } from "@interface";
import bidStyle from "../style/bidPhase.module.css";
import BidButtons2 from "./BidButtons2";
import { suitOrder } from "@shared/lib/deck";
import ErrorMessage from "./ErrorMessage";
import BidCarousel from "./BidCarousel";
import EdgeLighter from "./EdgeLighter";

interface GamePhaseProps extends BridgeProps {
  player: Player | null;
}
interface PrintedValues
  extends Dispatch<
    React.SetStateAction<{
      bidAmount: null | number;
      bidSuit: null | string;
    }>
  > {}

const GamePhase = (props: GamePhaseProps) => {
  const [selectedBid, setSelectedBid] = useState<{
    bidAmount: BidSelect | null;
    bidSuit: BidSelect | null;
  }>({
    bidAmount: null,
    bidSuit: null,
  });
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
    <div className={bidStyle.wrapper}>
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
          <BidCarousel setSelectedBid={setSelectedBid} {...props} />
          <ul className={bidStyle.buttons_wrapper}>
            <BidButtons2 selectedBid={selectedBid} {...props} />
          </ul>
        </>
      )}
      {ctx.currentPlayer === playerID && <EdgeLighter />}
    </div>
  );
};

export default GamePhase;
