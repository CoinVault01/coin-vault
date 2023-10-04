import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import DefaultImage from "../Settings/SettingsImage/default.png";
import ProfileSettings from "./ProfileSettings";
import SecuritySettings from "./SecuritySettings";
import axios from "axios";
import UploadProfilePicture from "./UploadProfilePicture";
import { ThreeCircles } from "react-loader-spinner";

const Settings = () => {
  const [userData, setUserData] = useState({});
  const [imageModal, setImageModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New state to track loading

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if userData is already in the cache
        const cachedUserData = JSON.parse(sessionStorage.getItem("userData"));

        if (cachedUserData) {
          setUserData(cachedUserData);
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          "https://coinvault.onrender.com/v1/auth/user",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        setUserData(response.data);

        // Cache the fetched userData
        sessionStorage.setItem("userData", JSON.stringify(response.data));

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleModalToggle = () => {
    setImageModal(true);
  };



  return (
    <section className="bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <div className="settings-section">
        <DashboardLayout />

        <div className="pt-[100px] largeDevice:ml-[230px] pb-[20px]">
          {isLoading ? (
            <div className="flex items-center justify-center max-w-[500px] mx-auto">
              <ThreeCircles
                height="50"
                width="50"
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
            <div className="flex items-center justify-center rounded-full bg-[#ffffffe5] max-w-[130px] mx-auto relative cursor-pointer">
              <div className="w-[100%]">
                <img
                  src={userData.profileImage || DefaultImage}
                  alt=""
                  className="profile-image block w-[100%] h-[130px] rounded-full object-cover"
                />
              </div>
              <div className="absolute top-[85px] right-[0] rounded-full bg-[rgb(38,57,81)] px-[9px] py-[5px]">
                <i
                  className="fa-solid fa-camera text-[rgb(228,230,234)]"
                  onClick={handleModalToggle}
                ></i>
              </div>
            </div>
          )}

          <div className="w-[90%] max-w-[500px] mx-auto">
            <UploadProfilePicture
              userId={userData.userId}
              imageModal={imageModal}
              setImageModal={setImageModal}
            />
          </div>

          <ProfileSettings />
          <SecuritySettings />
        </div>
      </div>
    </section>
  );
};

export default Settings;
