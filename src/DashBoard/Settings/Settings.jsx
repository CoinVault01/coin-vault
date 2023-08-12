import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import DefaultImage from "../Settings/SettingsImage/default.png"
import ProfileSettings from "./ProfileSettings";
import SecuritySettings from "./SecuritySettings";

const Settings = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend using the JWT token
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect to login if token not found
          return;
        }
        // Make the API request to fetch user data
        const response = await axios.get(
          "https://coinvault.onrender.com/v1/auth/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", response.data); // Add this line
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <section className="bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <div>
        <DashboardLayout />
        <div className="pt-[100px] largeDevice:ml-[230px] pb-[20px]">
          <div className="flex justify-center items-center rounded-full bg-[#ffffffe5] pt-[5px] max-w-[100px] mx-auto relative cursor-pointer">
            <img
              src={DefaultImage}
              alt=""
              className="block w-[100%] rounded-full"
            />
            <div className="absolute top-[65px] right-[0] rounded-full bg-[rgb(36,37,38)] px-[9px] py-[5px]">
              <i className="fa-solid fa-camera text-[rgb(228,230,234)]"></i>
            </div>
          </div>

          <ProfileSettings />
          <SecuritySettings />
        </div>
      </div>
    </section>
  );
};

export default Settings;
