import { Card, Player } from "@/../../shared/src/interface";
import { SyntheticEvent, useEffect, useState } from "react";

const BridgeBoard = (props: any) => {
  const { G, ctx, moves, playerID, matchData, events } = props;
  console.log("props :>> ", props);
  const player = G.players[playerID];

  const handleBid = (e: any, playerId: string) => {
    e.preventDefault();

    if (e.target[0].value !== "" && e.target[1].value !== "") {
      const bidLevel = e.target[1].value;
      const bidSuit = e.target[0].value;
      moves.bid({ bidLevel, bidSuit });
    }
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

  const handlePlayCard = (card: Card) => {
    moves.playCard(card);
  };

  useEffect(() => {
    moves.addToG(matchData[playerID]);
  }, []);

  return (
    <>
      {G.players.length > 0 &&
        G.players.map((player: Player) => {
          if (player) {
            if (player.id === parseInt(playerID)) {
              return (
                <div key={player.name}>
                  <h2>{player.name}</h2>
                  <img src={player?.data?.imageURL} width="50px" alt="" />
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
                  <button onClick={() => handlePass()}>Pass</button>
                  <button onClick={() => handleDouble()}>Double</button>
                  <button onClick={() => handlereDouble()}>Redoubled</button>
                  <button onClick={() => moves.finishGame()}>FINISH!</button>
                  <button onClick={() => moves.startNewRound()}>
                    new Round!
                  </button>
                  <button onClick={() => events.setPhase("newRound")}>
                    test
                  </button>
                  <h3>had Bid</h3>
                  <p>Color: {player.bid?.suit}</p>
                  <p>tricks: {player.bid?.level}</p>
                </div>
              );
            }
          }
        })}
    </>
  );
};

export default BridgeBoard;
