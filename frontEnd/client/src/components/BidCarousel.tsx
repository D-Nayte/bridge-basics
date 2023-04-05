import React, { useState, useEffect } from "react";
import ScrollWheel from "./ScrollWheel";
import carousel from "../style/bidCarousel.module.css";
import bidStyle from "../style/bidPhase.module.css";
import {
  BsSuitClubFill,
  BsSuitDiamondFill,
  BsSuitHeartFill,
  BsSuitSpadeFill,
} from "react-icons/bs";
import { BidSelect, BridgeProps, CarouselProps } from "@interface";
import { suitOrder } from "@shared/lib/deck";
import BidButtons2 from "./BidButtons2";

const BidCarousel = (props: CarouselProps) => {
  const { G, playerID, ctx, setErrorStatement } = props;
  const [invalidBid, setinvalidBid] = useState(false);
  const [selectedBid, setSelectedBid] = useState<{
    bidAmount: BidSelect | null;
    bidSuit: BidSelect | null;
  }>({
    bidAmount: null,
    bidSuit: null,
  });
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

  const validateBid = () => {
    const highestBid = G?.highestBid;
    const activePlayer = ctx?.currentPlayer;

    if (highestBid?.suit && highestBid?.level) {
      const currentPlayerBid = bidNumber.value;
      const highestLevel = parseInt(highestBid.level);

      //if color level is less then the actuall one
      if (currentPlayerBid <= highestLevel) {
        const highestSuit = suitOrder.indexOf(highestBid.suit);
        const currSuit = suitOrder.indexOf(bidSuit.id);
        const sameSuit = currentPlayerBid === highestLevel;
        currSuit > highestSuit && sameSuit
          ? setinvalidBid(false)
          : setinvalidBid(true);
        return;
      }
      setinvalidBid(false);
    }
  };

  useEffect(() => {
    validateBid();
    setSelectedBid(() => ({ bidAmount: numbers[2], bidSuit: suits[2] }));
  }, [numbers, suits]);

  return (
    <>
      <div id={carousel.container}>
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
        <div className={carousel.wheel_wrapper}>
          <ScrollWheel
            data={numbers}
            width={"25vw"}
            height={"25vh"}
            changeData={setnumbers}
          />
          <ScrollWheel
            data={suits}
            width={"25vw"}
            height={"25vh"}
            changeData={setsuits}
          />
          <div
            className={invalidBid ? carousel.middle_invalid : carousel.middle}
          />
        </div>
      </div>
      <ul className={bidStyle.buttons_wrapper}>
        <BidButtons2
          invalidBid={invalidBid}
          selectedBid={selectedBid}
          {...props}
          setErrorStatement={setErrorStatement}
        />
      </ul>
    </>
  );
};

export default BidCarousel;
