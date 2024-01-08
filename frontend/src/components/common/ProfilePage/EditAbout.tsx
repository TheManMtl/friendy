import React from "react";
import { IUser } from "../../../pages/shared/interface/user.interface";

import EditAboutItem from "./EditAboutItem";

interface ProfileAboutProps {
  userProfile: IUser | null;
  isPrivateProfile: boolean;
}

const EditAbout: React.FC<ProfileAboutProps> = ({
  userProfile,
  isPrivateProfile,
}) => {
  return (
    <div className="d-flex justify-content-center row ">
      {/* School panel */}
      <EditAboutItem
        contentName={"school"}
        contentVariable={userProfile?.school}
        isPrivateProfile={isPrivateProfile}
      />
      {/* Location Panel */}
      <EditAboutItem
        contentName={"location"}
        contentVariable={userProfile?.location}
        isPrivateProfile={isPrivateProfile}
      />
      {/* Workplace panel */}
      <EditAboutItem
        contentName={"workplace"}
        contentVariable={userProfile?.workplace}
        isPrivateProfile={isPrivateProfile}
      />
      <EditAboutItem
        contentName={"position"}
        contentVariable={userProfile?.position}
        isPrivateProfile={isPrivateProfile}
      />
      <hr></hr>
      <div className=" d-flex justify-content-start row mt-3">
        <h2 className="col-2 icon d-flex justify-content-end">Contact Info</h2>
        <EditAboutItem
          contentName={"email"}
          contentVariable={userProfile?.email}
          isPrivateProfile={isPrivateProfile}
        />
      </div>
    </div>
  );
};

export default EditAbout;
