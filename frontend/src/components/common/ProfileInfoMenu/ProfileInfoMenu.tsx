import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import "../../../pages/common/ProfilePage.css";

interface Props {
  userName: string | undefined;
}
const ProfileInfoMenu: React.FC<Props> = ({ userName }) => {
  return (
    <div>
      <div className="InfoCard card py-4">
        <div className="basicInfo row">
          <div className="leftInfo col-md-6">
            <div className="profileName px-5">
              <div className="row">
                <div
                  className="col-4 d-flex justify-content-end"
                  style={{ position: "relative" }}
                >
                  <div style={{ position: "absolute", bottom: "2rem" }}>
                    <ProfileImage
                      src={
                        "https://www.istockphoto.com/resources/images/IllustrationsLanding/BackgroundTile.jpg"
                      }
                      alt={"profile"}
                      size={"medium"}
                    />
                  </div>
                </div>
                <div className="col-8">
                  <h3 className="d-flex justify-contnet-start">{userName}</h3>
                  <p className="d-flex justify-contnet-start">Profile Bio</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rightInfo col-md-6 d-flex justify-content-end">
            <div className="px-5">
              <button className="btn btn-secondary">Edit Profile</button>
            </div>
          </div>
        </div>
        <hr />
        <div className="container-nav">
          <ul className="d-flex nav">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Posts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Friends
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Photos
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoMenu;
