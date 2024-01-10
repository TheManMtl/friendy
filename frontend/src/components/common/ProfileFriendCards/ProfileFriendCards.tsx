import React, { useEffect, useState } from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import { FriendListType } from "../../../types/common";
import { useNavigate } from "react-router-dom";
import useAxiosToken from "../../../hooks/useAxiosToken";
import { RequestProfile } from "../../../models/RequestProfile";
import FriendRequestBtn from "../FriendRequestBtn/FriendRequestBtn";
import "../../../pages/common/ProfilePage/ProfilePage.css";
interface ProfileFriendCardsProps {
  isPrivateProfile: boolean;
  friend: FriendListType;
  isFriendOfLoggedInUser: boolean;
  setFriends: React.Dispatch<React.SetStateAction<FriendListType[]>>;
  userId: number;
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
}
const ProfileFriendCards: React.FC<ProfileFriendCardsProps> = ({
  isPrivateProfile,
  friend,
  isFriendOfLoggedInUser,
  setFriends,
  userId,
  toggle,
  setToggle,
}) => {
  const [sentRequests, setSentRequests] = useState<number[]>([]);
  const [friendRequests, setFriendRequests] = useState<number[]>([]);

  const navigate = useNavigate();
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
  const addFriend = async (friendId: number, userId: number) => {
    try {
      if (sentRequests.includes(friendId)) {
        await axiosToken.delete(`/friends/remove`, {
          data: { id: friendId },
        });
        setSentRequests((prevRequests) =>
          prevRequests.filter((id) => id !== friendId)
        );
      } else {
        const response = await axiosToken.post("/friends/request", {
          id: friendId,
        });
        setSentRequests((prevRequests) => [...prevRequests, friendId]);
      }
    } catch (error) {
      console.error("Error sending/undoing friend request:", error);
    }
  };
  const returnNewFriend = (friend: RequestProfile | null) => {
    console.log("friend request");
    if (friend == null) {
      console.log("passing the function properly");
      setToggle(!toggle);
    }
  };
  const revokeFriendRequest = async (friendId: number) => {
    try {
      const response = await axiosToken.delete("/friends/remove", {
        data: { id: friendId },
      });
      setFriendRequests((prevFriendRequests) =>
        prevFriendRequests.filter(
          (friendRequestId) => friendRequestId !== friendId
        )
      );
      setToggle(!toggle);
      console.log("Friend request revoked successfully:", response.data);
    } catch (error) {
      console.error("Error revoking friend request:", error);
    }
  };

  useEffect(() => {
    try {
      axiosToken
        .get(`/friends/active-requests?direction=sent`)
        .then((response) => {
          setSentRequests(response.data.map((request: any) => request.userId));
        });
    } catch (error) {
      console.log(error);
    }

    try {
      axiosToken
        .get(
          `${process.env.REACT_APP_HOST_URL}/friends/active-requests?direction=received`
        )
        .then((response: any) => {
          // console.log(
          //   JSON.stringify(response.data, null, 2) + "friendsresp -> \n\n\n\n"
          // );
          setFriendRequests(
            response.data.map((request: any) => request.userId)
          );
        });
    } catch (error) {
      console.log(error);
    }
  }, [toggle]);

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
            <div className="col-4">
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
              ) : isFriendOfLoggedInUser ? null : sentRequests.includes(
                  friend.userId
                ) ? (
                //TODO:replace with undo request
                <p className="mt-4">
                  <button
                    className="btn"
                    onClick={() => revokeFriendRequest(friend.userId)}
                  >
                    Undo Request
                  </button>
                </p>
              ) : friendRequests.includes(friend.userId) ? (
                //TODO:determine if it receives the request if yes, use button accept request
                <div>
                  {" "}
                  <div className="mt-2">
                    <FriendRequestBtn
                      returnNewFriend={returnNewFriend}
                      value={true}
                      friendId={friend.userId! as number}
                    />
                  </div>
                  <div className="mt-2">
                    <FriendRequestBtn
                      returnNewFriend={returnNewFriend}
                      value={false}
                      friendId={friend.userId! as number}
                    />
                  </div>
                </div>
              ) : (
                <button
                  className="btn btn-sm btn-secondary mt-4"
                  onClick={() => addFriend(friend.userId, userId)}
                >
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
