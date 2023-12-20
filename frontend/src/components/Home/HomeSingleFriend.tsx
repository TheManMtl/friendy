import React from "react";
import { FriendsForList } from "../../models/FriendsForList";
import ProfileImage from "../common/ProfileImage/ProfileImage";
import "./SingleFriend.css";
import { useNavigate } from "react-router-dom";

type HomeSingleFriendProps = {
  friend: FriendsForList;
  linkToProfile: (id: number) => void;
};

const HomeSingleFriend: React.FC<HomeSingleFriendProps> = ({
  friend,
  linkToProfile,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="container"
      onClick={() => navigate(`/profile/${friend.userId}`)}
    >
      <div className="row">
        <div
          onClick={() => {
            linkToProfile(friend.userId);
          }}
          className="friend-container col-12"
        >
          {friend.thumbnail && (
            <span className="my-auto">
              <ProfileImage
                src={friend.thumbnail}
                alt={"testing"}
                size={"small"}
              />
            </span>
          )}

          <span className="my-auto">{friend.name}</span>
        </div>
      </div>
    </div>
  );
};
export default HomeSingleFriend;
