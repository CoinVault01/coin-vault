import React, { useEffect, useState } from "react";
import USD from "../Buy-Assets/Buy-Assets-Images/USD.png";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BuyCoinModal = ({ selectedCrypto, userData, setIsModalVisible }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [usdAmount, setUsdAmount] = useState("");
  const [cryptoEquivalent, setCryptoEquivalent] = useState("");
  const [cryptoPrice, setCryptoPrice] = useState(null);

  useEffect(() => {
    if (selectedCrypto) {
      // Fetch the current price of the selected cryptocurrency from CoinGecko
      axios
        .get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCrypto.id}&vs_currencies=usd`
        )
        .then((response) => {
          const price = response.data[selectedCrypto.id]?.usd;
          if (price) {
            setCryptoPrice(price);
          }
        })
        .catch((error) => {
          console.error("Error fetching cryptocurrency price:", error);
        });
    }
  }, [selectedCrypto]);

  const calculateCryptoEquivalent = () => {
    if (!usdAmount || !cryptoPrice) {
      setCryptoEquivalent("");
      return;
    }

    const usdValue = parseFloat(usdAmount);
    const cryptoValue = usdValue / cryptoPrice;

    setCryptoEquivalent(cryptoValue.toFixed(3));
  };

  useEffect(() => {
    calculateCryptoEquivalent();
  }, [usdAmount, cryptoPrice]);

  const handleUsdInputChange = (event) => {
    // Use the pattern to allow only numeric characters
    const numericValue = event.target.value.replace(/[^0-9]/g, "");

    setUsdAmount(numericValue);
  };


  const handleBuyClick = async () => {
    setIsLoading(true);

    try {
      // Send a POST request to the backend to buy cryptocurrency
      const response = await axios.post(
        "https://coinvault.onrender.com/v1/auth/buy-crypto",
        {
          coinSymbol: selectedCrypto.id,
          amountToBuy: parseFloat(usdAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Handle the success response from the backend
      console.log("Cryptocurrency purchased successfully:", response.data);

      toast.success(`${selectedCrypto.name} purchased successfully`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // Reset the form and loading state
      setUsdAmount("");
      setCryptoEquivalent("");
    } catch (error) {
      // Handle errors from the backend
      console.error("Error buying cryptocurrency:", error);
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

  return (
    <section className="border-[1px] border-[rgb(46,52,59)] h-[100%] largeDevice:w-[50%] bg-[rgb(32,37,43)] largeDevice:rounded-[10px] generalDevice:fixed top-[70px] w-full">
      <ToastContainer hideProgressBar autoClose={3000} />
      <div className="w-[90%] mx-auto pt-[10px]">
        <div className="flex justify-end text-[25px] text-[rgb(133,209,240)] mb-[10px] largeDevice:hidden">
          <i
            className="fa-solid fa-xmark cursor-pointer"
            onClick={() => {
              setIsModalVisible(false);
            }}
          ></i>
        </div>
        <div className="mb-[40px]">
          <p className="font-[600] text-[rgb(165,177,189)] mb-[5px]">You Get</p>

          <div
            className={`rounded-[8px] bg-[rgb(28,33,39)] cursor-pointer flex gap-[10px] h-[50px] mb-[10px]`}
          >
            <div className="flex items-center gap-[8px] border-[rgb(42,48,55)] border-r-[2px] pl-[5px] pr-[40px] mr-[-9px]">
              <img
                src={selectedCrypto ? selectedCrypto.image : ""}
                alt=""
                className="block w-[30px]"
              />
              <p className="uppercase font-[600]">
                {selectedCrypto ? selectedCrypto.symbol : ""}
              </p>
            </div>

            <input
              type="text"
              className="h-[100%] w-[100%] block bg-[rgb(28,33,39)] border-none outline-none rounded-[8px] pl-[10px] font-[600]"
              value={cryptoEquivalent}
              readOnly
            />
          </div>
        </div>

        <div className="mb-[40px]">
          <p className="font-[600] text-[rgb(165,177,189)] mb-[5px]">
            You Spend
          </p>

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
              value={usdAmount}
              onChange={handleUsdInputChange}
            />
          </div>

          <div className="rounded-[8px] bg-[rgb(51,55,61)] cursor-pointer pl-[10px] py-[10px] max-w-[250px]">
            <p className="text-[13px] font-[600]">
              {" "}
              <span className="text-[rgb(165,177,189)]">
                Available Balance:
              </span>{" "}
              USD {userData.balance.toLocaleString()}
            </p>
          </div>
        </div>

        <button
          className="form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px] mx-auto"
          disabled={isLoading}
          onClick={handleBuyClick}
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
            `Buy ${selectedCrypto ? selectedCrypto.name : ""}`
          )}
        </button>
      </div>
    </section>
  );
};

export default BuyCoinModal;
