import React, { useState, useRef } from "react";
import { Button, Result } from "antd";
import { useReactToPrint } from "react-to-print";

const BuyStatusModal = ({
  selectedCrypto,
  cryptoEquivalent,
  setUsdAmount,
  setCryptoEquivalent,
}) => {
  const [closeModal, setCloseModal] = useState(false);
  const componentRef = useRef();

  const handleCloseModal = () => {
    setCryptoEquivalent("");
    setUsdAmount("");
    setCloseModal(true);
    window.location.reload();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <section
      className={`${
        closeModal ? "hidden" : "block"
      } fixed top-[70px] largeDevice:top-[120px] w-full largeDevice:w-[500px] largeDevice:h-[500px] largeDevice:left-[38%] bg-[rgb(32,37,43)] largeDevice:bg-white largeDevice:rounded-[10px] largeDevice:border-[1px] border-[rgb(46,52,59)] h-[100%]`}
    >
      <div className="pt-[50px]" ref={componentRef}>
        <Result
          status="success"
          title={
            <span className="text-[white] largeDevice:text-[black]">
              Successful
            </span>
          }
          subTitle={
            <div className="text-[white] largeDevice:text-[black]">
              <p>
                Your Purchase of {cryptoEquivalent}{" "}
                {selectedCrypto ? selectedCrypto.name : ""} was successful.{" "}
                {cryptoEquivalent} {selectedCrypto ? selectedCrypto.name : ""}{" "}
                have been added to your wallet
              </p>

              <div></div>
            </div>
          }
          extra={[
            <Button
              type="primary"
              key="console"
              className="bg-[rgb(0,102,255)]"
              onClick={handlePrint}
            >
              Print
            </Button>,
            <Button key="buy" className="" onClick={handleCloseModal}>
              Close
            </Button>,
          ]}
        />
      </div>
    </section>
  );
};

export default BuyStatusModal;
