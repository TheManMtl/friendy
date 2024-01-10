import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import { FriendListType } from "../../../types/common";
import { useNavigate } from "react-router-dom";
import { isPromise } from "util/types";
import { Button } from "../../../components/common";
import useAxiosToken from "../../../hooks/useAxiosToken";

interface ProfileFriendCardsProps {
  isPrivateProfile: boolean;
  friend: FriendListType;
  isFriendOfLoggedInUser: boolean;
  setFriends: React.Dispatch<React.SetStateAction<FriendListType[]>>;
}
const ProfileFriendCards: React.FC<ProfileFriendCardsProps> = ({
  isPrivateProfile,
  friend,
  isFriendOfLoggedInUser,
  setFriends,
}) => {
  const buttonText = "Remove Friend";
  const navigate = useNavigate();
  const buttonClass = buttonText === "Remove Friend" ? "yellow" : "blue";
  const axiosToken = useAxiosToken();
  const navigateAndRefresh = (path: any) => {
    navigate(path);
    window.location.reload();
  };

  const removeFriend = async (userId: number) => {
    try {
      await axiosToken.delete(`/friends/remove`, {
        data: { id: userId },
      });
      setFriends((prevFriends: any) =>
        prevFriends.filter(
          (friend: { userId: number }) => friend.userId !== userId
        )
      );
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  const handleRemoveFriend = (userId: number) => {
    const shouldRemove = window.confirm(
      "Are you sure you want to remove this friend?"
    );
    if (shouldRemove) {
      removeFriend(userId);
    }
  };
  return (
    <div className="col-md-6 mb-4">
      <div className="card">
        <div className="card-body">
          <div className="row card-title">
            <div className="col-3">
              <div
                className="container"
                onClick={() => navigateAndRefresh(`/profile/${friend.userId}`)}
              >
                {" "}
                <ProfileImage
                  src={friend.thumbnail}
                  alt="profile"
                  size="small-med"
                />
              </div>
            </div>
            <div className="col-5 d-flex">
              <div className="mt-4 mx-2">{friend.name}</div>
            </div>
            <div className="col-3">
              {" "}
              {isPrivateProfile ? (
                <div>
                  <button
                    className="btn btn-sm btn-secondary mt-4"
                    onClick={() => handleRemoveFriend(friend.userId)}
                  >
                    Remove Friend
                  </button>
                </div>
              ) : isFriendOfLoggedInUser ? null : (
                <button className="btn btn-sm btn-secondary mt-4">
                  Add Friend
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFriendCards;
