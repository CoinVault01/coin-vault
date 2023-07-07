import React from 'react'
import coinVault from "./ForgotPassword-Image/coin-bg.png";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <section className="formAnim bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <div className="w-[90%] max-w-[500px] mx-auto">
        <div className="pt-[50px]">
          <img src={coinVault} alt="" className="inline-block w-[150px]" />
        </div>

        <div className="mt-[15px] mb-[40px]">
          <h1 className="text-[30px] font-[600]">Forgot Password?</h1>
          <p className="text-[rgba(255,255,255,0.5)] font-[600] text-[13px]">
            Lost your password? No worries we have you covered
          </p>
        </div>

        <form action="" method="post">
          <div className="mb-[40px]">
            <div className="mb-[20px]">
              <label
                htmlFor="email"
                className="capitalize text-[rgb(157,166,177)] font-[600] pb-[3px] inline-block"
              >
                Email Address
              </label>

              <div className="border-[1px] border-[rgba(255,255,255,0.2)] rounded-[5px] h-[45px] bg-[rgb(32,37,43)] flex items-center max-w-[400px]">
                <div className="mx-[20px]">
                  <i className="fa-solid fa-user text-[rgb(157,166,177)]"></i>
                </div>
                <input
                  type="email"
                  className="user-input w-[100%] h-[100%] bg-[rgb(32,37,43)] pl-[20px] pb-[3px] pr-[20px] mr-[2px] font-[600]"
                  placeholder="John@mail.com"
                />
              </div>
            </div>
          </div>

          <button className="form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px] max-w-[400px]">
            Reset Password
          </button>
        </form>

        <div>
          <p className="pb-[20px] text-[rgba(255,255,255,0.5)]">
            Remember password?{" "}
            <Link to="/login">
              <span className="text-[rgb(160,210,254)]">Log in</span>
            </Link>{" "}
            <i className="fa-solid fa-reply-all text-[white]"></i>
          </p>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword