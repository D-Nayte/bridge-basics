import React, { ReactComponentElement } from "react";
import { QRCodeSVG } from "qrcode.react";

const Qrcode = ({ matchURL }: { matchURL: string }) /* what to put here */ => {
  return (
    <QRCodeSVG
      id="qrCodeId"
      size={200}
      value={matchURL}
      bgColor="black"
      fgColor="whitesmoke"
      level="H"
    />
  );
};

export default Qrcode;
