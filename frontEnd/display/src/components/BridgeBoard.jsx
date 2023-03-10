import React from "react";

const BridgeBoard = (props) => {
  const { G, ctx, plugins, matchData } = props;
  console.log("props :>> ", props);
  return (
    <>
      <h1>BridgeBoard</h1>
      <ul>
        {G.players &&
          G.players.map((player) => (
            <li>
              <h2>NAME: {player.name}</h2>
              <p>PlayerID : {player.id}</p>
              <img src={player.data?.imageURL} width="50px" alt="" />
            </li>
          ))}
      </ul>
    </>
  );
};

export default BridgeBoard;
