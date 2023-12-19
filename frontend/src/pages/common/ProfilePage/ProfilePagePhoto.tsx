
import React from "react";
import "./PhotoPage.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Dropdown } from 'flowbite-react';


function ProfilePagePhoto() {
    
  return (

<div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-12 mb-4 mb-lg-0 position-relative">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Boat on Calm Water"
          />

          <div className="position-absolute top-0 end-0 m-3">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-three-dots-vertical"></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Delete
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Move to Album
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Make profile picture
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Make cover photo
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

)
}

export default ProfilePagePhoto;
