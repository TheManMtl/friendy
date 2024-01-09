import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import { FriendListType } from "../../../types/common";
interface ProfileFriendCardsProps {
  isPrivateProfile: boolean;
  friend: FriendListType;
}
const ProfileFriendCards: React.FC<ProfileFriendCardsProps> = ({
  isPrivateProfile,
  friend,
}) => {
  return (
    <div className="col-md-6 mb-4">
      <div className="card">
        <div className="card-body">
          <div className="row card-title">
            <div className="col-3">
              <a className="nav-link" href={`/#profile/${friend.userId}`}>
                <ProfileImage
                  src={friend.thumbnail}
                  alt="profile"
                  size="small-med"
                />
              </a>
            </div>

            <div className="col-7 d-flex">
              <div className="mt-4">{friend.name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFriendCards;
