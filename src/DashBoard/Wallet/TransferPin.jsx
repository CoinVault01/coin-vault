import React, { useState } from "react";
import PinInput from "react-pin-input";
import { ThreeCircles } from "react-loader-spinner";

const TransferPin = ({ pin, setPin, handleTransfer, isLoading }) => {
  return (
    <section className="bg-[rgb(28,33,39)] w-[90%] mx-auto max-w-[500px] rounded-[10px] py-[40px]">
      <div>
        <div className="ml-[15px]">
          <div className="mb-[20px]">
            <label
              htmlFor="password"
              className="capitalize text-[rgb(157,166,177)] font-[600] pb-[10px] pl-[15px] inline-block"
            >
              Transfer Pin
            </label>

            <PinInput
              length={4}
              initialValue={pin}
              onChange={(value) => setPin(value)}
              secret
              secretDelay={100}
              inputMode="number"
              style={{ padding: "10px" }}
              inputStyle={{
                borderColor: "rgba(255,255,255,0.5)",
                borderTopRightRadius: "5px",
                borderTopLeftRadius: "5px",
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px",
                background: "transparent",
                marginRight: "10px",
              }}
              inputFocusStyle={{ borderColor: "rgba(255,255,255,0.5)" }}
              autoSelect={true}
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
            />
          </div>
        </div>

        <div className="flex justify-center largeDevice:pr-[]">
          <button
            className="bg-[rgb(8,32,76)] rounded-[10px] py-[10px] mb-[20px] font-[600] block max-w-[500px] w-[90%]"
            onClick={handleTransfer}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-[30px] mx-auto">
                <ThreeCircles
                  height="25"
                  width="25"
                  color="rgb(160,210,254)"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="three-circles-rotating"
                  outerCircleColor=""
                  innerCircleColor=""
                  middleCircleColor=""
                />
              </div>
            ) : (
              "Transfer"
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TransferPin;
