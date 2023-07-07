import React, { useState } from "react";
import coinVault from "./Login-Image/coin-bg.png";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisibility = async () => {
    setPasswordVisible(!passwordVisible);
  };


  return (
    <section className="formAnim bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <div className="w-[90%] max-w-[500px] mx-auto">
        <div className="pt-[50px]">
          <img src={coinVault} alt="" className="inline-block w-[150px]" />
        </div>

        <div className="mt-[15px] mb-[40px]">
          <h1 className="text-[30px] font-[600]">Sign In To CoinVault</h1>
          <p className="text-[rgba(255,255,255,0.5)] font-[600]">
            You’re one step away from something awesome
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

            <div className="">
              <label
                htmlFor="password"
                className="capitalize text-[rgb(157,166,177)] font-[600] pb-[3px] inline-block"
              >
                Password
              </label>

              <div className="max-w-[400px]">
                <div className="border-[1px] border-[rgba(255,255,255,0.2)] rounded-[5px] h-[45px] bg-[rgb(32,37,43)] flex items-center">
                  <div className="mx-[20px]">
                    <i className="fa-solid fa-user text-[rgb(157,166,177)]"></i>
                  </div>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="user-input w-[100%] max-w-[300px] h-[100%] bg-transparent pl-[20px] pb-[3px] pr-[20px] mr-[2px] font-[600]"
                    placeholder="Password"
                  />
                  <div className="relative pt-[15px]">
                    {passwordVisible ? (
                      <i
                        class={`fa-solid fa-eye-slash absolute bottom-0 left-[20px] cursor-pointer`}
                        onClick={handlePasswordVisibility}
                      ></i>
                    ) : (
                      <i
                        class={`fa-solid fa-eye ml-[20px] absolute bottom-0 cursor-pointer`}
                        onClick={handlePasswordVisibility}
                      ></i>
                    )}
                  </div>
                </div>
                <Link
                  to="/forgotpassword"
                  className="block float-right text-[rgb(133,209,240)] font-[600]"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>

          <button className="form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px] max-w-[400px]">
            Sign In
          </button>
        </form>

        <div>
          <p className="pb-[20px] text-[rgba(255,255,255,0.5)]">
            Don’t have an account?{" "}
            <Link to="/signup">
              <span className="text-[rgb(160,210,254)]">Sign up</span>
            </Link>{" "}
            <i className="fa-solid fa-reply-all text-[white]"></i>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
