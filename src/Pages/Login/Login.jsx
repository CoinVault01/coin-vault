import React, { useState, useEffect } from "react";
import coinVault from "./Login-Image/coin-bg.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";

const Login = () => {
  
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://coinvault.onrender.com/v1/auth/login",
        {
          userName,
          password,
        }
      )
      const { token } = response.data;
      localStorage.setItem("token", token);



      toast.success("Login successful!", {
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
        navigate("/wallet-home");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.error, {
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
    }
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section className="formAnim bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <ToastContainer hideProgressBar autoClose={3000} />
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

        <form onSubmit={handleLogin}>
          <div className="mb-[40px]">
            <div className="mb-[20px]">
              <label
                htmlFor="userName"
                className="capitalize text-[rgb(157,166,177)] font-[600] pb-[3px] inline-block"
              >
                UserName
              </label>

              <div className="border-[1px] border-[rgba(255,255,255,0.2)] rounded-[5px] h-[45px] bg-[rgb(32,37,43)] flex items-center max-w-[400px]">
                <div className="mx-[10px]">
                  <i className="fa-solid fa-user text-[rgb(157,166,177)]"></i>
                </div>
                <input
                  type="text"
                  className="user-input w-[100%] h-[100%] bg-[rgb(32,37,43)] pl-[20px] pb-[3px] pr-[20px] mr-[2px] font-[600]"
                  placeholder="JohnDoe"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
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
                <Link
                  to="/forgotpassword"
                  className="block float-right text-[rgb(133,209,240)] font-[600]"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>

          <button
            className="form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px] max-w-[400px]"
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
              "Login"
            )}
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
