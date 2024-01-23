import React, { useEffect, useState, useRef } from "react";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QrScanner } from "@yudiel/react-qr-scanner";
import "./Wallet.css";

const SendCoinModal = ({ selectedCryptoData, setIsModalVisible }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amountToSend, setAmountToSend] = useState("");
  const [qrScannerVisible, setQrScannerVisible] = useState(false);
  const [isMaxClicked, setIsMaxClicked] = useState(false);

  const handleSendCoin = async () => {
    setIsLoading(true);

    try {
      // Send a POST request to the backend to buy cryptocurrency
      const response = await axios.post(
        "https://coinvault-backend.vercel.app/v1/auth/transfer-crypto",
        {
          receiverCryptoCoinAddress: receiverAddress,
          cryptoAmountToSend: parseFloat(amountToSend),
          CryptoToSend: selectedCryptoData.id,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      toast.success(`${selectedCryptoData.name} sent successfully`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setTimeout(() => {
        window.location.reload();
      }, 1500);

      // Reset the form and loading state
      setReceiverAddress(""); // Reset receiver address
      setAmountToSend(""); // Reset amount
    } catch (error) {
      // Handle errors from the backend
      console.error("Error sending cryptocurrency:", error);
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      // Reset the loading state
      setIsLoading(false);
    }
  };

  const toggleQrScanner = () => {
    setQrScannerVisible(!qrScannerVisible); // Toggle QR scanner visibility
  };

  // Update the receiverAddress state when QR code is decoded
  const handleQrCodeDecode = (result) => {
    setReceiverAddress(result);
    setQrScannerVisible(false); // Hide the QR scanner after successful scan
  };

  const handleMaxClick = () => {
    // Set the input value to the available balance
    if (selectedCryptoData) {
      setAmountToSend(selectedCryptoData.amount.toString());
    }
    setIsMaxClicked(true);
  };

  const isInputsEmpty =
    receiverAddress.trim() === "" || amountToSend.trim() === "";

  return (
    <section>
      <ToastContainer hideProgressBar autoClose={3000} />
      <div
        className={`${
          qrScannerVisible ? "block" : "hidden"
        } largeDevice:hidden`}
      >
        <div className="flex justify-end text-[25px] text-[rgb(133,209,240)] p-[10px]">
          <i
            className="fa-solid fa-xmark cursor-pointer"
            onClick={() => {
              setQrScannerVisible(false);
            }}
          ></i>
        </div>
        <QrScanner
          onDecode={handleQrCodeDecode} // Update the callback
          onError={(error) => console.log(error?.message)}
        />
      </div>

      <div
        className={`${
          qrScannerVisible ? "hidden" : "block"
        } w-[90%] mx-auto pt-[10px]`}
      >
        <div className="flex justify-end text-[25px] text-[rgb(133,209,240)] mb-[10px]">
          <i
            className="fa-solid fa-xmark cursor-pointer"
            onClick={() => {
              setIsModalVisible(false);
            }}
          ></i>
        </div>
        <div className="mb-[40px]">
          <p className="font-[600] text-[rgb(165,177,189)] mb-[5px]">
            {selectedCryptoData ? selectedCryptoData.name : ""} Address
          </p>

          <div
            className={`rounded-[8px] bg-[rgb(28,33,39)] cursor-pointer flex gap-[10px] h-[50px] mb-[10px]`}
          >
            <div className="flex items-center gap-[8px] border-[rgb(42,48,55)] border-r-[2px] pl-[5px] pr-[40px] mr-[-9px]">
              <img
                src={selectedCryptoData ? selectedCryptoData.image : ""}
                alt=""
                className="block w-[30px] select-none"
              />
              <p className="uppercase font-[600]">
                {selectedCryptoData ? selectedCryptoData.symbol : ""}
              </p>
            </div>

            <input
              type="text"
              className="h-[100%] w-[100%] block bg-[rgb(28,33,39)] border-none outline-none rounded-[8px] pl-[10px] font-[600]"
              placeholder="Enter Address"
              value={receiverAddress}
              onChange={(e) => setReceiverAddress(e.target.value)}
            />

            <div
              className="flex items-center bg-[rgb(75,172,211)] rounded-[8px] py-[5px] px-[15px] font-[600] text-[20px] largeDevice:hidden"
              onClick={toggleQrScanner}
            >
              <i className="fa-solid fa-qrcode"></i>
            </div>
          </div>
        </div>

        <div className="mb-[40px]">
          <p className="font-[600] text-[rgb(165,177,189)] mb-[5px]">
            Amount To Send
          </p>

          <div
            className={`rounded-[8px] bg-[rgb(28,33,39)] cursor-pointer flex gap-[10px] h-[50px] mb-[10px]`}
          >
            <input
              type="text"
              className="h-[100%] w-[100%] block bg-[rgb(28,33,39)] border-none outline-none rounded-[8px] pl-[10px] font-[600]"
              placeholder="0000"
              value={amountToSend}
              onChange={(e) => setAmountToSend(e.target.value)}
            />

            <div
              className="flex items-center bg-[rgb(51,55,61)] rounded-[8px] py-[5px] px-[8px] font-[600]"
              onClick={handleMaxClick}
            >
              <p>Max</p>
            </div>
          </div>

          <div className="rounded-[8px] bg-[rgb(51,55,61)] cursor-pointer pl-[10px] py-[10px] max-w-[250px]">
            <p className="text-[13px] font-[600]">
              <span className="text-[rgb(165,177,189)]">
                Available Balance:
              </span>{" "}
              <span>
                {selectedCryptoData && selectedCryptoData.amount.toFixed(3)}
              </span>{" "}
              <span className="uppercase font-[600]"></span>
            </p>
          </div>
        </div>

        <button
          className="form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px] mx-auto"
          disabled={isLoading || isInputsEmpty}
          style={{
            opacity: isInputsEmpty ? 0.5 : 1,
            cursor: isInputsEmpty ? "not-allowed" : "pointer",
          }}
          onClick={handleSendCoin}
        >
          {isLoading ? (
            <div className="w-[30px] mx-auto">
              <ThreeCircles
                height="25"
                width="25"
                color="rgb(160,210,254)"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
              />
            </div>
          ) : (
            <div className="flex justify-center gap-[5px]">
              <span>Send</span>
              <span className="uppercase">
                {selectedCryptoData ? selectedCryptoData.symbol : ""}
              </span>
            </div>
          )}
        </button>
      </div>
    </section>
  );
};

export default SendCoinModal;
