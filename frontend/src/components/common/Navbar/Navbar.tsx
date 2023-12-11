import React from "react";
import "./Navbar.css";
import ProfileImage from "../ProfileImage/ProfileImage";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg nav-custom py-3">
        <div className="container-fluid">
          <div className="left col-4">
            <img
              src={window.location.origin + "/FriendyLogo.png"}
              alt="logo"
              className="logo"
            ></img>
            <a className="navbar-brand" href="/">
              Friendy
            </a>
            <form className="d-flex searchInput" role="search">
              <input
                className="form-control me-2 searchInput"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className=" btn-nav searchBtn" type="submit">
                Search
              </button>
            </form>
          </div>

          <div className="middle col-4">
            {/* Menu Toggle */}
            <div className="menu-wrapper">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-center">
                  <li className="nav-item">
                    <a className="nav-link " aria-current="page" href="/">
                      <i className="bi bi-house-door-fill icon home"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      <i className="bi bi-people-fill icon"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      <i className="bi bi-shop icon"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      <i className="bi bi-controller icon"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="right col-lg-4">
            <div className="wrapper">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-right">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <i className="bi bi-bell-fill iconRight"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <i className="bi bi-chat-fill iconRight"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <ProfileImage
                      src={"https://www.w3schools.com/howto/img_avatar.png"}
                      alt={"profile"}
                      size={"small"}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
