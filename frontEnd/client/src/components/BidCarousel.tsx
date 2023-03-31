import React, { useState, useEffect } from "react";
import ScrollWheel from "./ScrollWheel";
import carousel from "../style/bidCarousel.module.css";

import {
  BsSuitClubFill,
  BsSuitDiamondFill,
  BsSuitHeartFill,
  BsSuitSpadeFill,
} from "react-icons/bs";

const BidCarousel = ({ setSelectedBid }: any) => {
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

  useEffect(() => {
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
          <div className={carousel.middle} />
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
              }}
            >
              {bidSuit.value}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BidCarousel;
