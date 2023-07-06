import React, { useState } from "react";
import "../SignUp/SignUp.css";
import { useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();
  const state = location.state;
  console.log(state.email);
  const [pin, setPin] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setPin([...pin.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <section className="formAnim bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <div className=" w-[90%] max-w-[500px] mx-auto pt-[100px] smallerDevice:pt-[30px]">
        <h1 className="font-[600] text-[32px] smallerDevice:text-[25px] smallDevice:text-[30px] mb-[10px]">
          Verify your email address
        </h1>
        <p className="text-[rgb(157,166,177)] font-[600]">
          A six digit pin has been sent to {state.email} enter into this field
          to complete your account creation process
        </p>

        <div className="my-[40px]">
          <label
            htmlFor="password"
            className="capitalize text-[rgb(157,166,177)] font-[600] pb-[10px] inline-block"
          >
            Enter code
          </label>

          <div className="flex gap-[10px]">
            {pin.map((data, index) => {
              return (
                <input
                  key={index}
                  value={data}
                  type="text"
                  maxLength={1}
                  className="pin w-[50px] smallerDevice:w-[40px] h-[40px] text-[white] bg-transparent border rounded-[5px] text-center text-[20px] pb-[3px] font-[600] select-none"
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              );
            })}
          </div>
        </div>

        <button className="form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px]">
          Verify Email
        </button>

        <button className="block w-[100px] mx-auto font-[600] py-[10px] mb-[20px] rounded-[8px]">
          Resend Code
        </button>
      </div>
    </section>
  );
};

export default VerifyEmail;
