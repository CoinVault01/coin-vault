import React from 'react'
import { Link } from "react-router-dom";

const EmailPassword = ({firstName}) => {
  return (
    <section>
      <div>
        <div className="mb-[30px]">
          <h1 className="text-[25px] font-[600] font-[poppins]">
            Thank you {firstName}👋
          </h1>
          <p className="pb-[5px] text-[25px] font-[600] font-[poppins] capitalize smallerDevice:text-[25px]">
            Enter email and create password
          </p>
        </div>

        <div>
          <div className="mb-[20px]">
            <label
              htmlFor="email"
              className="capitalize text-[rgb(157,166,177)] font-[600] pb-[3px] inline-block"
            >
              email
            </label>

            <div className="border-[1px] border-[rgba(255,255,255,0.2)] rounded-[5px] h-[45px] bg-[rgb(32,37,43)] flex items-center max-w-[400px]">
              <div className="mx-[20px]">
                <i className="fa-solid fa-user text-[rgb(157,166,177)]"></i>
              </div>
              <input
                type="email"
                className="user-input w-[100%] h-[100%] bg-[rgb(32,37,43)] pl-[20px] pb-[3px] pr-[20px] mr-[2px] font-[600]"
                placeholder="e.g Doe"
              />
            </div>
          </div>

          <div className="">
            <label
              htmlFor="password"
              className="capitalize text-[rgb(157,166,177)] font-[600] pb-[3px] inline-block"
            >
              password
            </label>

            <div className="border-[1px] border-[rgba(255,255,255,0.2)] rounded-[5px] h-[45px] bg-[rgb(32,37,43)] flex items-center max-w-[400px]">
              <div className="mx-[20px]">
                <i className="fa-solid fa-user text-[rgb(157,166,177)]"></i>
              </div>
              <input
                type="password"
                className="user-input w-[100%] h-[100%] bg-[rgb(32,37,43)] pl-[20px] pb-[3px] pr-[20px] mr-[2px] font-[600]"
                placeholder="e.g Doe"
              />
            </div>
          </div>
        </div>

        <div className="mt-[40px] max-w-[400px] flex justify-center">
          <button className="form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px]">
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
}

export default EmailPassword