import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper";
import "./Cards.css"
import firstCard from "../Cards/CardImage/CoinVault-card-1.png";
import secondCard from "../Cards/CardImage/CoinVault-card-2.png";
import thirdCard from "../Cards/CardImage/CoinVault-card-3.png";
import fourthCard from "../Cards/CardImage/CoinVault-card-4.png";
import fifthCard from "../Cards/CardImage/CoinVault-card-5.png";

const CardDesign = () => {
  return (
    <section className="flex justify-center">
      <div
        className={`border-[1px] bg-[rgb(32,37,43)] border-[rgb(50,56,63)] w-[90%] max-w-[1050px] mx-auto  my-[20px] rounded-[8px]`}
      >
        <div className="my-[20px]">
          <img
            src={firstCard}
            alt=""
            className="w-[80%] max-w-[350px] mx-auto rounded-[8px]"
          />
        </div>

        <div className="smallDevice:w-[65%] smallerDevice:w-[63%] mx-auto max-w-[350px]  mb-[40px]">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="">
                <img
                  src={firstCard}
                  alt=""
                  className="cards-transform w-[330px] rounded-[8px]"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="">
                <img
                  src={secondCard}
                  alt=""
                  className="cards-transform w-[330px] rounded-[8px]"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="">
                <img
                  src={thirdCard}
                  alt=""
                  className="cards-transform w-[330px] rounded-[8px]"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="">
                <img
                  src={fourthCard}
                  alt=""
                  className="cards-transform w-[330px] rounded-[8px]"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="">
                <img
                  src={fifthCard}
                  alt=""
                  className="cards-transform w-[330px] rounded-[8px]"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CardDesign;
