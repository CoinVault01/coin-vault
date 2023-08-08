import React, { useEffect, useRef, useState } from "react";
import "./CoinDetails.css";
import { countryData } from "./countryData";
import usd from "../CoinDetailsPages/CoinDetailsImage/USD.png";
import { NavLink } from "react-router-dom";
import axios from "axios";

const CurrencyConverter = ({ coinData }) => {
  const inputRef = useRef(null);
  const inputCoinRef = useRef(null);
  const countryRef = useRef(null);
  const [glowingBorder, setGlowingBorder] = useState(false);
  const [glowingBorder2, setGlowingBorder2] = useState(false);
  const [countryDropDown, setCountryDropDown] = useState(false);
  const [country, setCountry] = useState({
    code: "USD",
    name: "US Dollar",
    currency: "USD",
    flag: usd, // Replace with the actual URL for the USD flag
  });
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [fiatAmount, setFiatAmount] = useState(""); // Initialize as an empty string
  const [fiatAmountFetched, setFiatAmountFetched] = useState(false); // Track whether fiat amount is fetched
  const [validCryptoAmount, setValidCryptoAmount] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setGlowingBorder(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick2 = (e) => {
      if (inputCoinRef.current && !inputCoinRef.current.contains(e.target)) {
        setGlowingBorder2(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick2);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick2);
    };
  }, []);

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

  const handleDivClick = () => {
    setGlowingBorder(true);
  };

  const handleDivClick2 = () => {
    setGlowingBorder2(true);
  };

  const handleDivClick3 = () => {
    setCountryDropDown(true);
  };

  const handleCryptoAmountChange = (e) => {
    const { value } = e.target;
    // Remove any non-digit characters from the input value
    const cleanedValue = value.replace(/[^0-9.]/g, "");

    // Check if the cleaned value is a valid numeric value
    const isValid = !isNaN(parseFloat(cleanedValue)) && isFinite(cleanedValue);
    // Update the validCryptoAmount state
    setValidCryptoAmount(isValid);

    // Add commas to the cleaned value for better readability
    const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Update the cryptoAmount state with the formatted value
    setCryptoAmount(formattedValue);
  };

  // ...

  useEffect(() => {
    // Fetch the equivalent fiat amount whenever cryptoAmount or country.currency changes
    if (validCryptoAmount) {
      fetchEquivalentFiatAmountForCountry(cryptoAmount, country.currency);
    } else {
      // If validCryptoAmount is false, reset the fiatAmount and fiatAmountFetched states
      setFiatAmount("");
      setFiatAmountFetched(false);
    }
  }, [cryptoAmount, country.currency, validCryptoAmount]);

  const fetchEquivalentFiatAmountForCountry = async (
    cryptoValue,
    fiatCurrency
  ) => {
    try {
      // Remove commas from the cryptoValue before converting
      const cleanedCryptoValue = cryptoValue.replace(/,/g, "");
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinData.id}&vs_currencies=${fiatCurrency}`
      );
      const cryptoToUsdRate =
        response.data[coinData.id][fiatCurrency.toLowerCase()];
      if (isNaN(cryptoToUsdRate) || isNaN(cleanedCryptoValue)) {
        throw new Error("Invalid API response or input value");
      }
      const equivalentFiatValue =
        parseFloat(cleanedCryptoValue) * cryptoToUsdRate;
      setFiatAmount(equivalentFiatValue.toFixed(2));
      setFiatAmountFetched(true); // Set the fiatAmountFetched state to true on successful fetch
    } catch (error) {
      console.error("Error fetching equivalent fiat amount:", error.message);
      setFiatAmount("");
      setFiatAmountFetched(false); // Set fiatAmountFetched state to false on error
    }
  };

  const handleCountrySelect = (selectedCountry) => {
    setCountry({
      flag: selectedCountry.flag,
      currency: selectedCountry.currency,
    });
    setCountryDropDown(false);
    fetchEquivalentFiatAmountForCountry(cryptoAmount, selectedCountry.currency);
  };

  return (
    <section>
      <div className="w-[90%] mx-auto max-w-[700px] border-[rgb(42,48,55)] border-[1px] py-[20px] rounded-[8px] bg-[rgb(32,37,43)] mb-[50px]">
        <div className="bg-[rgb(28,33,39)] rounded-[8px] w-[95%] mx-auto mb-[20px] py-[10px] px-[10px] flex justify-around items-center gap-[20px]">
          <NavLink
            to="/wallet-buy"
            className="bg-[rgb(39,100,255)] block w-[100%] rounded-[5px] py-[5px] text-center"
          >
            <button>Buy</button>
          </NavLink>
          <NavLink
            to="/wallet-sell"
            className="bg-[rgb(39,100,255)] block w-[100%] rounded-[5px] py-[5px] text-center"
          >
            <button>Sell</button>
          </NavLink>
          <NavLink
            to="/wallet-swapcoin"
            className="bg-[rgb(39,100,255)] block w-[100%] rounded-[5px] py-[5px] text-center"
          >
            <button>Swap</button>
          </NavLink>
        </div>

        <div className="border-t-[1px] border-[rgb(50,56,63)]">
          <div className="w-[90%] mx-auto max-w-[] mt-[20px]">
            <div className="mb-[40px]">
              <p className="font-[600] text-[rgb(165,177,189)] mb-[5px]">
                Amount
              </p>

              <div
                ref={inputCoinRef}
                className={`${
                  glowingBorder2
                    ? "glowing-border"
                    : "border-[rgb(42,48,55)] border-[1px]"
                }  rounded-[8px] bg-[rgb(28,33,39)] cursor-pointer flex gap-[10px] h-[50px]`}
              >
                <div className="flex items-center gap-[8px] pl-[5px] pr-[60px] mr-[-9px]">
                  <img
                    src={coinData && coinData.image.large}
                    alt={coinData && coinData.name}
                    className="block w-[30px]"
                  />
                  <p className="uppercase font-[600]">
                    {coinData && coinData.symbol}
                  </p>
                </div>

                <input
                  type="text"
                  className="h-[100%] w-[100%] block bg-[rgb(28,33,39)] border-none outline-none rounded-[8px] pl-[10px] font-[600]"
                  placeholder="Enter Amount"
                  onClick={() => {
                    handleDivClick2();
                  }}
                  value={cryptoAmount}
                  onChange={handleCryptoAmountChange}
                />
              </div>
            </div>

            <div className="mb-[40px] relative">
              <p className="font-[600] text-[rgb(165,177,189)] mb-[5px]">
                You Get
              </p>

              <div
                ref={inputRef}
                className={`${
                  glowingBorder
                    ? "glowing-border"
                    : "border-[rgb(42,48,55)] border-[1px]"
                }  rounded-[8px] bg-[rgb(28,33,39)] cursor-pointer flex gap-[10px] h-[50px] mb-[10px]`}
              >
                <div
                  className="flex items-center gap-[8px] border-[rgb(42,48,55)] border-r-[2px] pl-[5px] pr-[40px] mr-[-9px]"
                  onClick={() => {
                    handleDivClick3();
                  }}
                >
                  <img src={country.flag} alt="" className="block w-[30px]" />
                  <p className="uppercase font-[600]">{country.currency}</p>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>

                <input
                  type="text"
                  className="h-[100%] w-[100%] block bg-[rgb(28,33,39)] border-none outline-none rounded-[8px] pl-[10px] font-[600]"
                  placeholder={
                    fiatAmountFetched && validCryptoAmount
                      ? "Equivalent Amount"
                      : "Enter Amount"
                  } // Show "Enter Amount" when cryptoAmount is empty or not a valid number, or show "Equivalent Amount" if fetched
                  value={
                    fiatAmountFetched && validCryptoAmount
                      ? parseFloat(fiatAmount).toLocaleString()
                      : ""
                  }
                  readOnly
                />
              </div>

              <div
                ref={countryRef}
                className={`${
                  countryDropDown ? "block" : "hidden"
                } border-[rgb(42,48,55)] border-[1px]  rounded-[8px] bg-[rgb(28,33,39)] py-[10px] flex gap-[10px] relative`}
              >
                <ul className="flex flex-col gap-[15px] ml-[10px]">
                  {countryData.map((countries) => {
                    return (
                      <li
                        key={countries.code}
                        className="flex gap-[10px] select-none cursor-pointer"
                        onClick={() => handleCountrySelect(countries)}
                      >
                        <img
                          src={countries.flag}
                          alt={countries.name}
                          className="w-[25px]"
                        />
                        <p className="font-[600] text-[15px]">
                          {countries.name}
                        </p>
                        <p className="font-[600] text-[12px] text-[rgb(165,177,189)]">
                          {countries.currency}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrencyConverter;
