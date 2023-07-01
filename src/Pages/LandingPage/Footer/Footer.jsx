import React from 'react'
import coinVault from "./Footer-Image/coin-bg.png";

const Footer = () => {
  return (
    <footer className="">
      <div className="flex justify-center relative border-t-[1px] border-[rgba(255,255,255,0.2)] w-[90%] mx-auto mb-[40px]">
        <div className="rounded-full border-[1px] border-[rgba(255,255,255,0.2)] inline-block px-[20px] py-[15px] hover:bg-[rgb(0,180,224)] transition-all duration-500 ease-in-out cursor-pointer absolute bottom-[-25px] bg-[rgb(3,11,21)]">
          <i className="fa-solid fa-arrow-up text-[20px]"></i>
        </div>
      </div>

      <div className="mx-[20px] flex generalDevice:flex-col largeDevice:items-center largeDevice:justify-evenly">
        <div className="mb-[60px]">
          <div>
            <img src={coinVault} alt="" className="w-[200px]" />
          </div>

          <div className="mt-[-50px]">
            <p className="ml-[20px] font-[600] text-[rgba(255,255,255,0.5)]">
              The World's Biggest Crypto Simulating Platform
            </p>
          </div>

          <div className="mt-[20px] ml-[20px] flex gap-[20px]">
            <div className="rounded-full border-[2px] border-[rgb(0,180,224)] inline-block px-[12px] py-[6px] hover:bg-[rgb(0,180,224)] transition-all duration-500 ease-in-out cursor-pointer bg-[rgb(3,11,21)]">
              <i class="fa-brands fa-facebook-f"></i>
            </div>

            <div className="rounded-full border-[2px] border-[rgb(0,180,224)] inline-block px-[10px] py-[6px] hover:bg-[rgb(0,180,224)] transition-all duration-500 ease-in-out cursor-pointer bg-[rgb(3,11,21)]">
              <i class="fa-brands fa-twitter"></i>
            </div>

            <div className="rounded-full border-[2px] border-[rgb(0,180,224)] inline-block px-[10px] py-[6px] hover:bg-[rgb(0,180,224)] transition-all duration-500 ease-in-out cursor-pointer bg-[rgb(3,11,21)]">
              <i class="fa-brands fa-linkedin-in"></i>
            </div>

            <div className="rounded-full border-[2px] border-[rgb(0,180,224)] inline-block px-[10px] py-[6px] hover:bg-[rgb(0,180,224)] transition-all duration-500 ease-in-out cursor-pointer bg-[rgb(3,11,21)]">
              <i class="fa-brands fa-github"></i>
            </div>
          </div>
        </div>

        <div className="ml-[20px] mb-[40px]">
          <h1 className="mb-[20px] font-[600] text-[23px]">USEFUL LINKS</h1>

          <div className="flex flex-col">
            <p className="font-[600] cursor-pointer text-[rgba(255,255,255,0.5)] hover:text-[white] inline-block mb-[15px] transition-all duration-500 ease-in-out">
              Home
            </p>

            <p className="font-[600] cursor-pointer text-[rgba(255,255,255,0.5)] hover:text-[white] inline-block mb-[15px] transition-all duration-500 ease-in-out">
              About Us
            </p>

            <p className="font-[600] cursor-pointer text-[rgba(255,255,255,0.5)] hover:text-[white] inline-block mb-[15px] transition-all duration-500 ease-in-out">
              Why Choose Us
            </p>

            <p className="font-[600] cursor-pointer text-[rgba(255,255,255,0.5)] hover:text-[white] inline-block mb-[15px] transition-all duration-500 ease-in-out">
              Contact Us
            </p>

            <p className="font-[600] cursor-pointer text-[rgba(255,255,255,0.5)] hover:text-[white] inline-block mb-[15px] transition-all duration-500 ease-in-out">
              Terms & Conditions
            </p>
          </div>
        </div>
      </div>

      <div className="border-t-[1px] border-[rgba(255,255,255,0.2)] w-[90%] mx-auto">
        <p className='py-[40px] text-center font-[600]'>Copyright © 2023. All Rights Reserved CoinVault</p>
      </div>
    </footer>
  );
}

export default Footer