import React, { useEffect, useState } from "react";
import "./BrowseUser.css";
import { SearchProfile } from "../../../models/SearchProfile";
import ProfileImage from "../ProfileImage/ProfileImage";

type BrowseUserProps = {
  profile: SearchProfile;
};

const BrowseUser: React.FC<BrowseUserProps> = ({ profile }) => {
  useEffect(() => {
    console.log("Loading");
  }, []);
  return (
    <div className="my-2 container search-container">
      <div className="row">
        <div className="col-2 my-auto">
          {profile.thumbnail && (
            <ProfileImage
              src={profile.thumbnail}
              alt={"some stuff"}
              size={"small-med"}
            />
          )}
        </div>
        <div className="col-7 text-start my-auto">
          <p className="fw-bolder">{profile.name && profile.name}</p>
          <p>
            {profile.school && profile.school + " | "}
            {profile.workplace && profile.workplace + " | "}
            {profile.location && profile.location}
          </p>
          <p>{profile.mutualFriends} mutual friends</p>
        </div>
        <div className="col-3 my-auto">
          <button className={`btn friend-${profile.isFriend} py-2 pz-1`}>
            {profile.isFriend ? "Friend" : "Add Friend"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default BrowseUser;
