import React, { useState } from "react";
import style from "../style/bidselection.module.css";

const BidSelection = ({ moves, playerID }: { moves: any; playerID: any }) => {
  const [selectedSuit, setSelectedSuit] = useState("H");
  const [bidAmount, setBidAmount] = useState("");

  const handleBid = (e: any) => {
    e.preventDefault();

    if (selectedSuit && bidAmount && playerID) {
      moves.bid({ bidLevel: bidAmount, bidSuit: selectedSuit });
    }
  };

  return (
    <div className={style.form_container}>
      <form onSubmit={handleBid}>
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

        <select
          name="bid-amount"
          id="bid-amount"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
        >
          <option value="1">{selectedSuit} 1</option>
          <option value="2">{selectedSuit} 2</option>
          <option value="3">{selectedSuit} 3</option>
          <option value="4">{selectedSuit} 4</option>
          <option value="5">{selectedSuit} 5</option>
          <option value="6">{selectedSuit} 6</option>
          <option value="7">{selectedSuit} 7</option>
        </select>
        <button type="submit">Bid</button>
      </form>
    </div>
  );
};

export default BidSelection;
