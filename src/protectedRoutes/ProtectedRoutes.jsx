import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("token");

  // Check if the token is valid and not expired
  if (isValidToken(token)) {
    // Return the protected content if the token is valid and not expired
    return children;
  } else {
    // Redirect to the login page if the token is invalid, expired, or not present
    return <Navigate to="/login" />;
  }
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
