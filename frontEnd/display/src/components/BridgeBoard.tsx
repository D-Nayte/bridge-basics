import React from "react";
import { BridgeProps, Card, Player, PlayerCard, Trick } from "@interface";
import Qrcode from "./Qrcode";
import Link from "next/link";
import PlayerProfile from "./PlayerProfile";
import style from "../styles/bridgeboard.module.css";
import Logic from "./Logic";

interface BridgeBoardProps extends BridgeProps {
  matchID: string;
  matchURL: string;
}

const BridgeBoard = (props: BridgeBoardProps) => {
  const { G, ctx, plugins, matchData, matchURL } = props;

  return (
    <div>
      {matchURL !== "" && ctx.phase === "create" && (
        <>
          <h1>LOBBY</h1>
          <Link
            href={`${matchURL}`}
            target="_blank"
            style={{ padding: "10rem" }}
          >
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
