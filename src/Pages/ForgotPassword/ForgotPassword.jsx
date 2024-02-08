import React, { useState } from "react";
import coinVault from "./ForgotPassword-Image/coin-bg.png";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true); // Start loading

      if (!email) {
        toast.error("Email is required");
        return;
      }

      const response = await axios.post(`${baseUrl}/v1/auth/forgot-password`, {
        email,
      });
      if (response.status === 200) {
        toast.success("Reset password link sent successfully", {
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
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error, {
          // Toast error message
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
        toast.error("Internal server error", {
          // Toast error message
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
    } finally {
      setIsLoading(false); // Stop loading
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
          <h1 className="text-[30px] font-[600]">Forgot Password?</h1>
          <p className="text-[rgba(255,255,255,0.5)] font-[600] text-[13px]">
            Lost your password? No worries we have you covered
          </p>
        </div>

        <div>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            className="form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px] max-w-[400px]"
            onClick={handleSubmit}
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? ( // Display loader spinner if loading
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
              "Send Link" // Display default text
            )}
          </button>
        </div>

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
};

export default ForgotPassword;
