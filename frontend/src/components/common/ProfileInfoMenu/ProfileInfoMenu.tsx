import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import "../../../pages/common/ProfilePage/ProfilePage.css";
import { Link } from "react-router-dom";
import { useProfilePageContext } from "../../../context/ProfilePageProvider";
interface Props {
  userName: string | undefined;
  userId: number | undefined;
}
const ProfileInfoMenu: React.FC<Props> = ({ userName, userId }) => {
  const { setRoute } = useProfilePageContext();
  const handleLinkClick = (route: string) => {
    setRoute(route);
  };
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
              <Link
                to={`/profile/${userId}`}
                className="nav-link"
                onClick={() => handleLinkClick(`/profile/${userId}`)}
              >
                Post
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/profile/${userId}/about`}
                className="nav-link"
                onClick={() => handleLinkClick(`/profile/${userId}/about`)}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/profile/${userId}/friend`}
                className="nav-link"
                onClick={() => handleLinkClick(`/profile/${userId}/friend`)}
              >
                Friends
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/profile/${userId}/photo`}
                className="nav-link"
                onClick={() => handleLinkClick(`/profile/${userId}/photo`)}
              >
                Photos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/profile/${userId}/album`}
                className="nav-link"
                onClick={() => handleLinkClick(`/profile/${userId}/album`)}
              >
                Albums
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoMenu;
