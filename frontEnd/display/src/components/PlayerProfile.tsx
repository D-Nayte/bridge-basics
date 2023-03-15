import React from "react";
import {
  BridgeProps,
  BridgeState,
  Card,
  Player,
  PlayerCard,
  Trick,
} from "@interface";
import style from "../styles/playerprofile.module.css";

interface PlayerProfile extends BridgeProps {
  player: Player;
}

const PlayerProfile = (props: PlayerProfile) => {
  const { player, ctx, matchData, G, playerID } = props;

  const chechIfInDanger = (G: BridgeState, player: Player) => {
    if (!player?.id && typeof player?.id !== "number")
      return console.error("Failed to get danger state, no player id ");
    const playerID = player.id;

    const { index, order } = G.vulnerabilitySetup;
    return order[index].some((number) => number === playerID);
  };

  const danger = chechIfInDanger(G, player);
  const isDisconnected: boolean = matchData
    ? !matchData[player.id].isConnected
    : true;

  const currentPlayerTurn: boolean =
    ctx.currentPlayer === player.id.toString() &&
    ctx.phase !== "create" &&
    ctx.phase !== "build";
  return (
    <>
      <li
        className={
          danger
            ? `${style.playerprofile_container} ${style.danger}`
            : `${style.playerprofile_container}`
        }>
        <img
          src={player.data?.imageURL}
          className={currentPlayerTurn ? style.playerprofile_active : undefined}
          alt=""
        />
        <h2>{player.name}</h2>
        <div className={style.playerprofile_text}>
          <p> Player ID: {player.id}</p>
          <p>SCORE: {player.scores}</p>
          <p>PHASE: {ctx.phase}</p>
        </div>
        {isDisconnected && <p>DISCONNECTED</p>}
      </li>
    </>
  );
};

export default PlayerProfile;
