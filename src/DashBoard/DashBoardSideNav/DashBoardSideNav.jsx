import React from 'react'
import coinvault from "./DashBoardSideNav-Image/coin-bg.png"

const DashBoardSideNav = () => {
  return (
    <aside className="bg-[rgb(36,39,58)] text-[white] h-[100%] min-h-[100%] overflow-y-auto w-[230px] fixed generalDevice:top-[70px] generalDevice:right-0">
      <div>
        <img src={coinvault} alt="" className="w-[150px] generalDevice:hidden block pr-[10px]" />
      </div>

      <div className=''>
        <p className="text-[rgb(124,138,150)] text-[14px] font-[600] mb-[20px] ml-[10px] generalDevice:mt-[20px]">
          Dashboard
        </p>

        <div className="ml-[20px] mb-[40px] smallerDevice:mb-[15ypx]">
          <ul className="flex flex-col gap-[20px] smallDevice:gap-[35px] smallerDevice:gap-[10px]">
            <li className="text-[rgb(157,168,181)] text-[18px] font-[600] font-[poppins] cursor-pointer">
              <i className="fa-solid fa-rocket pr-[10px]"></i> Home
            </li>
            <li className="text-[rgb(157,168,181)] text-[18px] font-[600] font-[poppins] cursor-pointer">
              {" "}
              <i className="fa-solid fa-money-check-dollar pr-[10px]"></i> Buy
              Assets
            </li>
            <li className="text-[rgb(157,168,181)] text-[18px] font-[600] font-[poppins] cursor-pointer">
              <i className="fa-solid fa-money-bill pr-[10px]"></i> Sell Assets
            </li>
            <li className="text-[rgb(157,168,181)] text-[18px] font-[600] font-[poppins] cursor-pointer">
              {" "}
              <i className="fa-solid fa-shuffle pr-[10px]"></i> Swap Coin
            </li>
            <li className="text-[rgb(157,168,181)] text-[18px] font-[600] font-[poppins] cursor-pointer">
              <i className="fa-regular fa-credit-card pr-[10px]"></i> Cards
            </li>
            <li className="text-[rgb(157,168,181)] text-[18px] font-[600] font-[poppins] cursor-pointer">
              <i className="fa-solid fa-wallet pr-[10px]"></i> Wallet
            </li>
            <li className="text-[rgb(157,168,181)] text-[18px] font-[600] font-[poppins] cursor-pointer">
              <i className="fa-solid fa-swatchbook pr-[10px]"></i> Transactions
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[rgb(124,138,150)] text-[14px] font-[600] mb-[20px] smallerDevice:mb-[5px] ml-[10px]">
            Account
          </p>

          <div className="ml-[20px] pb-[40px]">
            <ul>
              <li className="text-[rgb(157,168,181)] text-[18px] font-[600] font-[poppins] cursor-pointer">
                <i class="fa-solid fa-gear pr-[10px]"></i> Settings
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default DashBoardSideNav