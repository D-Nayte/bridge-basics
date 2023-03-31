import React, { useState, useEffect } from "react";
import ScrollWheel from "./ScrollWheel";
import carousel from "../style/bidCarousel.module.css";
import {
  BsSuitClubFill,
  BsSuitDiamondFill,
  BsSuitHeartFill,
  BsSuitSpadeFill,
} from "react-icons/bs";
import { BidSelect, BridgeProps } from "@interface";
import { suitOrder } from "@shared/lib/deck";

interface CarouselProps extends BridgeProps {
  setSelectedBid: React.Dispatch<
    React.SetStateAction<{
      bidAmount: BidSelect | null;
      bidSuit: BidSelect | null;
    }>
  >;
}

const BidCarousel = ({ setSelectedBid, G, playerID, ctx }: CarouselProps) => {
  const [numbers, setnumbers] = useState([
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
  ]);
  const [suits, setsuits] = useState([
    {
      value: <BsSuitHeartFill />,
      color: "red",
      id: "H",
    },
    {
      value: "NT",
      color: "NT",
      id: "NT",
    },
    {
      value: <BsSuitSpadeFill />,
      color: "black",
      id: "S",
    },
    {
      value: <BsSuitDiamondFill />,
      color: "red",
      id: "D",
    },
    {
      value: <BsSuitClubFill />,
      color: "black",
      id: "C",
    },
  ]);
  const bidNumber = numbers[2];
  const bidSuit = suits[2];
  const [invalidBid, setinvalidBid] = useState(false);

  const validateBid = () => {
    const highestBid = G?.highestBid;
    const activePlayer = ctx?.currentPlayer;
    const isCurrentlyActivePlayer = activePlayer === playerID;

    if (isCurrentlyActivePlayer) {
      if (highestBid?.suit && highestBid?.level) {
        const currentPlayerBid = bidNumber.value;
        const highestLevel = parseInt(highestBid.level);

        //if color level is less then the actuall one
        if (currentPlayerBid <= highestLevel) {
          const highestSuit = suitOrder.indexOf(highestBid.suit);
          const currSuit = suitOrder.indexOf(bidSuit.id);
          currSuit <= highestSuit ? setinvalidBid(true) : setinvalidBid(false);
          return;
        }
        setinvalidBid(false);
      }
    }
  };

  useEffect(() => {
    validateBid();
    setSelectedBid(() => ({ bidAmount: numbers[2], bidSuit: suits[2] }));
  }, [numbers, suits]);

  return (
    <>
      <div id={carousel.container}>
        <div className={carousel.wheel_wrapper}>
          <ScrollWheel
            data={numbers}
            width={"50px"}
            height={"75px"}
            changeData={setnumbers}
          />
          <ScrollWheel
            data={suits}
            width={"50px"}
            height={"75px"}
            changeData={setsuits}
          />
          <div
            className={invalidBid ? carousel.middle_invalid : carousel.middle}
          />
        </div>
        <div className={carousel.numbers_display_container}>
          <div>
            <p>{bidNumber.value}</p>
            <p
              style={{
                color:
                  bidSuit.color === "red"
                    ? "var(--red)"
                    : bidSuit.color === "black"
                    ? "var(--text-color-dark)"
                    : "var(--white)",
              }}>
              {bidSuit.value}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BidCarousel;
