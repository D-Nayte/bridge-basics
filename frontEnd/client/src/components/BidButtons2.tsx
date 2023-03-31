import React, { useState, useEffect } from "react";
import style from "../style/bidbutton2.module.css";

import { Bid, BridgeProps, Player, Suit } from "@interface";

interface ButtonProps extends BridgeProps {
  selectedBid: any;
}

const BidButtons2 = ({ selectedBid, moves, playerID }: ButtonProps) => {
  const handleBid = (e: any) => {
    if (selectedBid.bidAmount && selectedBid.bidSuit && playerID) {
      moves.bid({
        bidLevel: selectedBid.bidAmount.value,
        bidSuit: selectedBid.bidSuit.id,
      });
    }
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
    <>
      <li className={style.bidbuttons}>
        <button className={style.bidbuttons_button} onClick={handleBid}>
          Bid
        </button>
      </li>
      <li className={style.bidbuttons}>
        <button className={style.bidbuttons_button} onClick={handlePass}>
          Pass
        </button>
      </li>
      <li className={style.bidbuttons}>
        <button className={style.bidbuttons_button} onClick={handleDouble}>
          X
        </button>
      </li>
      <li className={style.bidbuttons}>
        <button className={style.bidbuttons_button} onClick={handleReDouble}>
          XX
        </button>
      </li>
    </>
  );
};

export default BidButtons2;
