import React, { useState } from "react";
import "../SignUp/SignUp.css";
import PinInput from "react-pin-input";

const VerifyEmail = () => {
  const savedEmail = localStorage.getItem("email");

  return (
    <section className="formAnim bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <div className=" w-[90%] max-w-[500px] mx-auto pt-[100px] smallerDevice:pt-[30px]">
        <h1 className="font-[600] text-[32px] smallerDevice:text-[25px] smallDevice:text-[30px] mb-[10px]">
          Verify your email address
        </h1>
        <p className="text-[rgb(157,166,177)] font-[600]">
          A six digit pin has been sent to {savedEmail} enter into this field to
          complete your account creation process
        </p>

        <div className="my-[40px]">
          <label
            htmlFor="password"
            className="capitalize text-[rgb(157,166,177)] font-[600] pb-[10px] pl-[15px] inline-block"
          >
            Enter code
          </label>

          <PinInput
            length={6}
            initialValue=""
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

        <button className="form-btn block w-[80%] max-w-[350px] ml-[20px] font-[600] py-[10px] mb-[20px] rounded-[8px]">
          Verify Email
        </button>

        <button className="block w-[80%] max-w-[350px] ml-[20px] font-[600] py-[10px] mb-[20px] rounded-[8px]">
          Resend Code
        </button>
      </div>
    </section>
  );
};

export default VerifyEmail;
