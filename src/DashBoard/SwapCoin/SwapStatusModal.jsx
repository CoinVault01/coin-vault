import React, { useState, useRef, useEffect } from "react";
import { Button, Result } from "antd";
import { useReactToPrint } from "react-to-print";
import CoinVault from "../../Pages/LandingPage/Nav/NavImage/coin-bg.png";

const SwapStatusModal = ({
  selectedCrypto,
  selectedCryptoData,
  inputValue,
  equivalentCryptoValue,
  setEquivalentCryptoValue,
  setInputValue,
  userData,
}) => {
    const [closeModal, setCloseModal] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState("");
    const componentRef = useRef();

    const handleCloseModal = () => {
      setInputValue("");
      setEquivalentCryptoValue("");
      setCloseModal(true);
      window.location.reload();
    };

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    useEffect(() => {
      const updateDateTime = () => {
        const now = new Date();
        const formattedDateTime = `${
          now.getMonth() + 1
        }/${now.getDate()}/${now.getFullYear()}, ${formatAMPM(now)}`;
        setCurrentDateTime(formattedDateTime);
      };

      const formatAMPM = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours || 12; // 12-hour clock format
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${hours}:${minutes}:${seconds} ${ampm}`;
      };

      updateDateTime(); // Initial call to set the date and time
      const intervalId = setInterval(updateDateTime, 1000); // Update every second

      return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    // Function to round a number to a specified number of significant figures
    const roundToSignificantFigures = (num, significantFigures) => {
      if (num === 0) return 0;
      const multiplier =
        10 ** (significantFigures - Math.floor(Math.log10(Math.abs(num))) - 1);
      return Math.round(num * multiplier) / multiplier;
    };

    const roundedInputValue = roundToSignificantFigures(
      parseFloat(inputValue),
      3
    );
    const roundedEquivalentCryptoValue = roundToSignificantFigures(
      parseFloat(equivalentCryptoValue),
      3
    );

  return (
    <section
      className={`${
        closeModal ? "hidden" : "block"
      } fixed top-[70px] largeDevice:top-[120px] w-full largeDevice:w-[500px] largeDevice:h-[500px] largeDevice:left-[38%] bg-[rgb(32,37,43)] largeDevice:bg-white largeDevice:rounded-[10px] largeDevice:border-[1px] border-[rgb(46,52,59)] h-[100%]`}
    >
      <div className="pt-[50px]">
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
                You swapped {roundedInputValue}{" "}
                <span className="uppercase">
                  {selectedCrypto ? selectedCrypto.symbol : ""}
                </span>{" "}
                to {roundedEquivalentCryptoValue}{" "}
                <span className="uppercase">
                  {selectedCryptoData ? selectedCryptoData.symbol : ""}
                </span>
                . {roundedInputValue}{" "}
                <span className="uppercase">
                  {selectedCrypto ? selectedCrypto.symbol : ""}
                </span>{" "}
                have been deducted from your{" "}
                <span className="uppercase">
                  {selectedCrypto ? selectedCrypto.symbol : ""}
                </span>{" "}
                wallet and {roundedEquivalentCryptoValue}{" "}
                <span className="uppercase">
                  {selectedCryptoData ? selectedCryptoData.symbol : ""}
                </span>{" "}
                has been added to your{" "}
                <span className="uppercase">
                  {selectedCryptoData ? selectedCryptoData.symbol : ""}
                </span>{" "}
                wallet
              </p>

              <div
                className="py-[20px] bg-[rgb(32,37,43)] border-[1px] border-[rgb(46,52,59)] rounded-[10px] hidden-for-print h-[100vh]"
                ref={componentRef}
              >
                <div className="flex flex-col justify-center items-center">
                  <div className="my-[15px]">
                    <img
                      src={selectedCrypto ? selectedCrypto.image : ""}
                      alt=""
                      className="w-[50px] block"
                    />
                  </div>

                  <div className="uppercase text-center font-[600] text-white">
                    <p>
                      {selectedCrypto ? selectedCrypto.symbol : ""} swapped to{" "}
                      {selectedCryptoData ? selectedCryptoData.symbol : ""}
                    </p>

                    <p>
                      {inputValue} {selectedCrypto ? selectedCrypto.symbol : ""}
                    </p>
                  </div>
                </div>

                <div className="my-[20px]">
                  <div className="flex justify-between px-[20px] py-[10px] font-[600] text-[17px] text-[rgb(152,177,189)] capitalize border-[1px] border-dotted border-l-0 border-r-0 border-[rgb(46,52,59)]">
                    <p className="">Name</p>

                    <p>
                      {userData.firstName} {userData.lastName}
                    </p>
                  </div>

                  <div className="flex justify-between px-[20px] py-[10px] font-[600] text-[17px] text-[rgb(152,177,189)] capitalize border-[1px] border-dotted border-l-0 border-r-0 border-[rgb(46,52,59)]">
                    <p className="">Description</p>

                    <p>Swapped</p>
                  </div>

                  <div className="flex justify-between px-[20px] py-[10px] font-[600] text-[17px] text-[rgb(152,177,189)] capitalize border-[1px] border-dotted border-l-0 border-r-0 border-[rgb(46,52,59)]">
                    <p className="">Coin type</p>

                    <p>{selectedCrypto ? selectedCrypto.name : ""}</p>
                  </div>

                  <div className="flex justify-between px-[20px] py-[10px] font-[600] text-[17px] text-[rgb(152,177,189)] capitalize border-[1px] border-dotted border-l-0 border-r-0 border-[rgb(46,52,59)]">
                    <p className="">Status</p>

                    <p>Successful</p>
                  </div>

                  <div className="flex justify-between px-[20px] py-[10px] font-[600] text-[17px] text-[rgb(152,177,189)] capitalize border-[1px] border-dotted border-l-0 border-r-0 border-[rgb(46,52,59)]">
                    <p className="">Amount Swapped</p>

                    <p className="uppercase">
                      {roundedInputValue}{" "}
                      {selectedCrypto ? selectedCrypto.symbol : ""}
                    </p>
                  </div>

                  <div className="flex justify-between px-[20px] py-[10px] font-[600] text-[17px] text-[rgb(152,177,189)] capitalize border-[1px] border-dotted border-l-0 border-r-0 border-[rgb(46,52,59)]">
                    <p className="">Amount Received</p>

                    <p className="uppercase">
                      {roundedEquivalentCryptoValue}{" "}
                      {selectedCryptoData ? selectedCryptoData.symbol : ""}
                    </p>
                  </div>

                  <div className="flex justify-between px-[20px] py-[10px] font-[600] text-[17px] text-[rgb(152,177,189)] capitalize border-[1px] border-dotted border-l-0 border-r-0 border-[rgb(46,52,59)]">
                    <p className="">Date</p>

                    <p>{currentDateTime}</p>
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  <img src={CoinVault} alt="" className="block ml-[100px]" />
                </div>
              </div>
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
            <Button
              key="buy"
              className="text-[white] largeDevice:text-black"
              onClick={handleCloseModal}
            >
              Close
            </Button>,
          ]}
        />
      </div>
    </section>
  );
};

export default SwapStatusModal;
