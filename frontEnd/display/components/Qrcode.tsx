import React, { FormEvent, useState } from "react";

import {QRCodeSVG} from 'qrcode.react';

const Qrcode = () => {
  const [url, setUrl] = useState<string>("gibberish");
/*
  const downloadQRCode = (evt: FormEvent) => {
    evt.preventDefault();

    setUrl("");
  };
*/
  const qrCode = (
   <QRCodeSVG
    id="qrCodeId"
    size={500}
    value={"https://google.com"}
    bgColor="white"
    fgColor="black"
    level="H"
    />
  )

  return (
    <div className="qr-container">
      <form action="" className="qr-container__form" /*onSubmit={downloadQRCode}*/>
        <input

          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"

        />
        <button type="submit">Download QR code</button>
      </form>
      <div className="qr-container__qr-code">{qrCode}</div>
    </div>
  );
};

export default Qrcode;
