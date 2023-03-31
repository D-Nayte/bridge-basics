import React, { useState } from "react";
import ScrollWheel from "./ScrollWheel";
import carousel from "../style/bidCarousel.module.css";
import {
  BsSuitClubFill,
  BsSuitDiamondFill,
  BsSuitHeartFill,
  BsSuitSpadeFill,
} from "react-icons/bs";

const BidCarousel = () => {
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
    },
    {
      value: "NT",
    },
    {
      value: <BsSuitSpadeFill />,
    },
    {
      value: <BsSuitDiamondFill />,
    },
    {
      value: <BsSuitClubFill />,
    },
  ]);

  const bidNumber = numbers[2].value;
  const bidSuit = suits[2].value;

  return (
    <>
      <div
        id={carousel.container}
        style={{
          display: "flex",
          padding: "20px",
          justifyContent: "space-between",
        }}>
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
        <div
          style={{
            width: "60px",
            background: "#22443d",
            borderRadius: "15px",
            padding: "15px",
          }}>
          {bidNumber}
          {bidSuit}
        </div>
      </div>
    </>
  );
};

export default BidCarousel;
