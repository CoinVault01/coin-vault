import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./Pages/LandingPage/Main/Main"
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import { useEffect } from "react";




function App() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
