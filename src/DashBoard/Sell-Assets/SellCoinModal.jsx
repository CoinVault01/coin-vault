import React, { useEffect, useState } from "react";
import USD from "../../CoinDetailsPages/CoinDetailsImage/USD.png";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SellStatusModal from "./SellStatusModal";
import SellFailedModal from "./SellFailedModal";

const SellCoinModal = ({ selectedCrypto, userData, setIsModalVisible }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [usdValue, setUsdValue] = useState("");
  const [isMaxClicked, setIsMaxClicked] = useState(false);
  const [sellSuccess, setSellSuccess] = useState(false);
  const [sellFailed, setSellFailed] = useState(false);

  // Function to format a number with commas
  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    // Function to fetch the equivalent value in USD
    const fetchUsdValue = async () => {
      if (!inputValue) {
        setUsdValue("");
        return;
      }

      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCrypto.id}&vs_currencies=usd`
        );
        const priceInUSD = response.data[selectedCrypto.id]?.usd || 0;
        const equivalentUSDValue = priceInUSD * parseFloat(inputValue);
        setUsdValue(formatNumberWithCommas(equivalentUSDValue.toFixed(2)));
      } catch (error) {
        console.error("Error fetching USD value:", error);
      }
    };

    fetchUsdValue();
  }, [selectedCrypto, inputValue]);

  const handleInputChange = (event) => {
    // Ensure the input only accepts numbers
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleMaxClick = () => {
    // Set the input value to the available balance
    if (selectedCrypto) {
      setInputValue(selectedCrypto.amount.toString());
    }
    setIsMaxClicked(true);
  };

  const handleSellClick = async () => {
    setIsLoading(true);

    try {
      // Send a POST request to the backend to buy cryptocurrency
      const response = await axios.post(
        "https://coinvault.onrender.com/v1/auth/sell-crypto",
        {
          coinSymbol: selectedCrypto.id,
          amountToSell: parseFloat(inputValue),
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      // Handle the success response from the backend
      console.log("Cryptocurrency sold successfully:", response.data);

      setSellSuccess(true);

    } catch (error) {
      // Handle errors from the backend
      console.error("Error selling cryptocurrency:", error);
      setSellFailed(true);
    } finally {
      // Reset the loading state
      setIsLoading(false);
    }
  };

  return (
    <section className="border-[1px] border-[rgb(46,52,59)] h-[100%] largeDevice:w-[50%] bg-[rgb(32,37,43)] largeDevice:rounded-[10px] generalDevice:fixed top-[70px] w-full">
      <div className="w-[90%] mx-auto pt-[10px]">
        <div className="flex justify-end text-[25px] text-[rgb(133,209,240)] mb-[10px] largeDevice:hidden">
          <i
            className="fa-solid fa-xmark cursor-pointer"
            onClick={() => {
              setIsModalVisible(false);
              setInputValue("");
              setUsdValue("");
            }}
          ></i>
        </div>

        <div className="mb-[40px]">
          <p className="font-[600] text-[rgb(165,177,189)] mb-[5px]">You Get</p>

          <div
            className={`rounded-[8px] bg-[rgb(28,33,39)] cursor-pointer flex gap-[10px] h-[50px] mb-[10px]`}
          >
            <div className="flex items-center gap-[8px] border-[rgb(42,48,55)] border-r-[2px] pl-[5px] pr-[40px] mr-[-9px]">
              <img src={USD} alt="" className="block w-[30px]" />
              <p className="uppercase font-[600]">USD</p>
            </div>

            <input
              type="text"
              className="h-[100%] w-[100%] block bg-[rgb(28,33,39)] border-none outline-none rounded-[8px] pl-[10px] font-[600]"
              value={usdValue}
              readOnly
              placeholder="You Get"
            />
          </div>
        </div>

        <div className="mb-[40px]">
          <p className="font-[600] text-[rgb(165,177,189)] mb-[5px]">
            You Sell
          </p>

          <div
            className={`rounded-[8px] bg-[rgb(28,33,39)] cursor-pointer flex gap-[10px] h-[50px] mb-[10px]`}
          >
            <div className="flex items-center gap-[8px] border-[rgb(42,48,55)] border-r-[2px] pl-[5px] pr-[40px] mr-[-9px]">
              <img
                src={selectedCrypto ? selectedCrypto.image : ""}
                alt=""
                className="block w-[30px] select-none"
              />
              <p className="uppercase font-[600]">
                {selectedCrypto ? selectedCrypto.symbol : ""}
              </p>
            </div>

            <input
              type="text"
              className="h-[100%] w-[100%] block bg-[rgb(28,33,39)] border-none outline-none rounded-[8px] pl-[10px] font-[600]"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Input amount to sell"
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
                {selectedCrypto ? selectedCrypto.amount.toFixed(3) : ""}
              </span>{" "}
              <span className="uppercase font-[600]">
                {selectedCrypto ? selectedCrypto.symbol : ""}
              </span>
            </p>
          </div>
        </div>

        <button
          className="form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px] mx-auto"
          disabled={isLoading || !inputValue}
          style={{
            opacity: inputValue ? 1 : 0.5,
            cursor: inputValue ? "pointer" : "not-allowed",
          }}
          onClick={handleSellClick}
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
            `Sell ${selectedCrypto ? selectedCrypto.name : ""}`
          )}
        </button>
      </div>

      {sellSuccess && (
        <SellStatusModal
          userData={userData}
          inputValue={inputValue}
          selectedCrypto={selectedCrypto}
          setInputValue={setInputValue}
          setUsdValue={setUsdValue}
        />
      )}

      {sellFailed && (
        <SellFailedModal
          userData={userData}
          inputValue={inputValue}
          selectedCrypto={selectedCrypto}
          setInputValue={setInputValue}
          setUsdValue={setUsdValue}
        />
      )}
    </section>
  );
};

export default SellCoinModal;
