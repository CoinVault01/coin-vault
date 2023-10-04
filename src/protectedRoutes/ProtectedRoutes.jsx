import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoutes = ({ children }) => {
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    // Check if the token is valid and not expired
    if (token === null || !isValidToken(token)) {
      // Clear the token from local storage
      sessionStorage.removeItem("token");
      // Show a toast message
      toast.warn("User timeout. Please login.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // Navigate to the login page after a short delay
      const timeoutId = setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      // Clean up the timeout on unmount
      return () => clearTimeout(timeoutId);
    }
  }, [token]);

  // If the token is valid, render the protected content
  return (
    <>
      {children}
      <ToastContainer hideProgressBar autoClose={3000} />
    </>
  );
};

// Function to check if the token is valid and not expired
const isValidToken = (token) => {
  // Check if the token is defined and not null or undefined
  if (token !== undefined && token !== null) {
    const tokenExpirationTimestamp = getTokenExpirationTimestamp(token);
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds

    // Check if the token has not expired
    return tokenExpirationTimestamp > currentTimestamp;
  }
  return false; // Token is not valid if it's undefined, null, or missing
};

// Function to get the token's expiration timestamp
const getTokenExpirationTimestamp = (token) => {
  const decodedToken = decodeToken(token);
  if (decodedToken && decodedToken.exp) {
    return decodedToken.exp;
  }
  return 0; // Token expiration timestamp not available
};

// Function to decode the JWT token using jwt-decode library
const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null; // Return null if decoding fails
  }
};

export default ProtectedRoutes;
