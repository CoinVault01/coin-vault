import React from 'react'
import coinvault from "./DashBoardTopHeader-Image/coin-bg.png";

const DashBoardTopHeader = () => {
  return (
    <nav className="bg-[rgb(28,33,39)] h-[70px] w-[100%] largeDevice:ml-[230px] border-b-[1px] border-b-[rgb(125,139,151)] fixed flex justify-between items-center px-[15px]">
      <div className="largeDevice:hidden mt-[15px]">
        <img src={coinvault} alt="" className="w-[130px] block pr-[10px]" />
      </div>

      <div className="generalDevice:hidden">
        <p>DashBoa</p>
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