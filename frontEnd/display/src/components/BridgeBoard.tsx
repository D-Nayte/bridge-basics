import React from "react";
import { BridgeProps, Card, Player, PlayerCard, Trick } from "@interface";
import PlayerProfile from "./PlayerProfile";
import Link from "next/link";
import Qrcode from "./Qrcode";
import style from "../styles/bridgeboard.module.css";

interface BridgeBoard extends BridgeProps {
  matchURL: string;
}

const BridgeBoard = (props: BridgeBoard) => {
  const { G, ctx, plugins, matchData, matchURL } = props;
  console.log("props :>> ", props);
  return (
    <div>
      {matchURL !== "" && ctx.phase === "create" && (
        <>
          <h1>LOBBY</h1>
          <Link href={`${matchURL}`} target="_blank">
            <Qrcode matchURL={matchURL} />
          </Link>
        </>
      )}

      <>
        <h1>BridgeBoard -- PHASE: {ctx.phase.toUpperCase()}</h1>
        <div className={style.bridgeboard_container}>
          <ul className={style.players_container_ul}>
            {G.players &&
              G.players.map(
                (player: Player) =>
                  player && <PlayerProfile {...props} player={player} />
              )}
          </ul>

          <div className={style.bridgeboard_logic}>
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
                      <img width="50px" src={cards[0].card.image}></img>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </>
    </div>
  );
};

export default BridgeBoard;
