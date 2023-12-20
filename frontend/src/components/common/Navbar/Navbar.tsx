import React from "react";
import "./Navbar.css";
import { useForm } from "react-hook-form";
import ProfileImage from "../ProfileImage/ProfileImage";
import LogoutButton from "../Button/LogoutButton";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { SearchModel } from "../../../models/SearchModel";

function Navbar() {
  const authContext = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchModel>();

  async function onSubmit(input: SearchModel, event: any) {
    event.preventDefault();
    const urlParams = input.searchTerms;
    console.log(urlParams);
  }
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
            <form
              className="d-flex searchInput"
              role="search"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className="form-control me-2 searchInput"
                type="search"
                placeholder="Search"
                aria-label="Search"
                {...register("searchTerms")}
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
                    <a className="nav-link" href="/#/friends">
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


                  <li className="nav-item">
                    <a className="nav-link " aria-current="page" href="/login">
                      <i className="">login</i>
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
                  <a
                    className="nav-link"
                    href={`/profile/${authContext?.user?.id}`}
                  >
                    <ProfileImage
                      src={"https://www.w3schools.com/howto/img_avatar.png"}
                      alt={"profile"}
                      size={"small"}
                    />
                  </a>
                </li>
                {/* logout button */}
                <li className="nav-item align-self-center">
                  <LogoutButton />
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
