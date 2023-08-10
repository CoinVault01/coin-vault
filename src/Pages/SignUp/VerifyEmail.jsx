import React, { useEffect, useState } from "react";
import "../SignUp/SignUp.css";
import PinInput from "react-pin-input";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";


const VerifyEmail = () => {
  const savedEmail = localStorage.getItem("email");
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resend, setResend] = useState(false);
  const [countdown, setCountdown] = useState(120); // Countdown timer in seconds
  let timer = null;
  useEffect(() => {
    const countdownTimer = localStorage.getItem("countdownTimer");
    const savedTime = parseInt(localStorage.getItem("savedTime"), 10);
    const currentTime = Math.floor(Date.now() / 1000);
    const elapsedTime = currentTime - savedTime;
    if (countdownTimer && elapsedTime < countdown) {
      setCountdown(countdown - elapsedTime);
      startCountdown();
    } else {
      startCountdown();
    }
    return () => {
      clearInterval(timer);
    };
  }, []);
  const startCountdown = () => {
    const startTime = Math.floor(Date.now() / 1000);
    localStorage.setItem("savedTime", startTime.toString());
    timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        const newCountdown = prevCountdown - 1;
        localStorage.setItem("countdownTimer", newCountdown.toString());
        if (newCountdown <= 0) {
          clearInterval(timer);
          localStorage.removeItem("countdownTimer");
        }
        return newCountdown;
      });
    }, 1000);
  };
  const handleVerifyEmail = async () => {
    try {
      setIsLoading(true); // Start loading
      const response = await axios.post(
        "https://coinvault.onrender.com/v1/auth/verify-email",
        { verificationCode }
      );
      const data = response.data;
      if (response.status === 200) {
        // Clear the data from local storage
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("email");
        localStorage.removeItem("username");

        toast.success(data.message, {
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
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(data.error, {
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
    } catch (error) {
      console.error("Error verifying email:", error);
      let errorMessage = "Failed to verify email. Please try again later.";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      toast.error(errorMessage, {
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
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  const handleResendCode = async () => {
    setResend(true); // Set the resend flag to true
    try {
      // Make the POST request
      const response = await axios.post(
        "https://coinvault.onrender.com/v1/auth/resend-verification-code",
        {
          email: savedEmail,
        }
      );
      // Check if the request was successful
      if (response.status === 200) {
        setCountdown(120); // Reset countdown to initial value
        startCountdown(); // Start the countdown again
      }
      // Show success toast message
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      // Error handling code
      console.error("Error resending verification code:", error);
      let errorMessage =
        "Failed to resend verification code. Please try again later.";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setResend(false); // Reset the resend flag to false
    }
  };

  return (
    <section className="formAnim bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <ToastContainer hideProgressBar autoClose={3000} />
      <div className=" w-[90%] max-w-[500px] mx-auto pt-[100px] smallerDevice:pt-[30px]">
        <h1 className="font-[600] text-[32px] smallerDevice:text-[25px] smallDevice:text-[30px] ml-[20px] mb-[10px]">
          Verify your email address
        </h1>
        <p className="text-[rgb(157,166,177)] ml-[20px] font-[600]">
          A six digit pin has been sent to {savedEmail} enter into this field to
          complete your account creation process
        </p>

        <div className="my-[40px]">
          <label
            htmlFor="password"
            className="capitalize text-[rgb(157,166,177)] font-[600] pb-[10px] pl-[28px] inline-block"
          >
            Enter code
          </label>

          <div className="ml-[20px]">
            <PinInput
              id="verificationCode"
              length={6}
              initialValue=""
              secret
              secretDelay={100}
              inputMode="number"
              style={{ padding: "5px" }}
              inputStyle={{
                borderColor: "rgba(255,255,255,0.5)",
                borderTopRightRadius: "5px",
                borderTopLeftRadius: "5px",
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px",
                background: "transparent",
                marginRight: "5px",
                width: "39px",
                height: "40px",
              }}
              inputFocusStyle={{ borderColor: "rgba(255,255,255,0.5)" }}
              autoSelect={true}
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              onChange={(value) => setVerificationCode(value)}
            />
          </div>
        </div>

        <button
          className="form-btn block w-[80%] max-w-[350px] ml-[20px] font-[600] py-[10px] mb-[20px] rounded-[8px]"
          onClick={handleVerifyEmail}
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
            "Verify Email" // Display default text
          )}
        </button>

        <div className="flex justify-center w-[80%] max-w-[350px] ml-[20px] font-[600] py-[10px] mb-[20px] rounded-[8px]">
          <button
            className={` ${
              countdown > 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleResendCode}
            disabled={countdown > 0}
          >
            {resend ? ( // Display loader spinner if loading
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
              "Resend Code" // Display default text
            )}
          </button>

          <p
            className={`text-[rgb(157,166,177)] font-[600] ml-[15px] ${
              countdown > 0 ? "opacity-50" : ""
            }`}
          >
            {countdown > 0
              ? `${Math.floor(countdown / 60)}:${
                  countdown % 60 < 10 ? "0" : ""
                }${countdown % 60}`
              : "0:00"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;
