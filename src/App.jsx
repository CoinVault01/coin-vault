import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Pages/LandingPage/Main/Main";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
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
          <Route
            path="/wallet-home"
            element={
              <ProtectedRoutes>
                <DashBoardHome />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/wallet-buy"
            element={
              <ProtectedRoutes>
                <Buy />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/wallet-sell"
            element={
              <ProtectedRoutes>
                <Sell />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/wallet-swapcoin"
            element={
              <ProtectedRoutes>
                <SwapCoin />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/wallet-cards"
            element={
              <ProtectedRoutes>
                <Cards />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/wallet-wallet"
            element={
              <ProtectedRoutes>
                <Wallet />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/wallet-transactions"
            element={
              <ProtectedRoutes>
                <Transactions />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/wallet-settings"
            element={
              <ProtectedRoutes>
                <Settings />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/coin/:id"
            element={
            <ProtectedRoutes>
              <CoinDetails/>
            </ProtectedRoutes>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
