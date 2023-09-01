import React, { useEffect, useRef, useState } from "react";
import firstCard from "../Wallet/WalletImage/CoinVault-card-1.png";
import usd from "../Wallet/WalletImage/USD.png";
import { ThreeCircles } from "react-loader-spinner";
import { countryData } from "../../CoinDetailsPages/countryData";
import { NavLink } from "react-router-dom";
import axios from "axios";
import TransferPin from "./TransferPin";

const WalletPortfolio = ({ userData }) => {
  const countryRef = useRef(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [countryDropDown, setCountryDropDown] = useState(false);
  const [transactionModal, setTransactionModal] = useState(false);
  const [transactionPinModal, setTransactionPinModal] = useState(false)
  const [convertedBalance, setConvertedBalance] = useState(null);
  const [equivalentAmount, setEquivalentAmount] = useState("");
  const [exchangeRates, setExchangeRates] = useState({});
  const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState({
    code: "USD",
    symbol: "$",
    currency: "USD",
    flag: usd, // Replace with the actual URL for the USD flag
  });

  useEffect(() => {
    async function fetchSelectedCard() {
      try {
        const response = await axios.get(
          `https://coinvault.onrender.com/get-selected-card/${userData.userId}`
        );

        if (response.status === 200) {
          setSelectedCard(response.data.selectedCard);
        }
        if (response.data.selectedCard === null) {
          setSelectedCard(firstCard);
        } else {
          console.error("Failed to fetch selected card");
        }
      } catch (error) {
        console.error("Error fetching selected card:", error);
      }
    }

    fetchSelectedCard();
  }, [userData]);

  useEffect(() => {
    const handleOutsideClick3 = (e) => {
      if (countryRef.current && !countryRef.current.contains(e.target)) {
        setCountryDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick3);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick3);
    };
  }, []);

  useEffect(() => {
    async function fetchExchangeRates() {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/118f2d3db2852914a9aa886e/latest/USD`
        );
        if (response.status === 200) {
          setExchangeRates(response.data.conversion_rates);
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    }
    fetchExchangeRates();
  }, []);

  const handleEquivalentAmountUpdate = (inputValue, exchangeRate) => {
    const convertedInputValue = parseFloat(inputValue.replace(/,/g, ""));
    const equivalentConvertedAmount = convertedInputValue * exchangeRate;
    const formattedEquivalentAmount = equivalentConvertedAmount.toLocaleString(
      undefined,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
    setAmount(inputValue);
    setEquivalentAmount(formattedEquivalentAmount);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const cleanedValue = inputValue.replace(/[^0-9.]/g, ""); // Remove non-numeric characters except dot (.)

    if (cleanedValue === "") {
      setAmount("");
      setEquivalentAmount("");
    } else {
      if (country.currency !== "USD") {
        const exchangeRate = exchangeRates[country.currency];
        if (exchangeRate) {
          handleEquivalentAmountUpdate(cleanedValue, exchangeRate);
        } else {
          console.error("Exchange rate not found for selected country");
        }
      } else {
        handleEquivalentAmountUpdate(cleanedValue, 1);
      }
    }
  };

  const handleCountrySelect = async (selectedCountry) => {
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/118f2d3db2852914a9aa886e/latest/USD`
      );

      if (response.status === 200) {
        const exchangeRates = response.data.conversion_rates;
        const selectedCountryRate = exchangeRates[selectedCountry.currency];

        if (selectedCountryRate) {
          const convertedAmount = userData.balance * selectedCountryRate;
          setConvertedBalance(convertedAmount);

          // Recalculate the equivalent amount based on the new input value and country
          const exchangeRate = exchangeRates[selectedCountry.currency];
          handleEquivalentAmountUpdate(amount, exchangeRate);

          setCountry({
            flag: selectedCountry.flag,
            currency: selectedCountry.currency,
            symbol: selectedCountry.symbol,
          });
          setCountryDropDown(false);
        } else {
          console.error("Exchange rate not found for selected country");
        }
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Get the JWT token from localStorage
      const response = await axios.post(
        "https://coinvault.onrender.com/transfer-funds",
        { receiverAccountNumber, amount, pin },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.log(error.data.message);
    }
  };



  

  return (
    <section>
      <div className="bg-[rgb(32,37,43)] rounded-[8px] w-[90%] mx-auto">
        <div className="mobileDeviceOnly:max-w-[450px] mobileDeviceOnly:mx-auto mobileDeviceOnly:px-[20px] flex flex-col aboveBonusDevice:flex-row aboveBonusDevice:px-[20px]">
          <div className="largeDevice:w-[50%] mobileDeviceOnly:ml-[3rem] mt-[20px] largeDevice:pl-[20px]">
            <h1 className="font-[600]">Total Balance</h1>
            <div className="flex items-center gap-[20px]">
              <p className="text-[30px] font-[600]">
                {country.symbol}
                {convertedBalance !== null && convertedBalance !== undefined
                  ? convertedBalance.toLocaleString()
                  : userData.balance !== null && userData.balance !== undefined
                  ? userData.balance.toLocaleString()
                  : "N/A"}{" "}
                {/* Display "N/A" if values are not available */}
              </p>
              <div className="relative">
                <div
                  className={`border-[rgb(42,48,55)] border-[1px]  rounded-[8px] bg-[rgb(28,33,39)] flex items-center gap-[10px] p-[5px] cursor-pointer w-[100px]`}
                  onClick={() => {
                    setCountryDropDown(true);
                  }}
                >
                  <img src={country.flag} alt="" className="block w-[20px]" />
                  <p>{country.currency}</p>

                  <i className="fa-solid fa-chevron-down"></i>
                </div>
                <div
                  ref={countryRef}
                  className={`${
                    countryDropDown ? "block" : "hidden"
                  } border-[rgb(42,48,55)] border-[1px]  rounded-[8px] bg-[rgb(28,33,39)] w-[100px] absolute z-50`}
                >
                  <ul className="flex flex-col py-[]">
                    {countryData.map((countries) => {
                      return (
                        <li
                          key={countries.code}
                          className="flex items-center gap-[10px] pl-[5px] select-none cursor-pointer border-[rgb(42,48,55)] border-b-[1px]  h-[45px]"
                          onClick={() => handleCountrySelect(countries)}
                        >
                          <img
                            src={countries.flag}
                            alt={countries.name}
                            className="w-[20px]"
                          />
                          <p className="font-[600]">{countries.currency}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <p className="hidden aboveBonusDevice:block max-w-[260px] mt-[10px] text-[rgb(167,177,188)]">
              This is the total value of all your assets at current prices
            </p>
          </div>

          <div className="mt-[20px] mb-[40px] largeDevice:w-[50%] max-w-[350px] mx-auto cursor-pointer">
            {selectedCard ? (
              <div className="relative">
                <img
                  src={selectedCard}
                  alt=""
                  className="w-full rounded-[8px]"
                />
                <p className="user-card-name absolute top-[145px] smallerDevice:top-[100px] bonusDevice:top-[145px] left-[15px] text-[20px] smallDevice:text-[15px] semiSmallDevice:top-[125px] smallerDevice:text-[15px] mediumDevice:top-[148px]">
                  {userData.firstName} {userData.lastName}
                </p>
              </div>
            ) : (
              // Only display the loading spinner if selectedCard is not null
              userData && (
                <div className="flex items-center justify-center max-w-[500px] mx-auto">
                  <ThreeCircles
                    height={50}
                    width={50}
                    color="rgb(160,210,254)"
                    visible={true}
                    ariaLabel="three-circles-rotating"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-evenly my-[30px] pt-[40px] pb-[35px] border-t-[1px] border-b-[1px] border-[rgb(50,56,63)] bg-[rgb(28,33,39)] sticky top-[50px]">
        <div
          className="bg-[rgb(32,37,43)] flex items-center gap-[10px] text-[15px] py-[10px] px-[20px] aboveBonusDevice:py-[10px] aboveBonusDevice:px-[40px] border-[1px] border-[rgb(38,41,50)] rounded-[8px] font-[600] cursor-pointer w-[100px] aboveBonusDevice:w-auto hover:bg-[rgb(18,23,29)]"
          onClick={() => {
            setTransactionModal(true);
          }}
        >
          <i className="fa-solid fa-arrow-right aboveBonusDevice:text-[15px]"></i>
          <p className="aboveBonusDevice:text-[20px]">Send</p>
        </div>

        <NavLink to="/wallet-buy">
          <div className="bg-[rgb(32,37,43)] flex items-center gap-[10px] text-[15px] py-[10px] px-[20px] aboveBonusDevice:py-[10px] aboveBonusDevice:px-[40px] border-[1px] border-[rgb(38,41,50)] rounded-[8px] font-[600] cursor-pointer w-[100px] aboveBonusDevice:w-auto hover:bg-[rgb(18,23,29)]">
            <i className="fa-solid fa-money-check-dollar aboveBonusDevice:text-[15px]"></i>
            <p className="aboveBonusDevice:text-[20px]">Buy</p>
          </div>
        </NavLink>

        <NavLink to="/wallet-sell">
          <div className="bg-[rgb(32,37,43)] flex items-center gap-[10px] text-[15px] py-[10px] px-[20px] aboveBonusDevice:py-[10px] aboveBonusDevice:px-[40px] border-[1px] border-[rgb(38,41,50)] rounded-[8px] font-[600] cursor-pointer w-[100px] aboveBonusDevice:w-auto hover:bg-[rgb(18,23,29)]">
            <i className="fa-solid fa-money-bill aboveBonusDevice:text-[15px]"></i>
            <p className="aboveBonusDevice:text-[20px]">Sell</p>
          </div>
        </NavLink>

        <NavLink
          to="/wallet-swapcoin"
          className={`smallerDevice:hidden smallDevice:hidden mediumDevice:block`}
        >
          <div className="bg-[rgb(32,37,43)] flex items-center gap-[10px] text-[15px] py-[10px] px-[20px] aboveBonusDevice:py-[10px] aboveBonusDevice:px-[40px] border-[1px] border-[rgb(38,41,50)] rounded-[8px] font-[600] cursor-pointer w-[100px] aboveBonusDevice:w-auto hover:bg-[rgb(18,23,29)]">
            <i className="fa-solid fa-shuffle aboveBonusDevice:text-[15px]"></i>
            <p className="aboveBonusDevice:text-[20px]">Swap</p>
          </div>
        </NavLink>
      </div>

      <div
        className={`${
          transactionModal
            ? "bottom-[0px] largeDevice:top-[43%]"
            : "bottom-[999px] largeDevice:top-[100%]"
        } transaction-modal-container bg-[rgb(18,23,29)] fixed left-0 largeDevice:left-[230px] right-0  transition-all ease-in-out duration-[1s] overflow-y-auto`}
      >
        <div className="border-b-[1px] border-[rgb(50,56,63)] py-[10px] mb-[20px]">
          <div className="flex justify-end pr-[10px]">
            <i
              className="fa-solid fa-x cursor-pointer"
              onClick={() => {
                setTransactionModal(false);
              }}
            ></i>
          </div>
          <p className="font-[600] text-center">Send Money</p>
        </div>

        <div className="border-b-[1px] border-[rgb(50,56,63)] py-[10px] mb-[10px] w-[90%] mx-auto">
          <div>
            <p className="font-[600] text-[14px] mb-[5px]">From</p>
            <p>
              Wallet Account {"("} {userData.accountNumber} {")"}
            </p>
          </div>
        </div>

        <div className="border-b-[1px] border-[rgb(50,56,63)] pt-[10px] mb-[20px] w-[90%] mx-auto">
          <div>
            <p className="font-[600] text-[14px] mb-[5px]">To</p>
            <input
              type="text"
              placeholder="Acct Number"
              className="w-full outline-none text-[18px] bg-transparent"
              value={receiverAccountNumber}
              onChange={(e) => {
                const inputValue = e.target.value;
                const cleanedValue = inputValue.replace(/[^0-9]/g, ""); // Remove non-numeric characters

                if (cleanedValue.length <= 10) {
                  setReceiverAccountNumber(cleanedValue);
                }
              }}
            />
          </div>
        </div>

        <div className="border-b-[1px] border-[rgb(50,56,63)] pt-[10px] mb-[20px] w-[90%] mx-auto">
          <div>
            <p className="font-[600] text-[14px] mb-[5px]">Enter Amount</p>
            <div className="flex items-center gap-[2px] text-[18px]">
              <p>$</p>
              <input
                type="text"
                placeholder="Enter Amount"
                value={amount}
                onChange={handleInputChange}
                className="w-full outline-none text-[18px] bg-transparent"
              />
            </div>
          </div>
        </div>

        <div className="border-b-[1px] border-[rgb(50,56,63)] pt-[10px] mb-[20px] w-[90%] mx-auto">
          <div>
            <p className="font-[600] text-[14px] mb-[5px]">Equivalent To</p>
            <div className="flex items-center gap-[2px] text-[18px]">
              <p>{country.symbol}</p>
              <input
                type="text"
                value={equivalentAmount}
                readOnly
                placeholder="Equivalent To"
                className="w-full outline-none text-[18px] bg-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center largeDevice:pr-[]">
          <button
            className="bg-[rgb(8,32,76)] rounded-[10px] py-[10px] mb-[20px] font-[600] block max-w-[500px] w-[90%]"
            onClick={() => {
              setTransactionPinModal(true);
            }}
          >
            Continue
          </button>
        </div>

        <div
          className={`${
            transactionPinModal ? "block" : "hidden"
          } bg-[rgba(0,0,0,0.3)] pt-[10px] generalDevice:pt-[10px] pb-[30px] fixed left-0 largeDevice:left-[230px] right-0 z-[999px] top-[29%] largeDevice:top-[43%] h-[100%]`}
        >
          <div className="flex justify-end pr-[10px] largeDevice:pr-[20px] mb-[100px] largeDevice:mb-[50px]">
            <i
              className="fa-solid fa-x cursor-pointer"
              onClick={() => {
                setTransactionPinModal(false);
              }}
            ></i>
          </div>
          <TransferPin
            pin={pin}
            setPin={setPin}
            handleTransfer={handleTransfer}
            message={message}
          />
        </div>
      </div>
    </section>
  );
};

export default WalletPortfolio;
