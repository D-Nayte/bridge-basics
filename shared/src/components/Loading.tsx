import React from "react";
import loading from "../styles/loading.module.css";
import {
  BsFillSuitClubFill,
  BsFillSuitDiamondFill,
  BsFillSuitHeartFill,
  BsFillSuitSpadeFill,
} from "react-icons/bs";

const LoadingScreen = () => {
  return (
    <>
      <div className={loading.screen}>
        <div className={loading.screen__dynamic}>
          <div className={loading.dot}>
            <BsFillSuitClubFill />
          </div>
          <div className={loading.dot}>
            <BsFillSuitDiamondFill />
          </div>
          <div className={loading.dot}>
            <BsFillSuitHeartFill />
          </div>
          <div className={loading.dot}>
            <BsFillSuitSpadeFill />
          </div>
        </div>
        <div className={loading.screen__static}>
          <div className={loading.dot}>
            <BsFillSuitClubFill />
          </div>
          <div className={loading.dot}>
            <BsFillSuitDiamondFill />
          </div>
          <div className={loading.dot}>
            <BsFillSuitHeartFill />
          </div>
          <div className={loading.dot}>
            <BsFillSuitSpadeFill />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
