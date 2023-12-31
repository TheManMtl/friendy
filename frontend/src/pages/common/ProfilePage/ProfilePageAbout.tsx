import React, { useState } from "react";
import EditAbout from "../../../components/common/ProfilePage/EditAbout";
import { IUser } from "../../shared/interface/user.interface";

interface ProfileAboutProps {
  userProfile: IUser | null;
  isPrivateProfile: boolean;
}

const ProfilePageAbout: React.FC<ProfileAboutProps> = ({
  userProfile,
  isPrivateProfile,
}) => {
  return (
    <div>
      <div className="contentSection row mt-1 px-5 py-3 d-flex justify-content-center">
        <div className="card col-10">
          <div className="card-body">
            <div className="title justify-content-start d-flex mt-1">
              <h2>About</h2>
            </div>
            <hr />
            <EditAbout
              userProfile={userProfile}
              isPrivateProfile={isPrivateProfile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageAbout;
