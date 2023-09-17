import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../Buy-Assets/Buy.css";
import { RotatingLines } from "react-loader-spinner";

const BuyCoinList = ({ userData, setSelectedCrypto, setIsModalVisible }) => {
  const [showGlowingBorder, setShowGlowingBorder] = useState(false);
  const [userCryptoData, setUserCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);
  const divRef = useRef(null);

  function addCommasToNumber(numberString) {
    // Split the string into integer and decimal parts
    const [integerPart, decimalPart] = numberString.split(".");

    // Add commas to the integer part
    const numberWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine integer and decimal parts, and add the decimal part if it exists
    return decimalPart
      ? numberWithCommas + "." + decimalPart
      : numberWithCommas;
  }


  useEffect(() => {
    const fetchUserCryptoData = async () => {
      try {
        const response = await axios.get(
          `https://coinvault.onrender.com/v1/auth/user-crypto-holdings/${userData.userId}`
        );
        setUserCryptoData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user crypto holdings:", error.message);
        setLoading(false);
      }
    };

    fetchUserCryptoData();
  }, [userData]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCoins([]);
    } else {
      const filtered = userCryptoData.filter((coin) => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
          coin.name.toLowerCase().includes(lowerCaseQuery) ||
          coin.symbol.toLowerCase().includes(lowerCaseQuery)
        );
      });
      setFilteredCoins(filtered);
    }
  }, [searchQuery, userCryptoData]);

  const displayCoins = searchQuery ? filteredCoins : userCryptoData;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (divRef.current && !divRef.current.contains(e.target)) {
        setShowGlowingBorder(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="border-[1px] border-[rgb(46,52,59)] h-[100%] largeDevice:w-[50%] bg-[rgb(32,37,43)] largeDevice:rounded-[10px]">
      <div className="border-b-[1px] border-[rgb(46,52,59)] py-[10px] pl-[20px]">
        <h1 className="text-[rgb(165,177,189)] font-[600]">
          Select Assets To Buy
        </h1>
      </div>

      <div className="py-[20px] border-b-[1px] border-[rgb(46,52,59)]">
        <div
          ref={divRef}
          className={`${
            showGlowingBorder ? "glowing-border" : ""
          } flex items-center gap-[10px] bg-[rgb(28,33,39)]  rounded-[20px] h-[45px] mx-[20px]`}
          onClick={() => {
            setShowGlowingBorder(true);
          }}
        >
          <i className="fa-solid fa-magnifying-glass pl-[5px]"></i>
          <input
            type="text"
            className="border-none outline-none w-[90%] bg-[rgb(28,33,39)]  h-[37px]"
            placeholder="Search for assets"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="h-[100vh] largeDevice:h-[480px]">
        {loading ? (
          <div className="w-[30px] mx-auto">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="60"
              visible={true}
            />
          </div>
        ) : (
          <ul className="buy-coin-data h-[100%] overflow-y-auto">
            {displayCoins.map((crypto, index) => (
              <li
                key={index}
                className="flex justify-between border-b-[1px] border-[rgb(46,52,59)] py-[10px] px-[10px] cursor-pointer"
                onClick={() => {
                  setSelectedCrypto(crypto); // Set the selected crypto
                  setIsModalVisible(true);
                }}
              >
                <span className="flex items-center gap-[10px]">
                  <img src={crypto.image} alt="" className="w-[35px]" />
                  <span className="block">
                    <p className="font-[600] text-[15px]">{crypto.name}</p>
                    <p className="text-[rgb(165,177,189)] text-[13px] font-[600] uppercase">
                      {crypto.symbol}
                    </p>
                  </span>
                </span>

                <span className="flex flex-col">
                  <span className="flex items-center gap-[10px]">
                    <p>
                      {Number(crypto.amount).toFixed(3)}{" "}
                      <span className="font-[600] uppercase">
                        {crypto.symbol}
                      </span>
                    </p>
                  </span>

                  <span className="flex justify-end">
                    <p className="text-[rgb(165,177,189)] font-[600]">
                      ${addCommasToNumber(Number(crypto.fiatValue).toFixed(3))}
                    </p>
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default BuyCoinList;
