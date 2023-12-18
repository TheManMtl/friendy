import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/common/HomePage";
import LoginPage from "./pages/common/LoginPage";
import RegisterPage from "./pages/common/RegisterPage";
import ProfilePage from "./pages/common/ProfilePage";
import FriendsPage from "./pages/common/FriendsPage/FriendsPage";
import { FriendsPageProvider } from "./context/FriendsPageContext";
import Navbar from "./components/common/Navbar/Navbar";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/global.css";
import AuthProvider from "./context/AuthProvider";
import { ProfilePageProvider } from "./context/ProfilePageProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/profile/*"
              element={
                <ProfilePageProvider>
                  <ProfilePage />
                </ProfilePageProvider>
              }
            />

            {/* Wrapping only FriendsPage in FriendsPageContext... I don't think it applies anywhere else on the site -Nick */}
            <Route
              path="/friends/*"
              element={
                <FriendsPageProvider>
                  <FriendsPage />
                </FriendsPageProvider>
              }
            />
          </Routes>
        </Router>
        {/* <Footer/> */}
      </AuthProvider>
    </div>
  );
}

export default App;
