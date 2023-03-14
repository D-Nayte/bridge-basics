import React from "react";
import { BridgeProps, Card, PlayerCard, Trick } from "@interface";
import Qrcode from "./Qrcode";
import Link from "next/link";

interface BridgeBoardProps extends BridgeProps {
  matchID: string;
  matchURL: string;
}

const BridgeBoard = (props: BridgeBoardProps) => {
  const { G, ctx, plugins, matchData, matchURL } = props;
  console.log("props :>> ", props);
  return (
    <div>
      <h1>BridgeBoard</h1>
      <Link href={matchURL} target="_blank">
        <Qrcode matchURL={matchURL} />
      </Link>
      <ul style={{ display: "flex" }}>
        {G.players &&
          G.players.map(
            (player) =>
              player && (
                <li>
                  <h2>NAME: {player.name}</h2>
                  <p>PlayerID : {player.id}</p>
                  <img src={player.data?.imageURL} width="50px" alt="" />
                </li>
              )
          )}
      </ul>
      <p>Contract double: {G.contract?.double}</p>
      <p>Contract redouble: {G.contract?.redouble}</p>
      <p>Contract level: {G.contract?.level}</p>
      <p>Contract suit: {G.contract?.suit}</p>

      <h1>Played Cards</h1>
      <ul>
        {G.table.length > 0 &&
          G.table.map((pCard: PlayerCard, index) => {
            const { card } = pCard;
            return (
              <li key={index} style={{ border: "2px solid black" }}>
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
              <li key={index} style={{ border: "2px solid black" }}>
                <img width="50px" src={cards[0].card.image}></img>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default BridgeBoard;
