import React from "react";
import "./SingleFriendRequest.css";
import ProfileImage from "../common/ProfileImage/ProfileImage";
import FriendRequestBtn from "../common/FriendRequestBtn/FriendRequestBtn";
import { RequestProfile } from "../../models/RequestProfile";
import { useNavigate } from "react-router-dom";

type SingleFriendRequestProps = {
  returnNewFriend: (friend: RequestProfile | null) => void;
  friend: RequestProfile;
};

const SingleFriendRequest: React.FC<SingleFriendRequestProps> = ({
  returnNewFriend,
  friend,
}) => {
  const navigate = useNavigate();
  return (
    <div className="row">
      <div className="col-4">
        {friend.thumbnail && (
          <ProfileImage
            src={friend.thumbnail}
            alt={"testing"}
            size={"small-med"}
          />
        )}
      </div>
      <div className="col-8">
        <div className="row">
          <div
            className="col-12"
            onClick={() => navigate(`/profile/${friend.userId}`)}
          >
            {friend.name}
          </div>
          <div className="col-12">{friend.mutualFriends} mutual friends</div>

          <div className="row ml-3 mb-3">
            <div className="col-6 text-end mt-3">
              <FriendRequestBtn
                returnNewFriend={returnNewFriend}
                value={true}
                friendId={friend.userId! as number}
              />
            </div>
            <div className="col-6 text-start mt-3">
              <FriendRequestBtn
                returnNewFriend={returnNewFriend}
                value={false}
                friendId={friend.userId! as number}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleFriendRequest;
