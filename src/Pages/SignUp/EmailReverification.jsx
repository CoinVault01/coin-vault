import React, { useEffect, useState } from "react";
import "../SignUp/SignUp.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";

const EmailReverification = () => {
  const [resend, setResend] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  useEffect(() => {
    // Load email value from sessionStorage when the component mounts
    const storedEmail = sessionStorage.getItem("savedEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleResendCode = async () => {
    setResend(true); // Set the resend flag to true
    try {
      setIsLoading(true);
      // Make the POST request
      const response = await axios.post(
        `${baseUrl}/v1/auth/resend-verification-code`,
        {
          email,
        }
      );

      // Save the email to local storage
      sessionStorage.setItem("email", email);

      setTimeout(() => {
        navigate("/verifyemail");
      }, 1500);

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
      setIsLoading(false);
      setResend(false); // Reset the resend flag to false
    }
  };

  return (
    <section className="formAnim bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <ToastContainer hideProgressBar autoClose={3000} />
      <div className=" w-[90%] max-w-[500px] mx-auto pt-[100px] smallerDevice:pt-[30px]">
        <h1 className="font-[600] text-[32px] smallerDevice:text-[25px] smallDevice:text-[30px] ml-[20px] mb-[10px]">
          Email Verification
        </h1>
        <p className="text-[rgb(157,166,177)] ml-[20px] font-[600]">
          Please enter the email address used for registration to enable account
          verification.
        </p>

        <div className="my-[40px]">
          <div className="mb-[30px] ml-[20px]">
            <label
              htmlFor="firstName"
              className="capitalize text-[rgb(157,166,177)] font-[600] pb-[3px] inline-block"
            >
              Email
            </label>

            <div className="border-[1px] border-[rgba(255,255,255,0.2)] rounded-[5px] h-[45px] bg-[rgb(32,37,43)] flex items-center w-[80%] max-w-[350px]">
              <div className="mx-[20px]">
                <i className="fa-solid fa-user text-[rgb(157,166,177)]"></i>
              </div>
              <input
                className="user-input w-[100%] h-[100%] bg-[rgb(32,37,43)] pl-[20px] pb-[3px] pr-[20px] mr-[2px] font-[600]"
                type="text"
                name="firstName"
                placeholder="John@mail.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
          </div>
        </div>

        <button
          className={`${
            email === "" ? "opacity-[0.5] cursor-not-allowed" : ""
          } ${
            isLoading ? "cursor-not-allowed" : ""
          } form-btn block w-[80%] max-w-[350px] ml-[20px] font-[600] py-[10px] mb-[20px] rounded-[8px]`}
          onClick={handleResendCode}
          disabled={isLoading || email === ""}
        >
          {resend ? (
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
            "Resend Code"
          )}
        </button>
      </div>
    </section>
  );
};

export default EmailReverification;
