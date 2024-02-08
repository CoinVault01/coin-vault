import { useState, useEffect } from "react";
import axios from "axios";

const useUserCryptoData = () => {
  const [userData, setUserData] = useState([]);
  const [userCryptoData, setUserCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_REACT_APP_Vercel_BASE_URL;

  useEffect(() => {
    // Function to clear sessionStorage on browser refresh
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("userData");
      sessionStorage.removeItem("userCryptoData");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []); // This effect runs only once during component mount

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if userData is already in the cache
        const cachedUserData = JSON.parse(sessionStorage.getItem("userData"));

        if (cachedUserData) {
          setUserData(cachedUserData);
          setLoading(false);
          return;
        }

        const response = await axios.get(`${baseUrl}/v1/auth/user`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        setUserData(response.data);

        // Cache the fetched userData
        sessionStorage.setItem("userData", JSON.stringify(response.data));

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserCryptoData = async () => {
      try {
        // Check if userCryptoData is already in the cache
        const cachedUserCryptoData = JSON.parse(
          sessionStorage.getItem("userCryptoData")
        );

        if (cachedUserCryptoData) {
          setUserCryptoData(cachedUserCryptoData);
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${baseUrl}/v1/auth/user-crypto-holdings/${userData.userId}`
        );

        setUserCryptoData(response.data);

        // Cache the fetched userCryptoData
        sessionStorage.setItem("userCryptoData", JSON.stringify(response.data));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user crypto holdings:", error.message);
        setLoading(false);
      }
    };

    if (userData.userId) {
      fetchUserCryptoData();
    }
  }, [userData]);

  return { userData, userCryptoData, loading };
};

export default useUserCryptoData;
