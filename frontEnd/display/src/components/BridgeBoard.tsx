import React from "react";
import { BridgeProps, Card, Player, PlayerCard, Trick } from "@interface";
import PlayerProfile from "./PlayerProfile";
import Link from "next/link";
import Qrcode from "./Qrcode";
import style from "../styles/bridgeboard.module.css";
import Logic from "./Logic";

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
        <div className={style.bridgeboard_container}>
          <h1 style={{ position: "absolute" }}>
            BridgeBoard -- PHASE: {ctx.phase.toUpperCase()}
          </h1>
          <ul>
            {G.players &&
              G.players.map(
                (player: Player) =>
                  player && <PlayerProfile {...props} player={player} />
              )}
          </ul>

          <div className={style.bridgeboard_logic}>
            <Logic {...props} />
          </div>
        </div>
      </>
    </div>
  );
};

export default BridgeBoard;
