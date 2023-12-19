import React from "react";
import "../../../pages/common/ProfilePage/ProfilePage.css";

function ProfileIntroCard() {
  return (
    <div>
      <div className="IntroCard card py-4">
        <div className="d-flex justify-content-start offset-1">
          <h4>Intro</h4>
        </div>
        <div className="d-flex justify-content-center">
          <p>Self intro</p>
        </div>
        <div>
          <button className="btn btn-secondary col-10">Edit bio</button>
        </div>

        <div className="details my-5">
          <div className="d-flex justify-content-start">
            <i className="bi bi-mortarboard-fill icon"></i>
            <p>
              Studied at <a href="/">University of Moratuwa</a>
            </p>
          </div>

          <div className="d-flex justify-content-start">
            <i className="bi bi-house-heart icon"></i>
            <p className="mx-1">
              Lives in <a href="/">Montreal, QC</a>
            </p>
          </div>

          <div className="d-flex justify-content-start ">
            <i className="bi bi-geo-alt-fill icon"></i>
            <p>
              From <a href="/">Colombo, Sri Lanka</a>
            </p>
          </div>
          <div>
            <button className="btn btn-secondary col-10">Edit details</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileIntroCard;