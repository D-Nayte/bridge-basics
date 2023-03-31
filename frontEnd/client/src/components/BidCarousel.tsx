import React from "react";
import ScrollWheel from "./ScrollWheel";
import {
  BsSuitClub,
  BsSuitDiamond,
  BsSuitHeart,
  BsSuitSpade,
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
  ];
  return (
    <>
      <div
        style={{
          display: "flex",
          padding: "20px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            background: "white",
            width: "150px",
            height: "100px",
            borderRadius: "15px",
            display: "flex",
            padding: "15px",
          }}
        >
          <ScrollWheel data={numbers} width={"50px"} height={"75px"} />
          <ScrollWheel data={suits} width={"50px"} height={"75px"} />
        </div>
        <div
          style={{
            width: "60px",
            background: "#22443d",
            borderRadius: "15px",
            padding: "15px",
          }}
        ></div>
      </div>
    </>
  );
};

export default BidCarousel;
