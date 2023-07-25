import React from 'react'
import coinvault from "./DashBoardTopHeader-Image/coin-bg.png";

const DashBoardTopHeader = () => {
  return (
    <nav className="bg-[rgb(28,33,39)] generalDevice:w-[100%] h-[70px] border-b-[1px] border-b-[rgb(125,139,151)] fixed largeDevice:left-[230px] largeDevice:right-0 flex items-center justify-between px-[15px]">
      <div className="largeDevice:hidden mt-[15px]">
        <img src={coinvault} alt="" className="w-[130px] block pr-[10px]" />
      </div>

      <div className="generalDevice:hidden">
        <p>DashBoard</p>
      </div>

      <div className="generalDevice:hidden flex gap-[20px]">
        <div className="flex items-center gap-[10px] bg-[rgb(32,37,43)]  rounded-t-[5px] h-[35px] rounded-b-[5px]">
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
        <div className="cursor-pointer">
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

        <div className="cursor-pointer text-[20px] relative">
          <i className="fa-solid fa-bars-staggered"></i>
          <i className="fa-solid fa-xmark hidden"></i>
        </div>
      </div>
    </nav>
  );
}

export default DashBoardTopHeader