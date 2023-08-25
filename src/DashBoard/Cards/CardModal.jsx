import React, { useRef, useState } from "react";
import "./Cards.css";
import firstCard from "../Cards/CardImage/CoinVault-card-1.png";

const CardModal = ({ showCardDetails, setShowCardDetails, selectedCard }) => {
  return (
    <section
      className={`${
        showCardDetails ? "block" : "hidden"
      } flex flex-col justify-center py-[10px]`}
    >
      <div
        className={`border-[1px] bg-[rgb(32,37,43)] border-[rgb(50,56,63)] w-[90%] max-w-[1050px] mx-auto h-[750px] my-[20px] rounded-[8px] largeDevice:h-[500px]`}
      >
        <div className="flex justify-end mb-[20px] py-[10px] pr-[20px] largeDevice:hidden text-[rgb(133,209,240)]">
          <i
            class="fa-solid fa-x cursor-pointer"
            onClick={() => {
              setShowCardDetails(false);
            }}
          ></i>
        </div>

        <div className="flex generalDevice:flex-col largeDevice:justify-between">
          <div className="largeDevice:w-[40%] w-full generalDevice:flex justify-center items-center generalDevice:border-b-[1px] largeDevice:border-r-[1px] border-[rgb(50,56,63)] py-[20px] largeDevice:h-[500px]">
            {selectedCard && (
              <img
                src={selectedCard}
                alt=""
                className="cards-transform-details w-[330px] rounded-[8px]"
              />
            )}
          </div>

          <div className="largeDevice:w-[60%] generalDevice:my-[20px]">
            <div className="flex justify-end mb-[20px] py-[10px] pr-[20px] generalDevice:hidden">
              <i
                class="fa-solid fa-x cursor-pointer text-[rgb(133,209,240)]"
                onClick={() => {
                  setShowCardDetails(false);
                }}
              ></i>
            </div>

            <div className="flex justify-between items-center border-b-[1px] border-[rgb(50,56,63)] pb-[10px] px-[20px] mb-[20px]">
              <h3>Card Type</h3>
              <p>CoinVault Card</p>
            </div>

            <div className="flex justify-between items-center border-b-[1px] border-[rgb(50,56,63)] pb-[10px] px-[20px] mb-[20px]">
              <h3>Account number</h3>
              <p>****************</p>
            </div>

            <div className="flex justify-between items-center border-b-[1px] border-[rgb(50,56,63)] pb-[10px] px-[20px] mb-[20px]">
              <h3>Account Name</h3>
              <p>****************</p>
            </div>

            <div className="flex justify-between items-center border-b-[1px] border-[rgb(50,56,63)] pb-[10px] px-[20px] mb-[20px]">
              <h3>Card Number</h3>
              <p>****************</p>
            </div>

            <div className="flex justify-between items-center largeDevice:border-b-[1px] border-[rgb(50,56,63)] px-[20px] mb-[20px]">
              <h3>CVV</h3>
              <p>***</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardModal;
