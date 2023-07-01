import React, { useRef, useState } from "react";
import "../SectionTwo/SectionTwo.css";
import Logo from "./SectionTwo-Image/coin-bg.png";
import DashBoardImage from "./SectionTwo-Image/Laptop.png";
import indexFinger from "./SectionTwo-Image/index.png";
import twoFingers from "./SectionTwo-Image/twoFingers.png";
import threeFingers from "./SectionTwo-Image/threeFingers.png";
import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay } from "swiper";

const SectionTwo = () => {
  return (
    <section className="relative z-[0] mb-[40px]">
      <div className="largeDevice:flex justify-center generalDevice:max-w-[750px] mx-auto">
        <div className="generalDevice:w-[100%] generalDevice:max-w-[800px] generalDevice:mx-auto largeDevice:w-[50%]">
          <img
            src={Logo}
            alt=""
            className="block generalDevice:w-[100%] generalDevice:max-w-[600px] largeDevice:w-[600px] generalDevice:mx-auto w-[100%]"
          />
        </div>

        <div className="pb-[40px] generalDevice:mt-[-60px] generalDevice:ml-[25px] largeDevice:mt-[95px] largeDevice:w-[50%] max-w-[500px]">
          <div className="relative inline-block ml-[15px] mb-[20px]">
            <h1 className="about-header font-[600]">WHO WE ARE</h1>
          </div>

          <p className="capitalize text-[35px] font-[600] mb-[30px] largeDevice:px-[5px] smallerDevice:text-[35px]">
            The world's biggest{" "}
            <span className="text-[rgb(0,180,224)]">crypto</span> simulating
            platform
          </p>

          <p className="capitalize font-[600] text-[rgba(255,255,255,0.5)] largeDevice:px-[5px] mb-[40px] max-w-[400px]">
            A platform that provides a simulated environment for trading and
            interacting with cryptocurrencies.
          </p>

          <div className="relative inline-block">
            <button className="about-btn rounded-full border-[2px] border-[rgb(0,180,224)] py-[5px] px-[20px] h-[45px]">
              Get started
            </button>
          </div>
        </div>
      </div>

      <div className="largeDevice:flex gap-[60px] largeDevice:flex-row-reverse  generalDevice:max-w-[750px] largeDevice:px-[20px] mx-auto">
        <div className="generalDevice:w-[100%] generalDevice:max-w-[800px] generalDevice:mx-auto largeDevice:w-[50%]">
          <img
            src={DashBoardImage}
            alt=""
            className="block generalDevice:w-[100%] generalDevice:max-w-[400px] largeDevice:w-[600px] generalDevice:mx-auto w-[100%]"
          />
        </div>

        <div className="pb-[40px] generalDevice:mt-[-60px] generalDevice:ml-[25px] largeDevice:mt-[95px] largeDevice:w-[50%] max-w-[500px]">
          <div className="relative inline-block ml-[35px] mb-[20px]">
            <h1 className="about-header font-[600] uppercase">
              Get started in 3 steps
            </h1>
          </div>

          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            <div className="mb-[px] max-w-[450px]">
              <SwiperSlide>
                <div className="flex mb-[20px]">
                  <div className="w-[50px]">
                    <img src={indexFinger} alt="" className="w-[]" />
                  </div>

                  <div className="flex flex-col">
                    <p className="capitalize text-[30px] font-[600] mb-[10px] largeDevice:px-[5px] smallerDevice:text-[25px]">
                      Create an account
                    </p>
                    <p className="capitalize text-[16px] font-[600] mb-[10px] largeDevice:px-[5px] generalDevice:max-w-[300px] max-w-[350px] text-[rgba(255,255,255,0.5)]">
                      create an account by{" "}
                      <span className="text-[rgb(0,180,224)] cursor-pointer">
                        <Link to="">signing up</Link>
                      </span>{" "}
                      with your email address
                    </p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="flex mb-[20px]">
                  <div className="w-[50px]">
                    <img src={twoFingers} alt="" className="w-[]" />
                  </div>

                  <div className="flex flex-col">
                    <p className="capitalize text-[30px] font-[600] mb-[10px] largeDevice:px-[5px] smallerDevice:text-[25px]">
                      get verified
                    </p>
                    <p className="capitalize text-[16px] font-[600] mb-[10px] largeDevice:px-[5px] generalDevice:max-w-[300px] max-w-[350px] text-[rgba(255,255,255,0.5)]">
                      Get your{" "}
                      <span className="text-[rgb(0,180,224)]">
                        email verified
                      </span>{" "}
                      after a successful registration by clicking on the
                      verification button
                    </p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="flex gap-[5px] mb-[20px]">
                  <div className="w-[50px]">
                    <img src={threeFingers} alt="" className="w-[]" />
                  </div>

                  <div className="flex flex-col">
                    <p className="capitalize text-[30px] font-[600] mb-[10px] largeDevice:px-[5px] smallerDevice:text-[25px]">
                      start trading
                    </p>
                    <p className="capitalize text-[16px] font-[600] mb-[10px] largeDevice:px-[5px] generalDevice:max-w-[300px] max-w-[350px] text-[rgba(255,255,255,0.5)]">
                      Now you have full control over everything on your{" "}
                      <span className="text-[rgb(0,180,224)]">coinVault</span>{" "}
                      wallet
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            </div>
          </Swiper>

          <div className="relative inline-block mt-[20px]">
            <button className="about-btn rounded-full border-[2px] border-[rgb(0,180,224)] py-[5px] px-[20px] h-[45px]">
              Get started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTwo;
