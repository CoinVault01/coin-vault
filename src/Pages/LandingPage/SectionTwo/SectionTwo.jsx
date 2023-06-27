import React from 'react'
import "../SectionTwo/SectionTwo.css";
import Logo from "./SectionTwo-Image/coin-bg.png"


const SectionTwo = () => {
  return (
    <section className="">
      <div className="largeDevice:flex generalDevice:max-w-[750px] mx-auto">
        <div className="generalDevice:w-[100%] generalDevice:max-w-[800px] generalDevice:mx-auto largeDevice:w-[50%]">
          <img
            src={Logo}
            alt=""
            className="block generalDevice:w-[100%] generalDevice:max-w-[600px] largeDevice:w-[600px] generalDevice:mx-auto w-[100%]"
          />
        </div>

        <div className="pb-[40px] generalDevice:mt-[-60px] generalDevice:ml-[40px] largeDevice:mt-[95px] largeDevice:w-[50%] max-w-[500px]">
          <div className="relative inline-block ml-[15px] mb-[20px]">
            <h1 className="about-header font-[600]">WHO WE ARE</h1>
          </div>

          <p className="capitalize text-[40px] font-[600] mb-[30px] largeDevice:px-[5px]">
            The world's biggest{" "}
            <span className="text-[rgb(0,180,224)]">crypto</span> simulating
            platform
          </p>

          <p className="capitalize font-[600] text-[rgba(255,255,255,0.5)] largeDevice:px-[5px] mb-[40px]">
            A platform that provides a simulated environment for trading and
            interacting with cryptocurrencies.
          </p>

          <div className='relative inline-block'>
            <button className="about-btn rounded-full border-[2px] border-[rgb(0,180,224)] py-[5px] px-[20px] h-[45px]">
              Get started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionTwo