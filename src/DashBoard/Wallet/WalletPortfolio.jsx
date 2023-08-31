import React, { useEffect, useRef, useState } from "react";
import firstCard from "../Wallet/WalletImage/CoinVault-card-1.png";
import usd from "../Wallet/WalletImage/USD.png";
import { ThreeCircles } from "react-loader-spinner";
import { countryData } from "../../CoinDetailsPages/countryData";
import { NavLink } from "react-router-dom";
import axios from "axios";

const WalletPortfolio = ({ userData }) => {
    const countryRef = useRef(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [countryDropDown, setCountryDropDown] = useState(false);
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

  const handleCountrySelect = (selectedCountry) => {
    setCountry({
      flag: selectedCountry.flag,
      currency: selectedCountry.currency,
      symbol: selectedCountry.symbol
    });
    setCountryDropDown(false);
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
                {userData.balance}
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
                  <ul className="flex flex-col gap-[15px]">
                    {countryData.map((countries) => {
                      return (
                        <li
                          key={countries.code}
                          className="flex items-center gap-[10px] pl-[5px] select-none cursor-pointer border-[rgb(42,48,55)] border-b-[1px] my-[5px]"
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
            <p className="hidden aboveBonusDevice:block max-w-[300px] mt-[10px] text-[rgb(167,177,188)]">
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
                <p className="user-card-name absolute top-[140px] smallerDevice:top-[100px] bonusDevice:top-[120px] left-[15px] text-[20px] smallDevice:text-[15px] smallDevice:top-[130px] smallerDevice:text-[15px] mediumDevice:top-[148px]">
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
        <div className="bg-[rgb(32,37,43)] flex items-center gap-[10px] text-[15px] py-[10px] px-[20px] aboveBonusDevice:py-[10px] aboveBonusDevice:px-[40px] border-[1px] border-[rgb(38,41,50)] rounded-[8px] font-[600] cursor-pointer w-[100px] aboveBonusDevice:w-auto hover:bg-[rgb(18,23,29)]">
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

        <NavLink to="/wallet-swapcoin" className={`smallerDevice:hidden smallDevice:hidden mediumDevice:block`}>
          <div className="bg-[rgb(32,37,43)] flex items-center gap-[10px] text-[15px] py-[10px] px-[20px] aboveBonusDevice:py-[10px] aboveBonusDevice:px-[40px] border-[1px] border-[rgb(38,41,50)] rounded-[8px] font-[600] cursor-pointer w-[100px] aboveBonusDevice:w-auto hover:bg-[rgb(18,23,29)]">
            <i className="fa-solid fa-shuffle aboveBonusDevice:text-[15px]"></i>
            <p className="aboveBonusDevice:text-[20px]">Swap</p>
          </div>
        </NavLink>
      </div>
    </section>
  );
};

export default WalletPortfolio;
