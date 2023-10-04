import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import coinvault from "./DashBoardTopHeader-Image/coin-bg.png";
import axios from "axios";
import "../DashBoardTopHeader/DashBoardTopHeader.css";
import Logout from "../../Pages/LogOut/Logout";
import { RotatingLines } from "react-loader-spinner";

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
  const [toggleNotification, setToggleNotification] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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
      console.log(response.data);
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

  useEffect(() => {
    const fetchNotificationHistory = async () => {
      try {
        const response = await axios.get(
          `https://coinvault.onrender.com/v1/auth/notifications/${userData.userId}`
        );
        setTransactionHistory(response.data);
        console.log(response.data);

        // Calculate the unread count
        const unread = response.data.filter(
          (notification) => notification.status === "unread"
        ).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Error fetching transaction history:", error.message);
      }
    };

    fetchNotificationHistory();
  }, [userData]);

  const handleClickNotification = () => {
    // Send a PUT request to mark all notifications as read
    axios
      .put(
        `https://coinvault.onrender.com/v1/auth/notifications/mark-as-read/${userData.userId}`
      )
      .then(() => {
        // After marking as read, set unreadCount to 0
        setUnreadCount(0);
      })
      .catch((error) => {
        console.error("Error marking notifications as read:", error);
      });
  };

  const totalPages = Math.ceil(transactionHistory.length / itemsPerPage);

  const handleClickNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleClickPrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const renderTransactions = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Reverse the order of transactions to display the most recent ones first
    const reversedTransactions = [...transactionHistory].reverse();

    return reversedTransactions
      .slice(startIndex, endIndex)
      .map((transaction) => (
        <li
          key={transaction._id}
          className="border-[1px] border-[rgb(46,52,59)] w-[85%] mx-auto mt-[20px] rounded-[10px] p-[10px]"
          style={{ color: transaction.status === "failed" ? "red" : "green" }}
        >
          <span
            className={`${
              transaction.messageStatus === "failed"
                ? "text-red-500"
                : "text-green-500"
            } block mb-[5px] capitalize`}
          >
            {transaction.messageStatus}
          </span>

          <span className="text-[rgb(171,171,171)] block mb-[5px]">
            {transaction.message}
          </span>

          <span
            className={`${
              transaction.messageStatus === "failed"
                ? "text-red-500"
                : "text-green-500"
            } block mb-[5px]`}
          >
            {new Date(transaction.date).toLocaleString()}
          </span>
        </li>
      ));
  };

  return (
    <section>
      <nav className="fixed z-40">
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
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="20"
                      visible={true}
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

            <div
              className="cursor-pointer mt-[8px] relative"
              onClick={() => {
                setToggleNotification(true);
              }}
            >
              <abbr title="Notification">
                <i className="fa-regular fa-bell text-[20px]"></i>
              </abbr>

              {unreadCount > 0 && (
                <div className="absolute top-[-5px] left-[16px]">
                  <p className="text-[11px]">{unreadCount}</p>
                </div>
              )}
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
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="20"
                    visible={true}
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

            <div
              className="cursor-pointer relative"
              onClick={() => {
                setToggleNotification(true);
              }}
            >
              <abbr title="Notification">
                <i className="fa-regular fa-bell"></i>
              </abbr>

              {unreadCount > 0 && (
                <div className="absolute top-[-5px] left-[12px]">
                  <p className="text-[11px]">{unreadCount}</p>
                </div>
              )}
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

        <div
          className={`${
            toggleNotification ? "block" : "hidden"
          } fixed top-[69px] w-[100%] aboveBonusDevice:w-[500px] h-[100%] aboveBonusDevice:h-[500px] border-[1px] border-[rgb(125,139,151)] aboveBonusDevice:rounded-t-[0px] aboveBonusDevice:rounded-b-[10px] rounded-t-[15px] aboveBonusDevice:right-[15px] bg-[rgb(28,33,39)]`}
        >
          <div className="flex justify-between items-center px-[20px] pt-[20px] pb-[10px]">
            <div
              className="text-[18px] cursor-pointer"
              onClick={handleClickNotification}
            >
              <p>Mark as read</p>
            </div>

            <div className="text-[20px] text-[rgb(131,207,237)]" onClick={() => {
              setToggleNotification(false);
            }}>
              <i className="fa-solid fa-xmark font-[600] pr-[5px] cursor-pointer"></i>
            </div>
          </div>
          {transactionHistory.length === 0 ? (
            <div className="flex justify-center items-center pt-[240px]">
              <p className="text-[rgb(171,171,171)] font-[600]">
                No Notification Yet
              </p>
            </div>
          ) : (
            <div>
              <div className="h-[470px] aboveBonusDevice:h-[350px] mb-[20px]">
                <ul className="h-full overflow-y-auto side-bar-container">
                  {renderTransactions()}
                </ul>
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center my-[10px]">
                  <button
                    onClick={handleClickPrev}
                    disabled={currentPage === 1}
                    className="mr-2 px-[30px] py-2 bg-blue-500 text-white rounded cursor-pointer"
                  >
                    Prev
                  </button>
                  <button
                    onClick={handleClickNext}
                    disabled={currentPage === totalPages}
                    className="ml-2 px-[30px] py-2 bg-blue-500 text-white rounded cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <div className="">
        <Logout closeLogout={closeLogout} handleLogout={handleLogout} />
      </div>
    </section>
  );
};

export default DashBoardTopHeader;
