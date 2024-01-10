import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/common/HomePage";
import LoginPage from "./pages/common/LoginPage";
import RegisterPage from "./pages/common/RegisterPage";
import ProfilePage from "./pages/common/ProfilePage/ProfilePage";
import FriendsPage from "./pages/common/FriendsPage/FriendsPage";
import { FriendsPageProvider } from "./context/FriendsPageContext";
import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Navbar/Footer";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/global.css";
import { ProfilePageProvider } from "./context/ProfilePageProvider";
import AdminUsersPage from "./pages/common/AdimPage/AdminUsersPage";
import PersistAuth from "./components/PersistAuth";
import LoggedInOnly from "./components/LoggedInOnly";

import AlbumList from "./components/common/AlbumDisplay/AlbumList";
import CreateAlbum from "./pages/common/ProfilePage/CreateAlbum";

import SearchPage from "./pages/common/Search/SearchPage";
import ImagePostDisplay from "./pages/common/ImagePostDisplay/ImagePostDisplay";
import EditAlbum from "./pages/common/ProfilePage/EditAlbum";
import AlbumDetail from "./pages/common/ProfilePage/AlbumDetail";
import NotFound from "./pages/common/404";
import UserDetails from './pages/common/AdimPage/UserDetails';

function App() {
  // Determine if the current route is an admin route
  const isAdminRoute = window.location.hash.startsWith("#admin");
  const isDisplayRoute = window.location.hash.startsWith("#display");
  return (
    <div className="App">
      {/* <AuthProvider> */}

      <HashRouter>
        {isAdminRoute || isDisplayRoute ? <></> : <Navbar />}
        <Routes>
          <Route element={<PersistAuth />}>
            <Route element={<LoggedInOnly />}>

              <Route path="/display" element={<ImagePostDisplay />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/" element={<HomePage />} />

              {/* <Route path="/photos" element={<PhotoPage />} />
              <Route path="/posts" element={<PostPage />} /> */}
              <Route
                path="/profile/:id/*"
                element={
                  <ProfilePageProvider>
                    <ProfilePage />
                  </ProfilePageProvider>
                }
              />
              <Route path="/user-details/:userId" element={<UserDetails />} />
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
              <Route path="/profile/:id/createalbum" element={
                <ProfilePageProvider>
                  <CreateAlbum />
                </ProfilePageProvider>
              }
              />

              <Route path="/profile/:id/editalbum/:albumId" element={
                <ProfilePageProvider>
                  <EditAlbum />
                </ProfilePageProvider>
              }>

              </Route>
              <Route path="/profile/:id/album/:albumId" element={
                <ProfilePageProvider>
                  <AlbumDetail />
                </ProfilePageProvider>
              }></Route>

            </Route>

            {/* ADMIN ONLY */}
            <Route element={<LoggedInOnly roles={["Admin"]}/>}>
            <Route path="/admin" element={<AdminUsersPage />}></Route>
            </Route>

            {/* LOGIN NOT REQUIRED */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/404" element={<NotFound />} />
          </Route>
        </Routes>
        {isAdminRoute || isDisplayRoute ? <></> : <Footer />}
      </HashRouter>

      {/* <Footer/> */}
      
      {/* </AuthProvider> */}
    </div >
  );
}

export default App;
