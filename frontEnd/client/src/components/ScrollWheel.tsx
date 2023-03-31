//@ts-nocheck
import React, { useState, useRef, SetStateAction, Dispatch } from "react";
import wheel from "../style/wheel.module.css";

interface WheelProps {
  data: {}[];
  width?: string;
  height?: string;
  className?: string;
  changeData?: any;
}

const ScrollWheel = ({
  data,
  width,
  height,
  className,
  changeData,
}: WheelProps) => {
  const [scrollDirection, setscrollDirection] = useState(null);
  const [touchStart, setstartTouch] = useState(0);
  const [currPosition, setcurrPosition] = useState(33.33);
  const show = data.slice(0, 5);
  const items = useRef("");
  const handleMove = (e) => {
    const end = e.changedTouches[0].clientY;
    if (touchStart > end) return setcurrPosition((prev) => prev + 0.45);
    if (touchStart < end) return setcurrPosition((prev) => prev - 0.45);
  };
  const animTime = 250;

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

    if (direction === "up") {
      setscrollDirection("up");
      //@ts-ignore
      changeData(() => [...data]);
    }
    if (direction === "down") {
      setscrollDirection("down");
    }

    setTimeout(() => {
      if (direction === "up") data.push(data.shift());
      if (direction === "down") data.unshift(data.pop());

      setscrollDirection(null);
      setcurrPosition(33.33);

      changeData(() => [...data]);
    }, animTime);
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
        <div className={wheel.item}>{show[2].value}</div>
        <div className={wheel.item}>{show[3].value}</div>
        <div className={wheel.item}>{show[4].value}</div>
      </div>
    </div>
  );
};

export default ScrollWheel;
