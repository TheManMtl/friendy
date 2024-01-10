import React, { useState } from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import "../../../pages/common/ProfilePage/ProfilePage.css";
import { Link } from "react-router-dom";
import { useProfilePageContext } from "../../../context/ProfilePageProvider";
import { Dropdown } from "react-bootstrap";
import ChangeProfileModal from "./ChangeProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";

interface Props {
  userName: string | undefined;
  userId: string | undefined;
  isPrivateProfile: boolean | undefined;
  userBio: string | undefined;
  profileThumb: string | null;
}

const ProfileInfoMenu: React.FC<Props> = ({
  userName,
  userId,
  isPrivateProfile,
  userBio,
  profileThumb,
}) => {
  const { setRoute } = useProfilePageContext();
  //start change profile Modal section
  const [showChangeProfile, setShowChangeProfile] = useState<boolean>(false);
  const showChangeProfileModal = () => {
    setShowChangeProfile(true);
  };
  const closeChangeProfileModal = () => setShowChangeProfile(false);
  //end change profile Modal section

  //start change password Modal section
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const showChangePasswordModal = () => {
    setShowChangePassword(true);
  };
  const closeChangePasswordModal = () => setShowChangePassword(false);
  //end change password Modal section

  const handleLinkClick = (route: string) => {
    setRoute(route);
  };

  return (
    <div>
      <div className="InfoCard card mb-5">
        <div className="basicInfo row mt-3">
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
                            profileThumb
                              ? profileThumb
                              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnGZWTF4dIu8uBZzgjwWRKJJ4DisphDHEwT2KhLNxBAA&s"
                          }
                          alt={"profile"}
                          size={"medium"}
                        />
                      </Dropdown.Toggle>
                      {isPrivateProfile ? (
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={showChangeProfileModal}>
                            Change profile image
                          </Dropdown.Item>
                          <Dropdown.Item href="#">
                            See profile image
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      ) : null}
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
              <div className="px-5 ">
                <button
                  className="btn btn-secondary mt-3"
                  style={{ width: "180px" }}
                  onClick={showChangePasswordModal}
                >
                  Change Password
                </button>
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

      <ChangePasswordModal
        closeChangePasswordModal={closeChangePasswordModal}
        showChangePasswordModal={showChangePassword}
      />
    </div>
  );
};

export default ProfileInfoMenu;
