import React from "react";
import { QRCode } from "antd";

const ReceiveCoinModal = ({ selectedCryptoData }) => {
  return (
    <section>
      <QRCode value={selectedCryptoData && selectedCryptoData.address} />
      {/* <p>{selectedCryptoData && selectedCryptoData.address}</p> */}
    </section>
  );
};

export default ReceiveCoinModal;
