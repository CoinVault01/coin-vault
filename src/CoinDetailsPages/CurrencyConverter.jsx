import React, { useEffect, useRef, useState } from "react";
import "./CoinDetails.css";
import { countryData } from "./countryData";
import usd from "../CoinDetailsPages/CoinDetailsImage/USD.png";
import { NavLink } from "react-router-dom";

const CurrencyConverter = ({ coinData }) => {
  const inputRef = useRef(null);
  const inputCoinRef = useRef(null);
  const countryRef = useRef(null);
  const [glowingBorder, setGlowingBorder] = useState(false);
  const [glowingBorder2, setGlowingBorder2] = useState(false);
  const [countryDropDown, setCountryDropDown] = useState(false);
  const [country, setCountry] = useState({
    code: "US",
    name: "US Dollar",
    currency: "USD",
    flag: usd,
  });

  // Handle click outside the div to hide it
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
            <div className="mb-[40px] relative">
              <p className="font-[600] text-[rgb(165,177,189)] mb-[5px]">
                Amount
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
                  placeholder="Enter Amount"
                  onClick={() => {
                    handleDivClick();
                  }}
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
                        onClick={() => {
                          setCountry({
                            flag: countries.flag,
                            currency: countries.currency,
                          });
                          setCountryDropDown(false);
                        }}
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

            <div className="mb-[40px]">
              <p className="font-[600] text-[rgb(165,177,189)] mb-[5px]">
                You Get
              </p>

              <div
                ref={inputCoinRef}
                className={`${
                  glowingBorder2
                    ? "glowing-border"
                    : "border-[rgb(42,48,55)] border-[1px]"
                }  rounded-[8px] bg-[rgb(28,33,39)] cursor-pointer flex gap-[10px] h-[50px]`}
              >
                <div className="flex items-center gap-[8px] pl-[5px] pr-[40px] mr-[-9px]">
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
                  onClick={() => {
                    handleDivClick2();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrencyConverter;
