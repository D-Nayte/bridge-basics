// import type { MyGameState } from "lib/Bridge";
// import type { BoardProps } from "boardgame.io/react";
import { shuffleAPIDeck, shuffleDeck } from "@/utils/shuffleDeck";
import React, {
  BaseSyntheticEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import createDeck from "../lib/deck";

// interface MyGameProps extends BoardProps<MyGameState> {
//   // Additional custom properties for your component
// }

const BridgeBoard = (props) => {
  const { G, ctx, moves, playerID, matchData } = props;

  const handleBid = (e, playerId) => {
    e.preventDefault();
    const bidLevel = e.target.children[2].value;
    const bidSuit = e.target.children[1].value;
    moves.bid({ bidLevel, bidSuit });
  };

  const handlePass = () => {
    moves.playerpassed();
  };

  const handleDouble = () => {
    moves.double();
  };

  const handlereDouble = () => {
    moves.reDouble();
  };

  return (
    <>
      <ul style={{ gap: "1rem" }}>
        {G.players &&
          G.players.map((player) => (
            <li key={player.name}>
              <h2>{player.name}</h2>
              <ul style={{ display: "flex", gap: ".5rem" }}>
                {player.hand.map((card) => (
                  <li style={{ border: "2px solid black" }}>
                    <img width="50px" src={card.image}></img>
                  </li>
                ))}
              </ul>

              <form onSubmit={(e) => handleBid(e, "1")}>
                <h3>make Bid</h3>

                <select name="" id="">
                  <option value="H">♥</option>
                  <option value="S">♠</option>
                  <option value="D">♣</option>
                  <option value="C">♦</option>
                  <option value="NT">NT</option>
                </select>

                <input type="number" />
                <button>Bid</button>
              </form>
              <button onClick={() => handlePass()}>Pass</button>
              <button onClick={() => handleDouble()}>Double</button>
              <button onClick={() => handlereDouble()}>Redoubled</button>
              <h3>had Bid</h3>
              <p>Color: {player.bid?.suit}</p>
              <p>tricks: {player.bid?.level}</p>
            </li>
          ))}
      </ul>
    </>
  );
};

export default BridgeBoard;
