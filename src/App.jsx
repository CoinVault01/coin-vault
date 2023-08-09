import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Pages/LandingPage/Main/Main";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import { useEffect, useState } from "react";
import VerifyEmail from "./Pages/SignUp/VerifyEmail";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import TermsAndConditions from "./Pages/TermsAndConditions/TermsAndConditions";
import DashBoardHome from "./DashBoard/DashBoardHome/DashBoardHome";
import CoinDetails from "./CoinDetailsPages/CoinDetails";
import Buy from "./DashBoard/Buy-Assets/Buy";
import Sell from "./DashBoard/Sell-Assets/Sell";
import SwapCoin from "./DashBoard/SwapCoin/SwapCoin";
import Cards from "./DashBoard/Cards/Cards";
import Wallet from "./DashBoard/Wallet/Wallet";
import Transactions from "./DashBoard/Transactions/Transactions";
import Settings from "./DashBoard/Settings/Settings";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";
import { useAuthentication } from "./Authentication/useAuthentication";

function App() {
  const { isUserSignedIn } = useAuthentication();
  
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
          <Route path="/wallet-home" element={<ProtectedRoutes />}>
            <Route index element={<DashBoardHome />} />
          </Route>
          <Route path="/wallet-buy" element={<ProtectedRoutes />}>
            <Route index element={<Buy />} />
          </Route>
          <Route path="/wallet-sell" element={<ProtectedRoutes />}>
            <Route index element={<Sell/>} />
          </Route>
          <Route path="/wallet-swapcoin" element={<ProtectedRoutes />}>
            <Route index element={<SwapCoin/>} />
          </Route>
          <Route path="/wallet-cards" element={<ProtectedRoutes />}>
            <Route index element={<Cards/>} />
          </Route>
          <Route path="/wallet-wallet" element={<ProtectedRoutes />}>
            <Route index element={<Wallet/>} />
          </Route>
          <Route path="/wallet-transactions" element={<ProtectedRoutes />}>
            <Route index element={<Transactions/>} />
          </Route>
          <Route path="/wallet-settings" element={<ProtectedRoutes />}>
            <Route index element={<Settings/>} />
          </Route>
          <Route path="/coin/:id" element={<ProtectedRoutes />}>
            <Route index element={<CoinDetails/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
