import React, { useState } from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import "../../../pages/common/ProfilePage/ProfilePage.css";
import { Link } from "react-router-dom";
import { useProfilePageContext } from "../../../context/ProfilePageProvider";
import { Dropdown } from "react-bootstrap";
import ChangeProfileModal from "./ChangeProfileModal";

interface Props {
  userName: string | undefined;
  userId: string | undefined;
  isPrivateProfile: boolean | undefined;
  userBio: string | undefined;
}

const ProfileInfoMenu: React.FC<Props> = ({
  userName,
  userId,
  isPrivateProfile,
  userBio,
}) => {
  const { setRoute } = useProfilePageContext();
  //start change profile Modal section
  const [showChangeProfile, setShowChangeProfile] = useState<boolean>(false);
  const showChangeProfileModal = () => {
    setShowChangeProfile(true);
  };
  const closeChangeProfileModal = () => setShowChangeProfile(false);
  //end change profile Modal section

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
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="transparent"
                        id="dropdown-basic"
                      >
                        <ProfileImage
                          src={
                            "https://www.istockphoto.com/resources/images/IllustrationsLanding/BackgroundTile.jpg"
                          }
                          alt={"profile"}
                          size={"medium"}
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={showChangeProfileModal}>
                          Change profile image
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          See profile image
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="col-8">
                  <h3 className="d-flex justify-contnet-start">{userName}</h3>
                  <p className="d-flex justify-contnet-start">{userBio}</p>
                </div>
              </div>
            </div>
          </div>
          {isPrivateProfile ? (
            <div className="rightInfo col-md-6 d-flex justify-content-end">
              <div className="px-5">
                <button className="btn btn-secondary">Edit Profile</button>
              </div>
            </div>
          ) : null}
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

      {/* Modal */}
      <ChangeProfileModal
        closeChangeProfileModal={closeChangeProfileModal}
        showChangeProfileModal={showChangeProfile}
      />
    </div>
  );
};

export default ProfileInfoMenu;
