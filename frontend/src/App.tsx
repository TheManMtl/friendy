import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/common/HomePage';
import LoginPage from './pages/common/LoginPage';
import RegisterPage from './pages/common/RegisterPage';
import ProfilePage from './pages/common/ProfilePage';
import FriendsPage from './pages/common/FriendsPage/FriendsPage';
import AlbumPage from './pages/common/AlbumPage';
import PostPage from './pages/common/PostPage';
import { FriendsPageProvider } from './context/FriendsPageContext';
import Navbar from './components/common/Navbar/Navbar';
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/global.css";
import PhotoPage from './pages/common/PhotoPage';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/album" element={<AlbumPage />} />
          <Route path="/photos" element={<PhotoPage />} />
          <Route path="/posts" element={<PostPage />} />

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
    </div>
  );
}

export default App;
