import React, { useState } from "react";
import "../SectionThree/SectionThree.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { Autoplay, FreeMode } from "swiper";

const SectionThree = () => {
  const [hover, setHover] = useState([
    { id: 1, isOpen: false },
    { id: 2, isOpen: false },
    { id: 3, isOpen: false },
    { id: 4, isOpen: false },
  ]);

  const handleMouseEnter = (id) => {
    const newShowBorder = [...hover];
    const index = newShowBorder.findIndex((item) => item.id === id);
    if (index !== -1) {
      newShowBorder[index].isOpen = true;
      setHover(newShowBorder);
    }
  };

  const handleMouseLeave = (id) => {
    const newShowBorder = [...hover];
    const index = newShowBorder.findIndex((item) => item.id === id);
    if (index !== -1) {
      newShowBorder[index].isOpen = false;
      setHover(newShowBorder);
    }
  };


  return (
    <section className="">
      <div className="flex justify-center">
        <div className="relative py-[15px] inline-block">
          <h1 className="SectionThree-header uppercase font-[600]">
            Why choose us
          </h1>
        </div>
      </div>

      <div className="pb-[40px]">
        <h1 className="text-center text-[40px] generalDevice:text-[30px] font-[600]">
          Why Choose <span className="text-[rgb(0,180,224)]">CoinVault</span>
        </h1>
      </div>

      <div className="max-w-[750px] largeDevice:max-w-[1000px] mx-auto">
        <Swiper
          breakpoints={{
            576: {
              width: 576,
              slidesPerView: 1,
            },
            768: {
              width: 768,
              slidesPerView: 2,
            },
            1001: {
              width: 1001,
              slidesPerView: 3,
            },
          }}
          spaceBetween={0}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, FreeMode]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div
              className="pb-[40px]"
              onMouseEnter={() => {
                handleMouseEnter(hover[0].id);
              }}
              onMouseLeave={() => {
                handleMouseLeave(hover[0].id);
              }}
            >
              <div
                className={`${
                  hover[0].isOpen
                    ? "border-[transparent]"
                    : "border-[rgba(255,255,255,0.2)]"
                } w-[90%] max-w-[500px] mx-auto rounded-t-[10px] rounded-b-[10px] border-[1px] border-[rgba(255,255,255,0.2)] px-[30px] py-[40px] h-[400px] transition duration-500 ease-in-out`}
              >
                <div className="py-[20px]">
                  <i
                    className={`${
                      hover[0].isOpen
                        ? "border-[rgb(0,180,224)]"
                        : "border-[rgba(255,255,255,0.2)]"
                    } fa-solid fa-lock text-[35px] bg-[rgba(255,255,255,0.2)] px-[10px] py-[10px] rounded-full border-[5px] transition duration-500 ease-in-out`}
                  ></i>
                </div>
                <h1 className="text-[28px] capitalize font-[600] pb-[20px] hover:text-[rgb(0,180,224)] transition duration-500 ease-in-out">
                  Protect the identity
                </h1>
                <p className="text-[15px] max-w-[350px] text-[rgba(255,255,255,0.5)]">
                  With <span className="text-[rgb(0,180,224)]">CoinVault</span>{" "}
                  all your biodata are protected from third party users
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="pb-[40px]"
              onMouseEnter={() => {
                handleMouseEnter(hover[1].id);
              }}
              onMouseLeave={() => {
                handleMouseLeave(hover[1].id);
              }}
            >
              <div
                className={`${
                  hover[1].isOpen
                    ? "border-[transparent]"
                    : "border-[rgba(255,255,255,0.2)]"
                } w-[90%] max-w-[500px] mx-auto rounded-t-[10px] rounded-b-[10px] border-[1px] border-[rgba(255,255,255,0.2)] px-[30px] py-[40px] h-[400px] transition duration-500 ease-in-out`}
              >
                <div className="py-[20px]">
                  <i
                    className={`${
                      hover[1].isOpen
                        ? "border-[rgb(0,180,224)]"
                        : "border-[rgba(255,255,255,0.2)]"
                    } fa-regular fa-credit-card text-[35px] bg-[rgba(255,255,255,0.2)] px-[10px] py-[10px] rounded-full border-[5px] transition duration-500 ease-in-out`}
                  ></i>
                </div>
                <h1 className="text-[28px] capitalize font-[600] pb-[20px] hover:text-[rgb(0,180,224)] transition duration-500 ease-in-out">
                  free transaction
                </h1>
                <p className="text-[15px] max-w-[350px] text-[rgba(255,255,255,0.5)]">
                  Enjoy a lifetime free transaction while simulating with{" "}
                  <span className="text-[rgb(0,180,224)]">CoinVault</span>
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="pb-[40px]"
              onMouseEnter={() => {
                handleMouseEnter(hover[2].id);
              }}
              onMouseLeave={() => {
                handleMouseLeave(hover[2].id);
              }}
            >
              <div
                className={`${
                  hover[2].isOpen
                    ? "border-[transparent]"
                    : "border-[rgba(255,255,255,0.2)]"
                } w-[90%] max-w-[500px] mx-auto rounded-t-[10px] rounded-b-[10px] border-[1px] border-[rgba(255,255,255,0.2)] px-[30px] py-[40px] h-[400px] transition duration-500 ease-in-out`}
              >
                <div className="py-[20px]">
                  <i
                    className={`${
                      hover[2].isOpen
                        ? "border-[rgb(0,180,224)]"
                        : "border-[rgba(255,255,255,0.2)]"
                    } fa-solid fa-shield-halved text-[35px] bg-[rgba(255,255,255,0.2)] px-[10px] py-[10px] rounded-full border-[5px] transition duration-500 ease-in-out`}
                  ></i>
                </div>
                <h1 className="text-[28px] capitalize font-[600] pb-[20px] hover:text-[rgb(0,180,224)] transition duration-500 ease-in-out">
                  secured wallet
                </h1>
                <p className="text-[15px] max-w-[350px] text-[rgba(255,255,255,0.5)]">
                  <span className="text-[rgb(0,180,224)]">CoinVault</span>{" "}
                  allows you simulate with ease while providing you a secured
                  wallet
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="pb-[40px]"
              onMouseEnter={() => {
                handleMouseEnter(hover[3].id);
              }}
              onMouseLeave={() => {
                handleMouseLeave(hover[3].id);
              }}
            >
              <div
                className={`${
                  hover[3].isOpen
                    ? "border-[transparent]"
                    : "border-[rgba(255,255,255,0.2)]"
                } w-[90%] max-w-[500px] mx-auto rounded-t-[10px] rounded-b-[10px] border-[1px] border-[rgba(255,255,255,0.2)] px-[30px] py-[40px] h-[400px] transition duration-500 ease-in-out`}
              >
                <div className="py-[20px]">
                  <i
                    className={`${
                      hover[3].isOpen
                        ? "border-[rgb(0,180,224)]"
                        : "border-[rgba(255,255,255,0.2)]"
                    } fa-solid fa-tent-arrow-left-right text-[35px] bg-[rgba(255,255,255,0.2)] px-[10px] py-[10px] rounded-full border-[5px] transition duration-500 ease-in-out`}
                  ></i>
                </div>
                <h1 className="text-[28px] capitalize font-[600] pb-[20px] hover:text-[rgb(0,180,224)] transition duration-500 ease-in-out">
                  fast transaction
                </h1>
                <p className="text-[15px] max-w-[350px] text-[rgba(255,255,255,0.5)]">
                  <span className="text-[rgb(0,180,224)]">CoinVault</span> also
                  provides users with a fast and reliable transaction
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default SectionThree;
