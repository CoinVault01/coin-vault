import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import coinvault from "./DashBoardTopHeader-Image/coin-bg.png";
import axios from "axios";
import "../DashBoardTopHeader/DashBoardTopHeader.css"
import Logout from "../../Pages/LogOut/Logout";
import { ThreeCircles } from "react-loader-spinner";

const DashBoardTopHeader = ({
  showNav,
  toggleNav,
  userData,
  activeLinkText,
}) => {
  const assetRef = useRef(null);
  const [showAsset, setShowAsset] = useState(false);
  const [coins, setCoins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [closeLogout, setCloseLogout] = useState(false);
  const [userProfileData, setUserProfileData] = useState({});

  const handleLogout = () => {
    setCloseLogout(false);
  };

  

  // Handle click outside the div to hide it
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (assetRef.current && !assetRef.current.contains(e.target)) {
        setShowAsset(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleDivClick = () => {
    setShowAsset(!showAsset);
  };

  // Fetch the list of coins from CoinGecko API
  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 100,
            page: 1,
            sparkline: false,
          },
        }
      );
      setCoins(response.data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  // Handle search logic
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCoins([]);
    } else {
      const filtered = coins.filter((coin) => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
          coin.name.toLowerCase().includes(lowerCaseQuery) ||
          coin.symbol.toLowerCase().includes(lowerCaseQuery)
        );
      });
      setFilteredCoins(filtered);
    }
  }, [searchQuery, coins]);

  const handleLinkClick = (coinId) => {
    setShowAsset(false);
    handleSelectCoin(coinId);
    setSearchQuery("");
    // Reload the page after a short delay (optional)
    setTimeout(() => {
      window.location.reload();
    }, 500); // You can adjust the delay as needed.
  };

  return (
    <section>
      <nav className="fixed z-50">
        <div className="bg-[rgb(28,33,39)] generalDevice:w-[100%] h-[70px] border-b-[1px] border-b-[rgb(50,56,63)] fixed largeDevice:left-[230px] largeDevice:right-0 flex items-center justify-between px-[15px]">
          <div className="largeDevice:hidden mt-[15px]">
            <img src={coinvault} alt="" className="w-[130px] block pr-[10px]" />
          </div>

          <div className="generalDevice:hidden">
            <p className="text-[25px] font-[poppins] text-[rgb(165,177,189)]">
              {activeLinkText || "Coin"}
            </p>
          </div>

          <div className="generalDevice:hidden flex gap-[20px]">
            <div
              className={`${
                showAsset ? "glowing-border" : ""
              } flex items-center gap-[10px] bg-[rgb(32,37,43)]  rounded-t-[5px] h-[35px] rounded-b-[5px]`}
              onClick={handleDivClick}
            >
              <i className="fa-solid fa-magnifying-glass pl-[5px]"></i>
              <input
                type="text"
                className="border-none outline-none w-[100%] bg-[rgb(32,37,43)] h-[30px]"
                placeholder="Search for assets"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <NavLink to="/wallet-settings">
              <div className="flex items-center gap-[10px] bg-[rgb(18,23,29)]  rounded-t-[5px] w-[150px] rounded-b-[5px] py-[3px] cursor-pointer">
                {!userData ? (
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
                  <div className="bg-[rgb(255,179,0)] w-[28px] h-[28px] rounded-full flex justify-center items-center cursor-pointer text-[14px]">
                    {userData.profileImage === null ? (
                      <p className="font-[600] uppercase text-[white]">
                        {userData.firstName && userData.firstName.charAt(0)}
                        {userData.lastName && userData.lastName.charAt(0)}
                      </p>
                    ) : (
                      <div className="w-[30px] h-[30px] flex justify-center items-center cursor-pointer">
                        <img
                          src={userData.profileImage}
                          alt=""
                          className="block w-[100%] h-[30px] rounded-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-[20px]">
                  <p className="capitalize font-[poppins]">
                    {userData && userData.firstName}....
                  </p>
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </div>
            </NavLink>

            <div className="cursor-pointer mt-[8px]">
              <abbr title="Notification">
                <i className="fa-regular fa-bell text-[20px]"></i>
              </abbr>
            </div>

            <div
              className="cursor-pointer mt-[8px]"
              onClick={() => {
                setCloseLogout(true);
              }}
            >
              <abbr title="Logout">
                <i className="fa-solid fa-arrow-right-from-bracket text-[20px]"></i>
              </abbr>
            </div>
          </div>

          <div className="largeDevice:hidden flex gap-[20px] items-center">
            <div className="cursor-pointer" onClick={handleDivClick}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>

            <NavLink to="/wallet-settings">
              {!userData ? (
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
                <div className="bg-[rgb(255,179,0)] w-[28px] h-[28px] rounded-full flex justify-center items-center cursor-pointer text-[14px]">
                  {userData.profileImage === null ? (
                    <p className="font-[600] uppercase text-[white]">
                      {userData.firstName && userData.firstName.charAt(0)}
                      {userData.lastName && userData.lastName.charAt(0)}
                    </p>
                  ) : (
                    <div className="w-[30px] h-[30px] flex justify-center items-center cursor-pointer">
                      <img
                        src={userData.profileImage}
                        alt=""
                        className="block w-[100%] h-[30px] rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>
              )}
            </NavLink>

            <div className="cursor-pointer">
              <abbr title="Notification">
                <i className="fa-regular fa-bell"></i>
              </abbr>
            </div>

            <div className="cursor-pointer text-[20px] relative mr-[10px]">
              <i
                className={`${
                  showNav ? "hidden" : "block"
                } fa-solid fa-bars-staggered absolute top-[-10px] left-[-7px]`}
                onClick={toggleNav}
              ></i>
              <i
                className={`${
                  showNav ? "block text-[rgb(133,209,240)]" : "hidden"
                } fa-solid fa-xmark absolute top-[-10px] left-[-5px] font-[600]`}
                onClick={toggleNav}
              ></i>
            </div>
          </div>
        </div>

        <div
          ref={assetRef}
          className={`${
            showAsset ? "block" : "hidden"
          } fixed top-[69px] w-[100%] largeDevice:w-[210px] h-[100%] largeDevice:h-auto border-[1px] border-[rgb(125,139,151)] largeDevice:rounded-t-[0px] largeDevice:rounded-b-[10px] rounded-t-[15px] largeDevice:right-[265px] bg-[rgb(28,33,39)]`}
        >
          <div className="flex items-center gap-[10px] bg-[rgb(32,37,43)]  rounded-t-[8px] w-[95%] mx-auto h-[50px] rounded-b-[8px] mt-[15px] largeDevice:hidden">
            <i className="fa-solid fa-magnifying-glass pl-[10px]"></i>
            <input
              type="text"
              className={`border-none outline-none w-[100%] bg-[rgb(32,37,43)] h-[50px] rounded-b-[8px] rounded-t-[8px]`}
              placeholder="Search for assets"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i
              className={`fa-solid fa-xmark font-[600] pr-[5px] cursor-pointer`}
              onClick={() => {
                setShowAsset(false);
              }}
            ></i>
          </div>

          <div className="mt-[20px] ml-[20px]">
            <p className="mb-[10px]">Assets</p>
            {filteredCoins.length > 0 ? (
              <ul>
                {filteredCoins.map((coin) => (
                  <li key={coin.id}>
                    <Link
                      to={`/coin/${coin.id}`}
                      className="flex items-center gap-[5px] mb-[20px] cursor-pointer"
                      onClick={() => {
                        setShowAsset(false);
                        handleSelectCoin(coin.name);
                        handleLinkClick(coin.id);
                        setSearchQuery("");
                      }}
                    >
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-[25px]"
                      />
                      <span className="capitalize text-[15px]">
                        {coin.name}
                      </span>
                      <span className="uppercase text-[12px] text-[rgb(125,139,151)] font-[600]">
                        {coin.symbol}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="flex items-center gap-[10px] text-[rgb(131,207,237)]">
                <i className="fa-solid fa-magnifying-glass"></i> View all assets
              </p>
            )}
          </div>
        </div>
      </nav>

      <div className="">
        <Logout closeLogout={closeLogout} handleLogout={handleLogout} />
      </div>
    </section>
  );
};

export default DashBoardTopHeader;
