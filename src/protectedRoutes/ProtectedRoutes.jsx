import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthentication } from "../Authentication/useAuthentication";

function ProtectedRoutes() {
  const { isUserSignedIn } = useAuthentication();

  if (!isUserSignedIn) {
    // If the user is not signed in, navigate them to the login page
    return <Navigate to="/login" />;
  }

  // If the user is signed in, allow them to access the protected content
  return <Outlet />;
}

export default ProtectedRoutes;
