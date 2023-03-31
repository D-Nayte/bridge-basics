//@ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import wheel from "../style/wheel.module.css";

interface WheelProps {
  data: {}[];
  width?: string;
  height?: string;
  className?: string;
}

const ScrollWheel = ({ data, width, height, className }: WheelProps) => {
  const [scrollDirection, setscrollDirection] = useState(null);
  const [touchStart, setstartTouch] = useState(0);
  const [currPosition, setcurrPosition] = useState(33.33);
  const show = data.slice(0, 5);
  const items = useRef("");
  const animTime = 250;
  const [highlight, sethighlight] = useState({
    //scale: "1.1",
    //fontSize: "1.3em",
    //fontWeight: "800",
    color: "var(--text-color-dark)",
  });
  const [animTimeout, setanimTimeout] = useState(null);
  const handleMove = (e) => {
    const end = e.changedTouches[0].clientY;
    if (touchStart > end) return setcurrPosition((prev) => prev + 0.45);
    if (touchStart < end) return setcurrPosition((prev) => prev - 0.45);
  };

  const handleScroll = (e) => {
    const end = e.changedTouches[0].clientY;

    if (touchStart > end) return setstartTouch(end), scrollAnimation("up");
    if (touchStart < end) return setstartTouch(end), scrollAnimation("down");
  };

  const handleWheel = (event) => {
    if (event.deltaY < 0) {
      scrollAnimation("up");
    } else if (event.deltaY > 0) {
      scrollAnimation("down");
    }
  };

  const scrollAnimation = (direction) => {
    clearTimeout(animTime);
    setanimTimeout(null);

    if (direction === "up") {
      setscrollDirection("up");
      sethighlight((prev) => ({
        /*scale: "1", fontSize: "1em"*/
      }));
    }
    if (direction === "down") {
      setscrollDirection("down");
      sethighlight((prev) => ({
        /*scale: "1", fontSize: "1em"*/
      }));
    }

    setanimTimeout(
      setTimeout(() => {
        if (direction === "up") data.push(data.shift());
        if (direction === "down") data.unshift(data.pop());

        setscrollDirection(null);

        setcurrPosition(33.33);
      }, animTime)
    );
    setTimeout(() => {
      sethighlight((prev) => ({
        /*scale: "1.1",
        fontSize: "1.5em",*/

        color: "var(--text-color-dark)",
      }));
    }, 250);
  };

  return (
    <div
      id={wheel.container}
      className={className}
      onTouchStart={(e) => setstartTouch(e.touches[0].clientY)}
      onTouchMove={handleMove}
      onTouchEnd={handleScroll}
      onWheel={handleWheel}
      style={{
        width: width,
        height: height,
      }}
    >
      <div
        className={
          scrollDirection === "up"
            ? wheel.up
            : scrollDirection === "down"
            ? wheel.down
            : null
        }
        ref={items}
        style={{
          width: width,
          height: height,
          transform: `translateY(-${currPosition}%)`,
        }}
      >
        <div className={wheel.item}>{show[0].value}</div>
        <div className={wheel.item}>{show[1].value}</div>
        <div className={wheel.item} style={highlight}>
          {show[2].value}
        </div>
        <div className={wheel.item}>{show[3].value}</div>
        <div className={wheel.item}>{show[4].value}</div>
      </div>
    </div>
  );
};

export default ScrollWheel;
