import React from "react";
import { BridgeProps, Card, Player, PlayerCard, Trick } from "@interface";
import style from "../styles/logic.module.css";

const Logic = (props: BridgeProps) => {
  const { G, ctx, plugins, matchData } = props;

  return (
    <>
      <div className={style.logic_container_text}>
        <p>Contract double: {G.contract?.double}</p>
        <p>Contract redouble: {G.contract?.redouble}</p>
        <p>Contract level: {G.contract?.level}</p>
        <p>Contract suit: {G.contract?.suit}</p>
      </div>
      <p></p>
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
