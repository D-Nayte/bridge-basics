import * as React from "react";
import {
  BsFillSuitClubFill,
  BsFillSuitDiamondFill,
  BsFillSuitHeartFill,
  BsFillSuitSpadeFill,
} from "react-icons/bs";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-screen__text">
        <h1>Loading</h1>
      </div>
      <div className="loading-screen__icon suit-club">
        <BsFillSuitClubFill />
      </div>
      <div className="loading-screen__icon suit-diamond">
        <BsFillSuitDiamondFill />
      </div>
      <div className="loading-screen__icon suit-heart">
        <BsFillSuitHeartFill />
      </div>
      <div className="loading-screen__icon suit-spade">
        <BsFillSuitSpadeFill />
      </div>
    </div>
  );
};

export default LoadingScreen;
