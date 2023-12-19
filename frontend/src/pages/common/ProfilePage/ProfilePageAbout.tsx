import React, { useState } from "react";
import EditAbout from "../../../components/common/ProfilePage/EditAbout";

function ProfilePageAbout() {
  return (
    <div>
      <div className="contentSection row mt-1 px-5 py-3 d-flex justify-content-center">
        <div className="card col-10">
          <div className="card-body">
            <div className="title justify-content-start d-flex mt-1">
              <h2>About</h2>
            </div>
            <hr />
            <EditAbout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePageAbout;
