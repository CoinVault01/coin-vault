import React, { useState } from 'react'
import { Link } from "react-router-dom";

const Pin = ({ onNext, onPrevious, userFirstName }) => {
   const [pin, setPin] = useState(new Array(4).fill(""));
   const [confirmPin, setConfirmPin] = useState(new Array(4).fill(""));

   const handleChange = (element, index) => {
     if (isNaN(element.value)) return false;

     setPin([...pin.map((d, idx) => (idx === index ? element.value : d))]);

     // Focus next input
     if (element.nextSibling) {
       element.nextSibling.focus();
     }
   };

   const handleChange2 = (element, index) => {
     if (isNaN(element.value)) return false;

     setConfirmPin([
       ...confirmPin.map((d, idx) => (idx === index ? element.value : d)),
     ]);

     // Focus next input
     if (element.nextSibling) {
       element.nextSibling.focus();
     }
   };

   const isContinueDisabled = pin.includes("") || confirmPin.includes("");

   const handleContinueClick = () => {
     if (!isContinueDisabled) {
       onNext(userFirstName);
     }
   };

  return (
    <section className="ml-[20px]">
      <div>
        <div className="mb-[30px]">
          <h1 className="text-[25px] font-[600] font-[poppins] capitalize">
            Thank you {userFirstName} 🚀
          </h1>
          <p className="pb-[5px] text-[25px] font-[600] font-[poppins] capitalize smallerDevice:text-[25px]">
            Create your transaction pin
          </p>
          <p className="text-[rgb(157,166,177)] font-[600] pr-[50px] smallerDevice:pr-[0]">
            Your pin would be used to authenticate your request for transactions
            and authentications.
          </p>
        </div>

        <div>
          <div className="mb-[20px]">
            <label
              htmlFor="password"
              className="capitalize text-[rgb(157,166,177)] font-[600] pb-[10px] inline-block"
            >
              Create Pin
            </label>

            <div className="flex gap-[30px]">
              {pin.map((data, index) => {
                return (
                  <input
                    key={index}
                    value={data}
                    type="text"
                    maxLength={1}
                    className="pin w-[50px] h-[40px] text-[white] bg-transparent border rounded-[5px] text-center text-[20px] pb-[3px] font-[600] select-none"
                    onChange={(e) => {
                      handleChange(e.target, index);
                    }}
                    onFocus={(e) => e.target.select()}
                  />
                );
              })}
            </div>
          </div>

          <div className="mb-[20px]">
            <label
              htmlFor="password"
              className="capitalize text-[rgb(157,166,177)] font-[600] pb-[10px] inline-block"
            >
              Confirm Pin
            </label>

            <div className="flex gap-[30px]">
              {confirmPin.map((data, index) => {
                return (
                  <input
                    key={index}
                    value={data}
                    type="text"
                    maxLength={1}
                    className="pin w-[50px] h-[40px] text-[white] bg-transparent border rounded-[5px] text-center text-[20px] pb-[3px] font-[600] select-none"
                    onChange={(e) => handleChange2(e.target, index)}
                    onFocus={(e) => e.target.select()}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-[40px] max-w-[400px] gap-[5px] flex justify-center">
          <button
            className="form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px]"
            onClick={onPrevious}
          >
            Previous
          </button>

          <button
            className="form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px]"
            onClick={handleContinueClick}
          >
            Continue
          </button>
        </div>

        <div>
          <p className="pb-[20px] text-[rgba(255,255,255,0.5)]">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-[rgb(160,210,254)]">Sign In</span>
            </Link>{" "}
            <i className="fa-solid fa-reply-all text-[white]"></i>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pin