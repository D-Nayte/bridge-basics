import React, { useState, useEffect } from "react";
import style from "../styles/popup.module.css";

function Popup({ children }: { children: any }) {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    let timerId: any;
    if (showPopup) {
      timerId = setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [showPopup]);

  return (
    <>
      {showPopup && (
        <div className={style.popup}>
          <div className={style.popup_inner}>
            <div className={style.popup_content}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Popup;
