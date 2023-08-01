import React, { useState } from 'react'
import coinvault from "./DashBoardSideNav-Image/coin-bg.png"
import "../DashBoardSideNav/DashBoardSideNav.css";

const DashBoardSideNav = ({ showNav, onNavItemClicked }) => {
  const [active, setActive] = useState([
    { id: 1, isOpen: true },
    { id: 2, isOpen: false },
    { id: 3, isOpen: false },
    { id: 4, isOpen: false },
    { id: 5, isOpen: false },
    { id: 6, isOpen: false },
    { id: 7, isOpen: false },
    { id: 8, isOpen: false },
    { id: 9, isOpen: false },
  ]);

  const handleLinkClick = (id) => {
    const newShowBorder = [...active];
    const index = newShowBorder.findIndex((item) => item.id === id);
    if (index !== -1) {
      newShowBorder[index].isOpen = true;
      for (let i = 0; i < newShowBorder.length; i++) {
        if (i !== index) {
          newShowBorder[i].isOpen = false;
        }
      }
      setActive(newShowBorder);
    }
  };

  return (
    <aside
      className={`${
        showNav ? "" : "generalDevice:right-[-100%]"
      } bg-[rgb(36,39,58)] text-[white] h-[100%] min-h-[100%] overflow-y-auto w-[230px] fixed z-50 generalDevice:top-[70px] generalDevice:right-0 transition-all duration-[1s] ease-in-out`}
    >
      <div>
        <img
          src={coinvault}
          alt=""
          className="w-[150px] generalDevice:hidden block pr-[10px]"
        />
      </div>

      <div className="">
        <p className="text-[rgb(124,138,150)] text-[14px] font-[600] mb-[20px] ml-[10px] generalDevice:mt-[20px]">
          Dashboard
        </p>

        <div className="ml-[20px] mb-[40px] smallerDevice:mb-[15ypx]">
          <ul className="flex flex-col gap-[20px] smallDevice:gap-[25px] smallerDevice:gap-[10px]">
            <li
              className={`${
                active[0].isOpen
                  ? "side-btn text-[white]"
                  : "side-btn-hover text-[rgb(157,168,181)]"
              } text-[18px] font-[600] font-[poppins] cursor-pointer w-[80%] px-[5px] py-[3px] rounded-[8px] transition-all duration-[2s] ease-in-out`}
              onClick={() => {
                handleLinkClick(active[0].id);
                onNavItemClicked("Home");
              }}
            >
              <i className="fa-solid fa-rocket pr-[10px]"></i> Home
            </li>

            <li
              className={`${
                active[1].isOpen
                  ? "side-btn text-[white]"
                  : "side-btn-hover text-[rgb(157,168,181)]"
              } text-[18px] font-[600] font-[poppins] cursor-pointer w-[80%] px-[5px] py-[3px] rounded-[8px] transition-all duration-[2s] ease-in-out`}
              onClick={() => {
                handleLinkClick(active[1].id);
                onNavItemClicked("Buy Assets");
              }}
            >
              {" "}
              <i className="fa-solid fa-money-check-dollar pr-[10px]"></i> Buy
              Assets
            </li>

            <li
              className={`${
                active[2].isOpen
                  ? "side-btn text-[white]"
                  : "side-btn-hover text-[rgb(157,168,181)]"
              } text-[18px] font-[600] font-[poppins] cursor-pointer w-[80%] px-[5px] py-[3px] rounded-[8px] transition-all duration-[2s] ease-in-out`}
              onClick={() => {
                handleLinkClick(active[2].id);
                onNavItemClicked("Sell Assets");
              }}
            >
              <i className="fa-solid fa-money-bill pr-[10px]"></i> Sell Assets
            </li>

            <li
              className={`${
                active[3].isOpen
                  ? "side-btn text-[white]"
                  : "side-btn-hover text-[rgb(157,168,181)] "
              } text-[18px] font-[600] font-[poppins] cursor-pointer w-[80%] px-[5px] py-[3px] rounded-[8px] transition-all duration-[2s] ease-in-out`}
              onClick={() => {
                handleLinkClick(active[3].id);
                onNavItemClicked("Swap Coin");
              }}
            >
              {" "}
              <i className="fa-solid fa-shuffle pr-[10px]"></i> Swap Coin
            </li>

            <li
              className={`${
                active[4].isOpen
                  ? "side-btn text-[white]"
                  : "side-btn-hover text-[rgb(157,168,181)] "
              } text-[18px] font-[600] font-[poppins] cursor-pointer w-[80%] px-[5px] py-[3px] rounded-[8px] transition-all duration-[2s] ease-in-out`}
              onClick={() => {
                handleLinkClick(active[4].id);
                onNavItemClicked("Cards");
              }}
            >
              <i className="fa-regular fa-credit-card pr-[10px]"></i> Cards
            </li>

            <li
              className={`${
                active[5].isOpen
                  ? "side-btn text-[white]"
                  : "side-btn-hover text-[rgb(157,168,181)] "
              } text-[18px] font-[600] font-[poppins] cursor-pointer w-[80%] px-[5px] py-[3px] rounded-[8px] transition-all duration-[2s] ease-in-out`}
              onClick={() => {
                handleLinkClick(active[5].id);
                onNavItemClicked("Wallet");
              }}
            >
              <i className="fa-solid fa-wallet pr-[10px]"></i> Wallet
            </li>

            <li
              className={`${
                active[6].isOpen
                  ? "side-btn text-[white]"
                  : "side-btn-hover text-[rgb(157,168,181)] "
              } text-[18px] font-[600] font-[poppins] cursor-pointer w-[80%] px-[5px] py-[3px] rounded-[8px] transition-all duration-[2s] ease-in-out`}
              onClick={() => {
                handleLinkClick(active[6].id);
                onNavItemClicked("Transactions");
              }}
            >
              <i className="fa-solid fa-swatchbook pr-[10px]"></i> Transactions
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[rgb(124,138,150)] text-[14px] font-[600] mb-[20px] smallerDevice:mb-[5px] ml-[10px]">
            Account
          </p>

          <div className="ml-[20px] pb-[40px]">
            <ul className="flex flex-col gap-[15px]">
              <li
                className={`${
                  active[7].isOpen
                    ? "side-btn text-[white]"
                    : "side-btn-hover text-[rgb(157,168,181)] "
                } text-[18px] font-[600] font-[poppins] cursor-pointer w-[80%] px-[5px] py-[3px] rounded-[8px] transition-all duration-[2s] ease-in-out`}
                onClick={() => {
                  handleLinkClick(active[7].id);
                  onNavItemClicked("Settings");
                }}
              >
                <i class="fa-solid fa-gear pr-[10px]"></i> Settings
              </li>

              <li
                className={`${
                  active[8].isOpen
                    ? "side-btn text-[white]"
                    : "side-btn-hover text-[rgb(157,168,181)] "
                } text-[18px] font-[600] font-[poppins] cursor-pointer w-[80%] px-[5px] py-[3px] rounded-[8px] transition-all duration-[2s] ease-in-out largeDevice:hidden`}
                onClick={() => {
                  handleLinkClick(active[8].id);
                  onNavItemClicked("Logout");
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
  );
};

export default DashBoardSideNav