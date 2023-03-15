import { Bid, BridgeProps, Player } from "@interface";
import { suitOrder } from "@shared/lib/deck";
import { parse } from "path";
import React, { useState } from "react";
import style from "../style/bidselection.module.css";

const BidSelection = ({ playerID, G, moves }: BridgeProps) => {
  const [selectedSuit, setSelectedSuit] = useState<string>("none");
  const [bidAmount, setBidAmount] = useState("");

  const handleBid = (e: any) => {
    e.preventDefault();

    if (selectedSuit && bidAmount && playerID) {
      moves.bid({ bidLevel: bidAmount, bidSuit: selectedSuit });
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
        <option value={index}>
          {selectedSuit} {index}
        </option>
      );
    }
    return <>{options}</>;
  };

  return (
    <div className={style.form_container}>
      <form onSubmit={handleBid}>
        <label htmlFor="suit-nt">
          <input
            type="radio"
            id="suit-nt"
            name="suit"
            value="NT"
            checked={selectedSuit === "NT"}
            onChange={() => setSelectedSuit("NT")}
          />
          <span>NT</span>
        </label>

        <label htmlFor="suit-spade">
          <input
            type="radio"
            id="suit-spade"
            name="suit"
            value="S"
            checked={selectedSuit === "S"}
            onChange={() => setSelectedSuit("S")}
          />
          <span>♠</span>
        </label>

        <label htmlFor="suit-heart">
          <input
            type="radio"
            id="suit-heart"
            name="suit"
            value="H"
            checked={selectedSuit === "H"}
            onChange={() => setSelectedSuit("H")}
          />
          <span>♥</span>
        </label>

        <label htmlFor="suit-club">
          <input
            type="radio"
            id="suit-club"
            name="suit"
            value="C"
            checked={selectedSuit === "C"}
            onChange={() => setSelectedSuit("C")}
          />
          <span>♣</span>
        </label>

        <label htmlFor="suit-diamond">
          <input
            type="radio"
            id="suit-diamond"
            name="suit"
            value="D"
            checked={selectedSuit === "D"}
            onChange={() => setSelectedSuit("D")}
          />
          <span>♦</span>
        </label>

        <select
          name="bid-amount"
          id="bid-amount"
          value={bidAmount === "" ? "none" : bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}>
          <option value="none" disabled>
            select suit
          </option>
          {selectedSuit !== "none" && (
            <AvailableBidOptions
              highestBid={G.highestBid}
              selectedSuit={selectedSuit}
            />
          )}
        </select>
        <button type="submit">Bid</button>
      </form>
    </div>
  );
};

export default BidSelection;
