import React, { useState } from "react";
import { Link } from "react-router-dom";

const LegalName = ({ onNext, onPrevious, userName }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleInputChange1 = (event) => {
    const inputValue = event.target.value.replace(/[^a-zA-Z]/g, "");
    setFirstName(inputValue);
  };

  const handleInputChange2 = (event) => {
    const inputValue = event.target.value.replace(/[^a-zA-Z]/g, "");
    setLastName(inputValue);
  };

  const isContinueDisabled = firstName === "" || lastName === "";

  const handleContinueClick = () => {
    if (!isContinueDisabled) {
      onNext(firstName);
    }
  };

  return (
    <section className="ml-[20px]">
      <div>
        <div className="mb-[30px]">
          <h1 className="text-[25px] font-[600] font-[poppins] capitalize">
            Hey {userName}👋
          </h1>
          <p className="pb-[5px] text-[25px] font-[600] font-[poppins] capitalize smallerDevice:text-[25px]">
            Please give us your legal name
          </p>
        </div>

        <div>
          <div className="mb-[20px]">
            <label
              htmlFor="firstName"
              className="capitalize text-[rgb(157,166,177)] font-[600] pb-[3px] inline-block"
            >
              First Name
            </label>

            <div className="border-[1px] border-[rgba(255,255,255,0.2)] rounded-[5px] h-[45px] bg-[rgb(32,37,43)] flex items-center max-w-[400px]">
              <div className="mx-[20px]">
                <i className="fa-solid fa-user text-[rgb(157,166,177)]"></i>
              </div>
              <input
                type="text"
                id="firstName"
                className="user-input w-[100%] h-[100%] bg-[rgb(32,37,43)] pl-[20px] pb-[3px] pr-[20px] mr-[2px] font-[600] capitalize"
                placeholder="John"
                onChange={handleInputChange1}
                value={firstName}
              />
            </div>
          </div>

          <div className="">
            <label
              htmlFor="lastName"
              className="capitalize text-[rgb(157,166,177)] font-[600] pb-[3px] inline-block"
            >
              Last Name
            </label>

            <div className="border-[1px] border-[rgba(255,255,255,0.2)] rounded-[5px] h-[45px] bg-[rgb(32,37,43)] flex items-center max-w-[400px]">
              <div className="mx-[20px]">
                <i className="fa-solid fa-user text-[rgb(157,166,177)]"></i>
              </div>
              <input
                type="text"
                id="lastName"
                className="user-input w-[100%] h-[100%] bg-[rgb(32,37,43)] pl-[20px] pb-[3px] pr-[20px] mr-[2px] font-[600] capitalize"
                placeholder="Doe"
                onChange={handleInputChange2}
                value={lastName}
              />
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
            disabled={isContinueDisabled}
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

export default LegalName;