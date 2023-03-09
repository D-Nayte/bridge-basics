import React, { ReactComponentElement } from "react";
import {QRCodeSVG} from 'qrcode.react';

const Qrcode = ({matchURL}: {matchURL: string;}) /* what to put here */ => {
  
  const qrCode = (
   <QRCodeSVG
    id="qrCodeId"
    size={400}
    value={matchURL}
    bgColor="black"
    fgColor="darkgrey"
    level="H"
     />
  )

  return <div className="qr-container__qr-code">{qrCode}</div>

};

export default Qrcode;
