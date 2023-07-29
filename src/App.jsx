import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./Pages/LandingPage/Main/Main"
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import { useEffect } from "react";
import VerifyEmail from "./Pages/SignUp/VerifyEmail";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import TermsAndConditions from "./Pages/TermsAndConditions/TermsAndConditions";
import DashBoardHome from "./DashBoard/DashBoardHome/DashBoardHome";
import CoinDetails from "./CoinDetailsPages/CoinDetails";



function App() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/dashboardhome" element={<DashBoardHome />} />
          <Route path="/coin/:id" element={<CoinDetails/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
