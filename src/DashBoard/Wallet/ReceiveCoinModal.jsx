import React from "react";
import { QRCode } from "antd";

const ReceiveCoinModal = ({ selectedCryptoData }) => {
  return (
    <section>
      <div className="flex justify-end text-[25px] text-[rgb(133,209,240)] py-[10px] px-[20px]">
        <i
          className="fa-solid fa-xmark cursor-pointer"
          
        ></i>
      </div>
      <div className="flex flex-col justify-center items-center mt-[40px] mb-[20px] bg-[rgba(244,244,244,0.86)] rounded-[8px] w-[280px] mx-auto py-[40px]">
        <div className="mb-[10px]">
          <QRCode value={selectedCryptoData && selectedCryptoData.address} />
        </div>

        <div className="text-[black] font-[600]">
          <p>{selectedCryptoData && selectedCryptoData.address}</p>
        </div>
      </div>

      <div className="text-center">
        <p>
          Send only{" "}
          <span className="font-[600]">
            {selectedCryptoData && selectedCryptoData.name}
          </span>{" "}
          <span>(</span>
          <span className="font-[600] uppercase">
            {selectedCryptoData && selectedCryptoData.symbol}
          </span>
          <span>)</span> to this address.
        </p>
      </div>
    </section>
  );
};

export default ReceiveCoinModal;
