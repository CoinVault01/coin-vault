import React, { useState } from "react";
import coinVault from "./ResetPassword-Image/coin-bg.png";
import "./ResetPassword.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";

const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      // Call the backend API to reset the password
      const response = await axios.post(
        "https://coinvault.onrender.com/v1/auth/reset-password",
        {
          token,
          password,
          confirmPassword,
        }
      );

      setIsLoading(false);

      // Display success message from the backend
      toast.success(response.data.message, {
          // Toast success message
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",});

      // Navigate to the login page after successful password reset
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setIsLoading(false);

      // Display error message from the backend
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error, {
          // Toast success message
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error("An error occurred. Please try again.", {
          // Toast success message
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  return (
    <section className="formAnim bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <ToastContainer hideProgressBar autoClose={3000} />
      <div className="w-[90%] max-w-[500px] mx-auto">
        <div className="pt-[50px]">
          <img src={coinVault} alt="" className="inline-block w-[150px]" />
        </div>

        <div className="mt-[15px] mb-[40px]">
          <h1 className="text-[30px] font-[600]">Set new password</h1>
          <p className="text-[rgba(255,255,255,0.5)] font-[600]">
            Kindly enter and set up a new password for your account
          </p>
        </div>

        <div>
          <div className="mb-[40px]">
            <div className="mb-[40px]">
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
                      <i className="fa-solid fa-lock text-[rgb(157,166,177)]"></i>
                    </div>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className="user-input w-[100%] smallerDevice:max-w-[200px] h-[100%] bg-transparent pl-[20px] pb-[3px] pr-[20px] mr-[2px] font-[600]"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="relative w-[] pt-[15px] pl-[5px]">
                    {passwordVisible ? (
                      <i
                        className="fa-solid fa-eye-slash absolute bottom-0 right-0 inline-block  cursor-pointer"
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
              </div>
            </div>

            <div className="">
              <label
                htmlFor="password"
                className="capitalize text-[rgb(157,166,177)] font-[600] pb-[3px] inline-block"
              >
                Confirm Password
              </label>

              <div className="max-w-[400px]">
                <div className="border-[1px] border-[rgba(255,255,255,0.2)] rounded-[5px] h-[45px] bg-[rgb(32,37,43)] flex justify-between px-[5px] items-center">
                  <div className="flex items-center w-[95%] gap-[10px] h-[100%]">
                    <div className="ml-[10px] smallerDevice:ml-[5px]">
                      <i className="fa-solid fa-lock text-[rgb(157,166,177)]"></i>
                    </div>
                    <input
                      type={confirmPasswordVisible ? "text" : "password"}
                      className="user-input w-[100%] smallerDevice:max-w-[200px] h-[100%] bg-transparent pl-[20px] pb-[3px] pr-[20px] mr-[2px] font-[600]"
                      placeholder="Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="relative w-[] pt-[15px] pl-[5px]">
                    {confirmPasswordVisible ? (
                      <i
                        className="fa-solid fa-eye-slash absolute bottom-0 right-0 inline-block  cursor-pointer"
                        onClick={handleConfirmPasswordVisibility}
                      ></i>
                    ) : (
                      <i
                        className="fa-solid fa-eye ml-[] absolute bottom-0 right-0 cursor-pointer"
                        onClick={handleConfirmPasswordVisibility}
                      ></i>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            className="form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px] max-w-[400px]"
            onClick={handleSubmit}
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
              "Set Password"
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
