import React from "react";
import { BridgeProps, Card, Player, PlayerCard, Suit, Trick } from "@interface";
import style from "../styles/logic.module.css";
import {
  BsFillSuitHeartFill,
  BsFillSuitDiamondFill,
  BsFillSuitSpadeFill,
  BsFillSuitClubFill,
} from "react-icons/bs";
import { AiOutlineStop } from "react-icons/ai";
import { IconManifest } from "react-icons/lib/esm/iconsManifest";

function getSuitSymbol(suit: Suit = "NT") {
  const symbolList = {
    H: <BsFillSuitHeartFill />,
    D: <BsFillSuitDiamondFill />,
    C: <BsFillSuitClubFill />,
    S: <BsFillSuitSpadeFill />,
    NT: <AiOutlineStop />,
  };

  return symbolList[suit];
}
console.log("getSuitSymbol ", getSuitSymbol("H"));

const Logic = (props: BridgeProps) => {
  const { G, ctx, plugins, matchData } = props;

  return (
    <>
      <div className={style.logic_container_text}>
        <p>Contract double: {G.contract?.double}</p>
        <p>Contract redouble: {G.contract?.redouble}</p>
      </div>
      {G.contract?.suit && (
        <>
          <h2>Current Contract:</h2>
          <h2
            className={style.logic_contract_suit}
            style={{
              color:
                G.contract?.suit === "H" || G.contract?.suit === "D"
                  ? "var(--red)"
                  : "black",
            }}
          >
            {G.contract?.level} {getSuitSymbol(G.contract.suit)}
          </h2>
        </>
      )}
      <div className={style.logic_cards_ul}>
        <h1>Played Cards</h1>
        <ul>
          {G.table.length > 0 &&
            G.table.map((pCard: PlayerCard, index) => {
              const { card } = pCard;
              return (
                <li key={index}>
                  <img width="50px" src={card.image}></img>
                </li>
              );
            })}
        </ul>
        <h1>Finished tricks</h1>
        <ul>
          {G.tricks.length > 0 &&
            G.tricks.map((trick: Trick, index: number) => {
              const { cards } = trick;
              console.log("cards :>> ", cards);
              return (
                <li key={index}>
                  <img src={cards[0].card.image}></img>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default Logic;
