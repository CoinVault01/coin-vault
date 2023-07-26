import React, { useState } from 'react'
import coinvault from "./DashBoardTopHeader-Image/coin-bg.png";

const DashBoardTopHeader = ({ showNav, toggleNav }) => {
  const [showAsset, setShowAsset] = useState(false);

  return (
    <nav className="fixed z-50">
      <div className="bg-[rgb(28,33,39)] generalDevice:w-[100%] h-[70px] border-b-[1px] border-b-[rgb(125,139,151)] fixed largeDevice:left-[230px] largeDevice:right-0 flex items-center justify-between px-[15px]">
        <div className="largeDevice:hidden mt-[15px]">
          <img src={coinvault} alt="" className="w-[130px] block pr-[10px]" />
        </div>

        <div className="generalDevice:hidden">
          <p>Home</p>
        </div>

        <div className="generalDevice:hidden flex gap-[20px]">
          <div
            className="flex items-center gap-[10px] bg-[rgb(32,37,43)]  rounded-t-[5px] h-[35px] rounded-b-[5px]"
            onClick={() => {
              setShowAsset(!showAsset);
            }}
          >
            <i className="fa-solid fa-magnifying-glass pl-[5px]"></i>
            <input
              type="text"
              className="border-none outline-none w-[100%] bg-[rgb(32,37,43)] h-[30px]"
              placeholder="Search for assets"
            />
          </div>

          <div className="flex items-center gap-[10px] bg-[rgb(18,23,29)]  rounded-t-[5px] w-[150px] rounded-b-[5px] py-[3px] cursor-pointer">
            <div className="bg-[rgb(255,179,0)] px-[3px] py-[2px] rounded-full cursor-pointer ml-[5px]">
              <p className="font-[600]">GA</p>
            </div>

            <div className="flex items-center gap-[20px]">
              <p>Gabriel...</p>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>

          <div className="cursor-pointer mt-[8px]">
            <abbr title="Notification">
              <i className="fa-regular fa-bell text-[20px]"></i>
            </abbr>
          </div>

          <div className="cursor-pointer mt-[8px]">
            <abbr title="Logout">
              <i className="fa-solid fa-arrow-right-from-bracket text-[20px]"></i>
            </abbr>
          </div>
        </div>

        <div className="largeDevice:hidden flex gap-[20px] items-center">
          <div
            className="cursor-pointer"
            onClick={() => {
              setShowAsset(!showAsset);
            }}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>

          <div className="bg-[rgb(255,179,0)] px-[5px] py-[4px] rounded-full cursor-pointer">
            <p className="font-[600]">GA</p>
          </div>

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
        className={`${
          showAsset ? "block" : "hidden"
        } fixed top-[69px] w-[100%] largeDevice:w-[210px] h-[100%] largeDevice:h-auto border-[1px] border-[rgb(125,139,151)] largeDevice:rounded-t-[0px] largeDevice:rounded-b-[10px] rounded-t-[15px] largeDevice:right-[265px] bg-[rgb(28,33,39)]`}
      >
        <div className="flex items-center gap-[10px] bg-[rgb(32,37,43)]  rounded-t-[8px] w-[95%] mx-auto h-[50px] rounded-b-[8px] mt-[15px] largeDevice:hidden">
          <i className="fa-solid fa-magnifying-glass pl-[10px]"></i>
          <input
            type="text"
            className="border-none outline-none w-[100%] bg-[rgb(32,37,43)] h-[50px] rounded-b-[8px] rounded-t-[8px]"
            placeholder="Search for assets"
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
          <p className="flex items-center gap-[10px] text-[rgb(131,207,237)]">
            <i className="fa-solid fa-magnifying-glass"></i> View all assets
          </p>
        </div>
      </div>
    </nav>
  );
};

export default DashBoardTopHeader