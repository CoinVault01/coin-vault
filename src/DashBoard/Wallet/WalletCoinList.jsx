import React, { useState, useEffect } from "react";

const WalletCoinList = ({
  userCryptoData,
  setSelectedCryptoData,
  setIsModalVisible,
}) => {
  const [sortBy, setSortBy] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("Alphabet");
  const [sortedData, setSortedData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    // Create a copy of userCryptoData to avoid mutating the original data
    const dataCopy = [...userCryptoData];

    if (selectedSortOption === "Balance") {
      // Sort the copy by crypto.amount in descending order
      dataCopy.sort((a, b) => b.amount - a.amount);
    } else if (selectedSortOption === "Alphabet") {
      // Sort the copy alphabetically by crypto.name
      dataCopy.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Set the sorted data in the state
    setSortedData(dataCopy);
  }, [selectedSortOption, userCryptoData]);

  // Function to filter data based on search input
  const filteredData = sortedData.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchInput.toLowerCase())
    
  );

  const handleSortOptionClick = (option) => {
    setSelectedSortOption(option);
    setSortBy(false);
  };

  return (
    <section className="border-[1px] border-[rgb(46,52,59)] largeDevice:w-[50%] w-[90%] generalDevice:mx-auto rounded-[10px] bg-[rgb(32,37,43)]">
      <div className="flex justify-between  px-[18px] pt-[30px]">
        <div className="mt-[5px]">
          <p className="font-[600] text-[20px]">Assets</p>
        </div>

        <div className="flex gap-[5px]">
          <div className="mt-[8px]">
            <p className="font-[600]">Sort by:</p>
          </div>

          <div>
            <div
              className="flex items-center gap-[15px] bg-[rgb(28,33,39)] border-[1px] border-[rgb(38,41,50)] rounded-[8px] p-[8px] cursor-pointer font-[600]"
              onClick={() => {
                setSortBy(!sortBy);
              }}
            >
              <p>{selectedSortOption}</p>
              <i className="fa-solid fa-chevron-down"></i>
            </div>

            <div
              className={`${
                sortBy ? "block" : "hidden"
              } bg-[rgb(28,33,39)] border-[1px] border-[rgb(20,30,60)] rounded-[8px] cursor-pointer font-[600]`}
            >
              <ul
                className=""
                onClick={() => {
                  setSortBy(false);
                }}
              >
                <li
                  className="border-b-[1px] border-[rgb(38,41,50)] pl-[8px] py-[5px] cursor-pointer"
                  onClick={() => handleSortOptionClick("Alphabet")}
                >
                  Alphabet
                </li>
                <li
                  className="py-[5px] pl-[8px] cursor-pointer"
                  onClick={() => handleSortOptionClick("Balance")}
                >
                  Balance
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-[20px] pb-[30px] ">
        <div
          className={`flex items-center gap-[10px] bg-[rgb(28,33,39)]  rounded-[20px] h-[45px] mx-[20px]`}
        >
          <i className="fa-solid fa-magnifying-glass pl-[5px]"></i>
          <input
            type="text"
            className="border-none outline-none w-[90%] bg-[rgb(28,33,39)]  h-[37px]"
            placeholder="Search for assets"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <div className="">
        <ul className="flex items-center justify-between border-b-[1px] border-[rgb(46,52,59)] px-[18px] pb-[20px]">
          <li className="w-[37%] generalDevice:w-[36%] text-[rgb(165,177,189)] font-[600]">
            Name
          </li>
          <li className="w-[21%] generalDevice:w-[24%] text-[rgb(165,177,189)] font-[600]">
            Balance
          </li>
          <li className="w-[21%] generalDevice:w-[24%] text-[rgb(165,177,189)] font-[600]">
            Fiat Value
          </li>
          <li className="mobileDeviceOnly:hidden w-[21%] text-[rgb(165,177,189)] font-[600]">
            24h Change
          </li>
        </ul>

        <ul className="sell-coin-data h-[500px] overflow-y-auto">
          {filteredData.map((crypto, index) => (
            <li
              key={index}
              className="flex items-center justify-between cursor-pointer w-full pl-[10px] border-b-[1px] border-[rgb(46,52,59)]"
              onClick={() => {
                setSelectedCryptoData(crypto);
                setIsModalVisible(true);
              }}
            >
              <span className="flex items-center gap-[5px] py-[15px] w-[40%]">
                <img
                  src={crypto.image}
                  alt=""
                  className="w-[35px] select-none"
                />
                <span className="font-[600]">{crypto.name}</span>
              </span>

              <span className="block w-[20%]">{crypto.amount.toFixed(2)}</span>

              <span className="block w-[20%]">
                ${crypto.fiatValue.toFixed(2)}
              </span>
              <span
                className="block w-[20%] mobileDeviceOnly:hidden"
                style={{
                  color:
                    crypto.price_change_percentage_24h < 0
                      ? "red"
                      : "rgb(14, 203, 129)",
                }}
              >
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WalletCoinList;
