import React from "react";
import { FriendsForList } from "../../../models/FriendsForList";
import ProfileImage from "../ProfileImage/ProfileImage";
import "./SingleFriend.css";

type HomeSingleFriendProps = {
  friend: FriendsForList;
  linkToProfile: (id: number) => void;
};

const HomeSingleFriend: React.FC<HomeSingleFriendProps> = ({
  friend,
  linkToProfile,
}) => (
  <div className="container">
    <div className="row">
      <div
        onClick={() => {
          linkToProfile(friend.userId);
        }}
        className="friend-container col-12"
      >
        <span className="my-auto">
          <ProfileImage
            src={
              "https://scontent-ord5-1.xx.fbcdn.net/v/t1.18169-9/28379432_10157297850924552_2972732071966056584_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=be3454&_nc_ohc=VFMsdzCJOV4AX9tq6zf&_nc_ht=scontent-ord5-1.xx&oh=00_AfABzFekE7O0O31mPQze_d9YTKCi4yBTFqkuHWfTFl-9Rw&oe=65A8A9DA"
            }
            alt={"testing"}
            size={"small"}
          />
        </span>

        <span className="my-auto">{friend.name}</span>
      </div>
    </div>
  </div>
);

export default HomeSingleFriend;
