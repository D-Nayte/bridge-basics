import React from "react";
import Popup from "./Popup";
import { RiFilePaper2Line } from "react-icons/ri";
import style from "../styles/contract.module.css";
import { BridgeProps, Card, Player, PlayerCard, Suit, Trick } from "@interface";
import {
  BsFillSuitClubFill,
  BsFillSuitDiamondFill,
  BsFillSuitHeartFill,
  BsFillSuitSpadeFill,
} from "react-icons/bs";
import { AiOutlineStop } from "react-icons/ai";

const Contract = (props: BridgeProps) => {
  function getSuitSymbol(suit: Suit = "NT") {
    const symbolList = {
      H: <BsFillSuitHeartFill />,
      D: <BsFillSuitDiamondFill />,
      C: <BsFillSuitClubFill />,
      S: <BsFillSuitSpadeFill />,
      NT: <AiOutlineStop />,
    };

    return symbolList[suit];
  }

  const { G, ctx, plugins, matchData } = props;
  return (
    <Popup>
      <div className={style.contract_container}>
        <div className={style.contract_icon}>
          <RiFilePaper2Line />
        </div>

        <h2>A Contract has been set!</h2>
        <h2
          className={style.contract_current}
          style={{
            color:
              G.contract?.suit === "H" || G.contract?.suit === "D"
                ? "var(--red)"
                : "black",
          }}
        >
          {G.contract?.level} {getSuitSymbol(G.contract?.suit)}
        </h2>
      </div>
    </Popup>
  );
};

export default Contract;
