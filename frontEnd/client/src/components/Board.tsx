import { SyntheticEvent, useEffect, useState } from "react";

const BridgeBoard = (props: any) => {
  const { G, ctx, moves, playerID, matchData } = props;
  console.log("props :>> ", props);
  const player = G.players[playerID];

  const handleBid = (e: any, playerId: string) => {
    e.preventDefault();
    if (e.target[2].value !== "" && e.target[2].value !== "") {
      const bidLevel = e.target[2].value;
      const bidSuit = e.target[1].value;
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

  useEffect(() => {
    moves.addToG(matchData[playerID]);
  }, []);

  return (
    <>
      {G.players.length > 0 &&
        G.players.map((player) => {
          if (player.id === parseInt(playerID)) {
            return (
              <div key={player.name}>
                <h2>{player.name}</h2>
                <img src={player.data.imageURL} width="50px" alt="" />
                <ul style={{ display: "flex", gap: ".5rem" }}>
                  {player.hand.map((card, index) => (
                    <li key={index} style={{ border: "2px solid black" }}>
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
                <h3>had Bid</h3>
                <p>Color: {player.bid?.suit}</p>
                <p>tricks: {player.bid?.level}</p>
              </div>
            );
          }
        })}
    </>
  );
};

export default BridgeBoard;
