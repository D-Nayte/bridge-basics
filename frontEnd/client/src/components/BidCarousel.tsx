import React, { useState, useEffect } from "react";
import ScrollWheel from "./ScrollWheel";
import carousel from "../style/bidCarousel.module.css";
import {
  BsSuitClubFill,
  BsSuitDiamondFill,
  BsSuitHeartFill,
  BsSuitSpadeFill,
} from "react-icons/bs";

const BidCarousel = () => {
  const numbers = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
  ];
  const suits = [
    {
      value: <BsSuitHeartFill />,
      id: "0",
    },
    {
      value: "NT",
      id: "1",
    },
    {
      value: <BsSuitSpadeFill />,
      id: "2",
    },
    {
      value: <BsSuitDiamondFill />,
      id: "3",
    },
    {
      value: <BsSuitClubFill />,
      id: "4",
    },
  ];
  const test = numbers[2].value;

  useEffect(() => {
    console.log("numbers", numbers);
  }, [numbers]);

  return (
    <>
      <div
        id={carousel.container}
        style={{
          display: "flex",
          padding: "20px",
          justifyContent: "space-between",
        }}
      >
        <div className={carousel.wheel_wrapper}>
          <ScrollWheel data={numbers} width={"50px"} height={"75px"} />
          <ScrollWheel data={suits} width={"50px"} height={"75px"} />
          <div className={carousel.middle} />
        </div>
        <div
          style={{
            width: "60px",
            background: "#22443d",
            borderRadius: "15px",
            padding: "15px",
          }}
        >
          <div
            style={{
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              alignItems: "center",
              padding: "0.5rem",
            }}
          >
            <h2>{test}</h2>

            <BsSuitHeartFill
              style={{
                color:
                  suits[0].id === "0"
                    ? "var(--red)"
                    : "var(--text-color-dark:)",
              }}
            />
          </div>
        </div>
        {console.log("suits[0].value", suits[0].value)}
      </div>
    </>
  );
};

export default BidCarousel;
