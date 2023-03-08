import React from "react";
import {QRCodeSVG} from 'qrcode.react';

const Qrcode = () => {
  
  const qrCode = (
   <QRCodeSVG
    id="qrCodeId"
    size={400}
    value={"1"}
    bgColor="black"
    fgColor="darkgrey"
    level="H"
     />
  )

  return <div className="qr-container__qr-code">{qrCode}</div>

};

export default Qrcode;
