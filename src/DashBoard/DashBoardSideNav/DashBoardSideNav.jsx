import React, { useState } from "react";
import coinvault from "./DashBoardSideNav-Image/coin-bg.png";
import "../DashBoardSideNav/DashBoardSideNav.css";
import {NavLink} from "react-router-dom"
import Logout from "../../Pages/LogOut/Logout";

const DashBoardSideNav = ({ showNav, setActiveLinkText, setShowNav }) => {
  const [closeLogout, setCloseLogout] = useState(false);

  const handleLogout = () => {
    setCloseLogout(false);
  };

  const handleNavLinkClick = (text) => {
    setActiveLinkText(text); // Update the active link text when a NavLink is clicked
  };

  return (
    <section>
      <aside
        className={`${
          showNav ? "" : "generalDevice:right-[-100%]"
        } side-bar-container bg-[rgb(36,39,58)] text-[white] h-[100%] min-h-[100%] overflow-y-auto w-[230px] fixed z-50 generalDevice:top-[70px] generalDevice:right-0 transition-all duration-[1s] ease-in-out`}
      >
        <div>
          <img
            src={coinvault}
            alt=""
            className="w-[150px] generalDevice:hidden block pr-[10px]"
          />
        </div>

        <div className="">
          <p className="text-[rgb(124,138,150)] text-[14px] font-[600] mb-[20px] ml-[10px] smallDevice:mt-[20px]">
            Dashboard
          </p>

          <div className="ml-[20px] mb-[40px] smallerDevice:mb-[15px]">
            <ul className="flex flex-col gap-[20px] smallDevice:gap-[25px] smallerDevice:gap-[10px]">
              <NavLink
                to="/wallet-home"
                className={`side-btn w-[80%] rounded-[8px] `}
                onClick={() => {
                  handleNavLinkClick("Home");
                  setActiveLinkText("Home");
                }}
              >
                <li
                  className={`text-[18px] font-[600] font-[poppins] cursor-pointer px-[5px] py-[3px] transition-all duration-[2s] ease-in-out`}
                >
                  <i className="fa-solid fa-rocket pr-[10px]"></i> Home
                </li>
              </NavLink>

              <NavLink
                to="/wallet-buy"
                className={`side-btn w-[80%] rounded-[8px]`}
                onClick={() => {
                  handleNavLinkClick("Buy Assets");
                  setActiveLinkText("Buy Assets");
                }}
              >
                <li
                  className={`text-[18px] font-[600] font-[poppins] cursor-pointer  px-[5px] py-[3px] rounded-[8px] transition-all duration-[2s] ease-in-out`}
                >
                  {" "}
                  <i className="fa-solid fa-money-check-dollar pr-[10px]"></i>{" "}
                  Buy Assets
                </li>
              </NavLink>

              <NavLink
                to="/wallet-sell"
                className={`side-btn w-[80%] rounded-[8px] `}
                onClick={() => {
                  handleNavLinkClick("Sell Assets");
                  setActiveLinkText("Sell Assets");
                }}
              >
                <li
                  className={` text-[18px] font-[600] font-[poppins] cursor-pointer px-[5px] py-[3px] rounded-[8px] transition-all duration-[2s] ease-in-out`}
                >
                  <i className="fa-solid fa-money-bill pr-[10px]"></i> Sell
                  Assets
                </li>
              </NavLink>

              <NavLink
                to="/wallet-swapcoin"
                className={`side-btn w-[80%] rounded-[8px] `}
                onClick={() => {
                  handleNavLinkClick("Swap Coin");
                  setActiveLinkText("Swap Coin");
                }}
              >
                <li
                  className={`text-[18px] font-[600] font-[poppins] cursor-pointer px-[5px] py-[3px] rounded-[8px] transition-all duration-[2s] ease-in-out`}
                >
                  {" "}
                  <i className="fa-solid fa-shuffle pr-[10px]"></i> Swap Coin
                </li>
              </NavLink>

              <NavLink
                to="/wallet-cards"
                className={`side-btn w-[80%] rounded-[8px] `}
                onClick={() => {
                  handleNavLinkClick("Cards");
                  setActiveLinkText("Cards");
                }}
              >
                <li
                  className={`text-[18px] font-[600] font-[poppins] cursor-pointer  px-[5px] py-[3px] rounded-[8px] transition-all duration-[2s] ease-in-out`}
                >
                  <i className="fa-regular fa-credit-card pr-[10px]"></i> Cards
                </li>
              </NavLink>

              <NavLink
                to="/wallet-wallet"
                className={`side-btn w-[80%] rounded-[8px] `}
                onClick={() => {
                  handleNavLinkClick("Wallet");
                  setActiveLinkText("Wallet");
                }}
              >
                <li
                  className={`text-[18px] font-[600] font-[poppins] cursor-pointer  px-[5px] py-[3px] rounded-[8px] transition-all duration-[2s] ease-in-out`}
                >
                  <i className="fa-solid fa-wallet pr-[10px]"></i> Wallet
                </li>
              </NavLink>

              <NavLink
                to="/wallet-transactions"
                className={`side-btn w-[80%] rounded-[8px] `}
                onClick={() => {
                  handleNavLinkClick("Transactions");
                  setActiveLinkText("Transactions");
                }}
              >
                <li
                  className={`text-[18px] font-[600] font-[poppins] cursor-pointer  px-[5px] py-[3px] rounded-[8px] transition-all duration-[2s] ease-in-out`}
                >
                  <i className="fa-solid fa-swatchbook pr-[10px]"></i>{" "}
                  Transactions
                </li>
              </NavLink>
            </ul>
          </div>

          <div>
            <p className="text-[rgb(124,138,150)] text-[14px] font-[600] mb-[20px] smallerDevice:mb-[5px] ml-[10px]">
              Account
            </p>

            <div className="ml-[20px] pb-[40px]">
              <ul className="flex flex-col gap-[15px] smallerDevice:gap-[0px]">
                <NavLink
                  to="/wallet-settings"
                  className={`side-btn w-[80%] rounded-[8px] `}
                  onClick={() => {
                    handleNavLinkClick("Settings");
                    setActiveLinkText("Settings");
                  }}
                >
                  <li
                    className={`text-[18px] font-[600] font-[poppins] cursor-pointer  px-[5px] py-[3px] rounded-[8px] transition-all duration-[2s] ease-in-out`}
                  >
                    <i class="fa-solid fa-gear pr-[10px]"></i> Settings
                  </li>
                </NavLink>

                <li
                  className={`text-[18px] font-[600] font-[poppins] cursor-pointer  px-[5px] py-[3px] rounded-[8px] transition-all duration-[2s] ease-in-out largeDevice:hidden`}
                  onClick={() => {
                    setCloseLogout(true);
                    setShowNav(false);
                  }}
                >
                  Logout{" "}
                  <i className="fa-solid fa-arrow-right-from-bracket pl-[10px]"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>

      <div className="">
        <Logout closeLogout={closeLogout} handleLogout={handleLogout} />
      </div>
    </section>
  );
};

export default DashBoardSideNav;
