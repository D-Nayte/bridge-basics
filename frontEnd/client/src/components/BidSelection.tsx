import { Bid, BridgeProps, Player, Suit } from "@interface";
import { suitOrder } from "@shared/lib/deck";
import { parse } from "path";
import React, { useEffect, useState } from "react";
import style from "../style/bidselection.module.css";
import bidStyle from "../style/bidPhase.module.css";
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
import { BiLeftArrowCircle } from "react-icons/bi";
import BidButtons from "./BidButtons";

const BidSelection = ({ playerID, G, moves }: BridgeProps) => {
  const [selectedSuit, setSelectedSuit] = useState<string>("");
  const [bidAmount, setBidAmount] = useState("");
  const [selectedSlider, setSelectedSlider] = useState(false);

  // this will change the icons selected to their filled version on click and back to default if it ain't selected
  const showIcon = (iconKey: Suit) => {
    const filledIcons = {
      H: <BsSuitHeartFill />,
      D: <BsSuitDiamondFill />,
      S: <BsSuitSpadeFill />,
      C: <BsSuitClubFill />,
      NT: "NT",
    };
    const emptyIcons = {
      H: <BsSuitHeart />,
      D: <BsSuitDiamond />,
      S: <BsSuitSpade />,
      C: <BsSuitClub />,
      NT: "NT",
    };

    const icon =
      selectedSuit === iconKey ? filledIcons[iconKey] : emptyIcons[iconKey];
    return icon;
  };

  const handleBid = (e: any) => {
    e.preventDefault();

    if (selectedSuit && bidAmount && playerID) {
      moves.bid({ bidLevel: parseInt(bidAmount), bidSuit: selectedSuit });
    }
  };

  const AvailableBidOptions = ({
    highestBid,
    selectedSuit,
  }: {
    highestBid: Bid | null;
    selectedSuit: string;
  }) => {
    let startIndex = 1;
    const currSuitLevel = suitOrder.indexOf(selectedSuit);
    let highestSuit = -1;
    const options = [];

    if (highestBid) {
      highestSuit = suitOrder.indexOf(highestBid?.suit);

      //if color level is less then the actuall one, increase available options by 1
      if (currSuitLevel <= highestSuit) {
        startIndex = parseInt(highestBid.level) + 1;
      } else {
        startIndex = parseInt(highestBid.level);
      }
    }

    for (let index = startIndex; index <= 7; index++) {
      options.push(
        <button
          key={`${selectedSuit}${index}`}
          type="button"
          onClick={() => setBidAmount(String(index))}
          disabled={selectedSuit === "none"}
          className={
            bidAmount === String(index) && selectedSuit !== "none"
              ? style.selected_bid_button
              : style.bid_button
          }
        >
          {index}
        </button>
      );
    }

    return <div className={style.bid_button_container}>{options}</div>;
  };
  useEffect(() => {
    if (selectedSuit) setSelectedSlider(true);
  }, [selectedSuit]);

  return (
    <>
      <div
        className={style.bidselection_container}
        style={{
          transform: !selectedSlider ? "translateX(0)" : "translateX(-50%)",
        }}
      >
        <form
          id="my-form"
          onSubmit={handleBid}
          className={style.form_container}
        >
          <label htmlFor="suit-nt">
            <input
              type="radio"
              id="suit-nt"
              name="suit"
              value="NT"
              checked={selectedSuit === "NT"}
              onChange={() => {
                setSelectedSuit("NT");
              }}
            />
            <span>{showIcon("NT")}</span>
          </label>

          <label htmlFor="suit-spade">
            <input
              type="radio"
              id="suit-spade"
              name="suit"
              value="S"
              checked={selectedSuit === "S"}
              onChange={() => {
                setSelectedSuit("S");
              }}
            />
            <span>{showIcon("S")}</span>
          </label>

          <label htmlFor="suit-heart">
            <input
              type="radio"
              id="suit-heart"
              name="suit"
              value="H"
              checked={selectedSuit === "H"}
              onChange={() => {
                setSelectedSuit("H");
              }}
            />
            <span>{showIcon("H")}</span>
          </label>

          <label htmlFor="suit-diamond">
            <input
              type="radio"
              id="suit-diamond"
              name="suit"
              value="D"
              checked={selectedSuit === "D"}
              onChange={() => {
                setSelectedSuit("D");
              }}
            />
            <span>{showIcon("D")}</span>
          </label>

          <label htmlFor="suit-club">
            <input
              type="radio"
              id="suit-club"
              name="suit"
              value="C"
              checked={selectedSuit === "C"}
              onChange={() => {
                setSelectedSuit("C");
              }}
            />
            <span>{showIcon("C")}</span>
          </label>

          {/*<select
        name="bid-amount"
        id="bid-amount"
        value={bidAmount === "" ? "none" : bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
      >
        <option value="none" disabled>
          select suit
        </option>
        {selectedSuit !== "none" && (
          <AvailableBidOptions
            highestBid={G.highestBid}
            selectedSuit={selectedSuit}
          />
        )}
        </select>*/}
        </form>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <AvailableBidOptions
            highestBid={G.highestBid}
            selectedSuit={selectedSuit}
          />

          <div>
            <button
              className={style.bidselection_back_button}
              onClick={() => setSelectedSlider(false)}
            >
              <BiLeftArrowCircle />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BidSelection;
