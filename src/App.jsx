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
import Buy from "./DashBoard/Buy-Assets/Buy";
import Sell from "./DashBoard/Sell-Assets/Sell"
import SwapCoin from "./DashBoard/SwapCoin/SwapCoin";
import Cards from "./DashBoard/Cards/Cards";
import Wallet from "./DashBoard/Wallet/Wallet";
import Transactions from "./DashBoard/Transactions/Transactions";
import Settings from "./DashBoard/Settings/Settings";



function App() {
  

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
          <Route path="/wallet-home" element={<DashBoardHome />} />
          <Route path="/wallet-buy" element={<Buy />} />
          <Route path="/wallet-sell" element={<Sell />} />
          <Route path="/wallet-swapcoin" element={<SwapCoin />} />
          <Route path="/wallet-cards" element={<Cards />} />
          <Route path="/wallet-wallet" element={<Wallet />} />
          <Route path="/wallet-transactions" element={<Transactions />} />
          <Route path="/wallet-settings" element={<Settings />} />
          <Route path="/coin/:id" element={<CoinDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
