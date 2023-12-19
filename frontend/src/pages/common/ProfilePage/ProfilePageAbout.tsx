import React, { useState } from "react";

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
            {/* School panel */}

            <div className="school d-flex justify-content-start row">
              <div className="col-1 icon d-flex justify-content-start">
                <i className="bi bi-mortarboard-fill icon"></i>
              </div>
              <div className="col-6 d-flex justify-content-start">
                <p>Studied at University of Moratuwa</p>
              </div>
              <div className="col-2 d-flex justify-content-end">
                <button className="btn btn-secondary">edit</button>
              </div>
            </div>

            {/* School panel */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePageAbout;
