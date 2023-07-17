import React, { useState } from "react";
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

  const handleVerifyEmail = async () => {
    try {
      setIsLoading(true); // Start loading

      const response = await axios.post(
        "http://localhost:8080/v1/auth/verify-email",
        { verificationCode }
      );
      const data = response.data;

      if (response.status === 200) {
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
    try {
      setResend(true); // Start loading

      const response = await axios.post(
        "http://localhost:8080/v1/auth/resend-verification-code",
        {
          email: savedEmail,
        }
      );

      if (response.status === 200) {
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
      } else {
        toast.error(response.data.error, {
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
      setResend(false); // Stop loading
    }
  };

  return (
    <section className="formAnim bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <ToastContainer hideProgressBar autoClose={3000} />
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
            id="verificationCode"
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
            onChange={(value) => setVerificationCode(value)}
          />
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

        <button
          className="block w-[80%] max-w-[350px] ml-[20px] font-[600] py-[10px] mb-[20px] rounded-[8px]"
          onClick={handleResendCode}
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
      </div>
    </section>
  );
};

export default VerifyEmail;
