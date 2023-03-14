import { BridgeProps, Card, Player } from "@interface";
import React from "react";
import bidStyle from "../style/bidPhase.module.css";

interface GamePhaseProps extends BridgeProps {
  player: Player | null;
}

const GamePhase = ({ moves, player, playerID, ctx }: GamePhaseProps) => {
  console.log("player :>> ", player);

  const handleBid = (e: any, playerId: string | null) => {
    e.preventDefault();

    if (e.target[0].value !== "" && e.target[1].value !== "" && playerId) {
      const bidLevel = e.target[1].value;
      const bidSuit = e.target[0].value;
      moves.bid({ bidLevel, bidSuit });
    }
  };

  const handlePlayCard = (card: Card) => {
    moves.playCard(card);
  };

  const handlePass = () => {
    moves.playerpassed();
  };

  const handleDouble = () => {
    moves.double();
  };

  const handleReDouble = () => {
    moves.reDouble();
  };
  return (
    <div className={bidStyle.wrapper}>
      <h1 style={{ textAlign: "center", fontSize: "4rem" }}>{player?.name}</h1>
      {player && (
        <ul style={{ display: "flex", gap: ".5rem" }}>
          {player.hand.map((card, index) => (
            <li
              key={index}
              style={{ border: "2px solid black" }}
              onClick={() => handlePlayCard(card)}>
              <img width="50px" src={card.image}></img>
            </li>
          ))}
        </ul>
      )}
      {ctx.phase === "bid" && (
        <div>
          <form onSubmit={(e) => handleBid(e, playerID)}>
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
          <ul className={bidStyle.buttons_wrapper}>
            <li>
              <button onClick={handlePass}>Pass</button>
            </li>
            <li>
              <button onClick={handleDouble}>Douple</button>
            </li>
            <li>
              <button onClick={handleReDouble}>Redouple</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GamePhase;
