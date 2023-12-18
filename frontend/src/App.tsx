import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
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
import AdminUsersPage from "./pages/common/AdimPage/AdminUsersPage";
import AdminNavbarTop from "./pages/common/AdimPage/AdminComponents/AdminNavbarTop";

function App() {

  // Determine if the current route is an admin route
  const isAdminRoute = window.location.pathname.startsWith("/admin");

  return (
    <div className="App">
      <AuthProvider>
        <Router>
        {isAdminRoute ? <AdminNavbarTop /> : <Navbar />}
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
            <Route path="/admin" element={<AdminUsersPage />}></Route>
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
