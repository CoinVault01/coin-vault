import React, { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SwapFailedModal from "./SwapFailedModal";
import SwapStatusModal from "./SwapStatusModal";
import useUserCryptoData from "../../Data/useUserCryptoData";

const SwapCoinModal = ({ selectedCrypto, setIsModalVisible }) => {
  const { userData, userCryptoData } = useUserCryptoData();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [equivalentCryptoValue, setEquivalentCryptoValue] = useState("");
  const [isMaxClicked, setIsMaxClicked] = useState(false);
  const [selectedCryptoData, setSelectedCryptoData] = useState(null);
  const [listDropdown, setListDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [swapSuccess, setSwapSuccess] = useState(false);
  const [swapFailed, setSwapFailed] = useState(false);

  const handleCryptoItemClick = (crypto) => {
    setSelectedCryptoData(crypto);
  };

  useEffect(() => {
    if (userCryptoData.length > 0) {
      const randomIndex = Math.floor(Math.random() * userCryptoData.length);
      setSelectedCryptoData(userCryptoData[randomIndex]);
    }
  }, [userCryptoData]);

  useEffect(() => {
    // Make sure selectedCrypto, inputValue, and selectedCryptoData are valid
    if (!selectedCrypto || !inputValue || !selectedCryptoData) {
      setEquivalentCryptoValue("");
      return;
    }

    const fetchEquivalentCryptoValue = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCrypto.id},${selectedCryptoData.id}&vs_currencies=usd`
        );

        // Get the prices in USD
        const priceInSelectedCryptoUSD =
          response.data[selectedCrypto.id]?.usd || 0;
        const priceInSelectedCryptoDataUSD =
          response.data[selectedCryptoData.id]?.usd || 0;

        // Calculate the equivalent value in the selected cryptocurrency
        const equivalent =
          (parseFloat(inputValue) * priceInSelectedCryptoUSD) /
          priceInSelectedCryptoDataUSD;
        setEquivalentCryptoValue(equivalent.toFixed(8)); // Adjust decimal places as needed
      } catch (error) {
        console.error("Error fetching equivalent crypto value:", error.message);
      }
    };

    fetchEquivalentCryptoValue();
  }, [selectedCrypto, inputValue, selectedCryptoData]);

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

  const handleSwapClick = async () => {
    setIsLoading(true);

    try {
      // Send a POST request to the backend to buy cryptocurrency
      const response = await axios.post(
        "https://coinvault-backend.vercel.app/v1/auth/swap-crypto",
        {
          fromCoinSymbol: selectedCrypto.id,
          toCoinSymbol: selectedCryptoData.id,
          amountToSwap: parseFloat(inputValue),
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      setSwapSuccess(true);
    } catch (error) {
      // Handle errors from the backend
      console.error("Error swaping cryptocurrency:", error);
      setSwapFailed(true);
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
            }}
          ></i>
        </div>

        <div className="mb-[40px]">
          <p className="font-[600] text-[rgb(165,177,189)] mb-[5px]">From</p>

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
              placeholder="Input amount to swap"
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

        <div className="mb-[40px]">
          <p className="font-[600] text-[rgb(165,177,189)] mb-[5px]">To</p>

          <div className="relative">
            <div
              className={`rounded-[8px] bg-[rgb(28,33,39)] cursor-pointer flex gap-[10px] h-[50px] mb-[5px]`}
            >
              <div
                className="flex items-center gap-[8px] border-[rgb(42,48,55)] border-r-[2px] pl-[5px] pr-[40px] mr-[-9px]"
                onClick={() => {
                  setListDropdown(true);
                }}
              >
                <img
                  src={selectedCryptoData ? selectedCryptoData.image : ""}
                  alt=""
                  className="block w-[30px]"
                />
                <p className="uppercase font-[600]">
                  {selectedCryptoData ? selectedCryptoData.symbol : ""}
                </p>

                <div>
                  <i class="fa-solid fa-chevron-down"></i>
                </div>
              </div>

              <input
                type="text"
                className="h-[100%] w-[100%] block bg-[rgb(28,33,39)] border-none outline-none rounded-[8px] pl-[10px] font-[600]"
                value={equivalentCryptoValue}
                readOnly
                placeholder="You Get"
              />
            </div>

            <div
              className={`${
                listDropdown ? "block" : "hidden"
              } h-[210px] bg-[rgb(28,33,39)] rounded-[8px] pt-[10px]`}
            >
              <div className="w-[90%] mx-auto mb-[10px] bg-[rgb(32,37,43)]">
                <input
                  type="text"
                  className="w-full bg-transparent pl-[5px] text-[18px] font-[600]"
                  placeholder="Search Assets"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <ul className="sell-coin-data h-[100%] overflow-y-auto">
                {userCryptoData
                  .filter((crypto) =>
                    crypto.name
                      .toLowerCase()
                      .includes(searchInput.toLowerCase())
                  )
                  .map((crypto, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-[10px] border-b-[1px] border-[rgb(46,52,59)] py-[10px] px-[10px] cursor-pointer"
                      onClick={() => {
                        handleCryptoItemClick(crypto);
                        setListDropdown(false);
                        setSearchInput("");
                      }}
                    >
                      <img src={crypto.image} alt="" className="w-[35px]" />
                      <p className="font-[600] text-[18px]">{crypto.name}</p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <button
          className="form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px] mx-auto"
          disabled={isLoading || !inputValue}
          style={{
            opacity: inputValue ? 1 : 0.5,
            cursor: inputValue ? "pointer" : "not-allowed",
          }}
          onClick={handleSwapClick}
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
              <span>Swap</span>
              <span className="uppercase">
                {selectedCrypto ? selectedCrypto.symbol : ""}
              </span>
              <span>to</span>
              <span className="uppercase">
                {selectedCryptoData ? selectedCryptoData.symbol : ""}
              </span>
            </div>
          )}
        </button>
      </div>

      {swapSuccess && (
        <SwapStatusModal
          userData={userData}
          inputValue={inputValue}
          selectedCrypto={selectedCrypto}
          selectedCryptoData={selectedCryptoData}
          setInputValue={setInputValue}
          equivalentCryptoValue={equivalentCryptoValue}
          setEquivalentCryptoValue={setEquivalentCryptoValue}
        />
      )}

      {swapFailed && (
        <SwapFailedModal
          userData={userData}
          inputValue={inputValue}
          selectedCrypto={selectedCrypto}
          selectedCryptoData={selectedCryptoData}
          setInputValue={setInputValue}
          setEquivalentCryptoValue={setEquivalentCryptoValue}
        />
      )}
    </section>
  );
};

export default SwapCoinModal;
