import React from "react";
import style from "../style/bidbutton2.module.css";
import { BiLeftArrowCircle } from "react-icons/bi";

const BidButtons2 = ({ moves }: { moves: any }) => {
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
        <button
          className={style.bidbuttons_button}
          form="my-form"
          type="submit"
        >
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
