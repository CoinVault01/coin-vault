import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SendCoinModal from "./SendCoinModal";
import ReceiveCoinModal from "./ReceiveCoinModal";

const TransferCoinModal = ({ selectedCryptoData, setIsModalVisible }) => {
  const [isSendModalVisible, setIsSendModalVisible] = useState(false);
  const [isReceiveModalVisible, setIsReceiveModalVisible] = useState(false);

  const showSendModal = () => {
    setIsSendModalVisible(true);
    setIsReceiveModalVisible(false);
  };

  const showReceiveModal = () => {
    setIsSendModalVisible(false);
    setIsReceiveModalVisible(true);
  };

  return (
    <section className="border-[1px] border-[rgb(46,52,59)] h-[100%] largeDevice:h-[400px] largeDevice:w-[50%] bg-[rgb(32,37,43)] largeDevice:rounded-[10px] generalDevice:fixed top-[70px] w-full">
      {!isSendModalVisible && !isReceiveModalVisible && (
        <div className="w-[90%] mx-auto pt-[10px]">
          <div className="flex justify-end text-[25px] text-[rgb(133,209,240)] mb-[10px] largeDevice:hidden">
            <i
              className="fa-solid fa-xmark cursor-pointer"
              onClick={() => {
                setIsModalVisible(false);
              }}
            ></i>
          </div>

          <div className="my-[40px] flex flex-col items-center justify-center">
            <img
              src={selectedCryptoData && selectedCryptoData.image}
              alt=""
              className="w-[100px] block"
            />

            <div className="my-[20px] flex gap-[3px] text-[20px] font-[600]">
              <p>
                {selectedCryptoData && selectedCryptoData.amount.toFixed(2)}
              </p>
              <p className="uppercase">
                {selectedCryptoData && selectedCryptoData.symbol}
              </p>
            </div>

            <div className="flex gap-[25px]">
              <div
                className="flex flex-col justify-center items-center cursor-pointer"
                onClick={showSendModal}
              >
                <div className="bg-[rgb(0,105,255)] py-[10px] px-[12px] rounded-full">
                  <i class="fa-solid fa-arrow-trend-up"></i>
                </div>
                <p>Send</p>
              </div>

              <div
                className="flex flex-col justify-center items-center cursor-pointer"
                onClick={showReceiveModal}
              >
                <div className="bg-[rgb(0,105,255)] py-[10px] px-[12px] rounded-full">
                  <i class="fa-solid fa-arrow-trend-down"></i>
                </div>
                <p>Receive</p>
              </div>

              <NavLink to="/wallet-swapcoin">
                <div className="flex flex-col justify-center items-center cursor-pointer">
                  <div className="bg-[rgb(0,105,255)] py-[10px] px-[12px] rounded-full">
                    <i class="fa-solid fa-shuffle"></i>
                  </div>
                  <p>Swap</p>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {isSendModalVisible && (
        <SendCoinModal
          selectedCryptoData={selectedCryptoData}
          setIsModalVisible={setIsModalVisible}
        />
      )}
      {isReceiveModalVisible && (
        <ReceiveCoinModal
          selectedCryptoData={selectedCryptoData}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </section>
  );
};

export default TransferCoinModal;
