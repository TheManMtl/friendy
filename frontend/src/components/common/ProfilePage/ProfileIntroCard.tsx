import React from "react";
import "../../../pages/common/ProfilePage/ProfilePage.css";
import { IUser } from "../../../pages/shared/interface/user.interface";

interface IntroCardProps {
  userProfile: IUser | null;
  isPrivateProfile: boolean;
}
const ProfileIntroCard: React.FC<IntroCardProps> = ({
  userProfile,
  isPrivateProfile,
}) => {
  return (
    <div>
      <div className="IntroCard card py-4">
        <div className="d-flex justify-content-start offset-1">
          <h4>Intro</h4>
        </div>
        <div className="d-flex justify-content-center">
          <p>{userProfile?.bio}</p>
        </div>
        {isPrivateProfile ? (
          <div>
            <button className="btn btn-secondary col-10">Edit bio</button>
          </div>
        ) : null}

        <div className="details my-5">
          <div className="d-flex justify-content-start">
            <i className="bi bi-mortarboard-fill icon"></i>
            <p>
              Studied at <a href="/">{userProfile?.school}</a>
            </p>
          </div>

          <div className="d-flex justify-content-start">
            <i className="bi bi-house-heart icon"></i>
            <p className="mx-1">
              Lives in <a href="/">{userProfile?.location}</a>
            </p>
          </div>

          <div className="d-flex justify-content-start ">
            <i className="bi bi-geo-alt-fill icon"></i>
            <p>
              Work at <a href="/">{userProfile?.workplace}</a>
            </p>
          </div>
          {isPrivateProfile ? (
            <div>
              <button className="btn btn-secondary col-10">Edit details</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProfileIntroCard;
