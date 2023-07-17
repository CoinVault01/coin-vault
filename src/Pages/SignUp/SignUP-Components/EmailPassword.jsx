import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";


const EmailPassword = ({
  handleSubmit,
  handleChange,
  handlePrevious,
  user,
  isLoading
}) => {
  const savedfirstName = localStorage.getItem("firstName");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const checkFormValidity = () => {
    const { email, password } = user;
    setIsFormValid(email.trim() !== "" && password.trim() !== "");
  };

  useEffect(() => {
    checkFormValidity();
  }, [user]);

  return (
    <section className="ml-[20px]">
      <div>
        <div className="mb-[30px]">
          <h1 className="text-[25px] font-[600] font-[poppins] capitalize">
            Last Step {savedfirstName} 🚀
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
              Email Address
            </label>

            <div className="border-[1px] border-[rgba(255,255,255,0.2)] rounded-[5px] h-[45px] bg-[rgb(32,37,43)] flex items-center max-w-[400px]">
              <div className="mx-[15px]">
                <i className="fa-solid fa-envelope text-[rgb(157,166,177)]"></i>
              </div>
              <input
                className="user-input w-[100%] h-[100%] bg-[rgb(32,37,43)] pl-[20px] pb-[3px] pr-[20px] mr-[2px] font-[600]"
                placeholder="John@mail.com"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
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
              <div className="border-[1px] border-[rgba(255,255,255,0.2)] rounded-[5px] h-[45px] bg-[rgb(32,37,43)] flex justify-between px-[5px] items-center">
                <div className="flex items-center w-[95%] gap-[10px] h-[100%]">
                  <div className="ml-[10px] smallerDevice:ml-[5px]">
                    <i className="fa-solid fa-user text-[rgb(157,166,177)]"></i>
                  </div>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="user-input w-[100%] smallerDevice:max-w-[200px] h-[100%] bg-transparent pl-[20px] pb-[3px] pr-[20px] mr-[2px] font-[600]"
                    placeholder="Password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative w-[] pt-[15px] pl-[5px]">
                  {passwordVisible ? (
                    <i
                      className="fa-solid fa-eye-slash absolute bottom-0 right-0 inline-block cursor-pointer"
                      onClick={handlePasswordVisibility}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-eye ml-[] absolute bottom-0 right-0 cursor-pointer"
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

        <div className="mt-[40px] max-w-[400px] gap-[5px] flex justify-center">
          <button
            className={`form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px]`}
            onClick={handlePrevious}
          >
            Previous
          </button>
          <button
            className={`form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px] ${
              !isFormValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={!isFormValid}
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
              "Create Account"
            )}
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

export default EmailPassword;
