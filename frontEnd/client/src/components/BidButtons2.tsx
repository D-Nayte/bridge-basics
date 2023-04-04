import React, { useState, useEffect } from "react";
import style from "../style/bidbutton2.module.css";
import { Bid, BridgeProps, CarouselProps, Player, Suit } from "@interface";
import ErrorMessage from "./ErrorMessage";

interface ButtonProps extends CarouselProps {
  selectedBid: any;
  invalidBid: boolean;
}

const BidButtons2 = ({
  setErrorStatement,
  selectedBid,
  moves,
  playerID,
  invalidBid,
}: ButtonProps) => {
  const handleBid = (e: any) => {
    if (invalidBid)
      return setErrorStatement(
        <p style={{}}>
          Invalid bid: you must bid more than {selectedBid.bidAmount.value}{" "}
          <span
            style={{
              color:
                selectedBid.bidSuit.color === "red"
                  ? "var(--red)"
                  : selectedBid.bidSuit.color === "black"
                  ? "var(--text-color-dark)"
                  : "var(--white)",
            }}
          >
            {selectedBid.bidSuit.value}
          </span>
        </p>
      );
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
