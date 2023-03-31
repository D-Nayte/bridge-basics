import React from "react";

const BidCarousel = () => {
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
          Carousel
        </div>
        <div
          style={{
            width: "60px",
            background: "#22443d",
            borderRadius: "15px",
            padding: "15px",
          }}
        >
          1
        </div>
      </div>
    </>
  );
};

export default BidCarousel;
