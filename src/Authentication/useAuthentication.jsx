import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

export function useAuthentication() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        setIsUserSignedIn(false);
        localStorage.removeItem("token"); // Remove expired token
      } else {
        setIsUserSignedIn(true);
      }
    } else {
      setIsUserSignedIn(false);
    }
  }, []);

  return { isUserSignedIn, setIsUserSignedIn };
}
