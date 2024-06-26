import React, { useEffect, useState } from "react";
import ProfileImage from "../../../components/common/ProfileImage/ProfileImage";
import ProfileFriendCards from "../../../components/common/ProfileFriendCards/ProfileFriendCards";
import useAxiosToken from "../../../hooks/useAxiosToken";
import { FriendListType } from "../../../types/common";
import { RequestProfile } from "../../../models/RequestProfile";

interface ProfilePageFriendProps {
  isPrivateProfile: boolean;
  paramUserId: string | undefined;
  userId: string | undefined;
}

const ProfilePageFriend: React.FC<ProfilePageFriendProps> = ({
  isPrivateProfile,
  paramUserId,
  userId,
}) => {
  //fetch all the friends of the paramId user
  const axiosToken = useAxiosToken();
  const [friends, setFriends] = useState<FriendListType[]>([]);
  const [loggedinUserFriends, setLoggedinUserFriends] = useState<
    FriendListType[]
  >([]);
  const [toggle, setToggle] = useState<boolean>(true);

  // Array to store logged-in user friends' IDs
  const [loggedinUserFriendsIds, setLoggedinUserFriendsIds] = useState<
    number[]
  >([]);

  const returnNewFriend = (friend: RequestProfile | null) => {
    console.log("friend request");
    if (friend == null) {
      console.log("passing the function properly");
      setToggle(!toggle);
    }
  };

  console.log("=====Friend Sub Page param Id====" + paramUserId);

  useEffect(() => {
    try {
      axiosToken
        .get(`/friends/all/${paramUserId}`)
        .then((response: any) => {
          const friendsList = response.data;
          setFriends(friendsList);
        })
        .catch((error: any) => {
          console.log("==error for getting param users friends===" + error);
        });

      axiosToken
        .get(`/friends/all/${userId}`)
        .then((response: any) => {
          setLoggedinUserFriends(response.data);

          // Extract IDs and update the state
          const friendsIds = response.data
            .map((friend: FriendListType) => friend.userId)
            .filter(
              (friendId: number) => friendId !== parseInt(userId || "", 10)
            );

          setLoggedinUserFriendsIds(friendsIds);
        })
        .catch((error: any) => {
          console.log("==error for getting param users friends===" + error);
        });
    } catch (error) {
      console.log(error);
    }
  }, [toggle]);
  return (
    <div>
      <div className="contentSection row mt-1 px-5 py-3 d-flex justify-content-center">
        <div className="card col-10">
          <div className="card-body">
            <div className="title justify-content-start d-flex mt-1">
              <h2>Friends</h2>
            </div>
            <hr />
            <div className="row d-flex">
              {friends.map((friend, index) => {
                let isFriendOfLoggedInUser = loggedinUserFriendsIds.includes(
                  friend.userId
                );
                //remove add friend button to the logged in user himself
                if (friend.userId === parseInt(userId || "", 10)) {
                  isFriendOfLoggedInUser = true;
                }
                return (
                  <React.Fragment key={index}>
                    <ProfileFriendCards
                      isPrivateProfile={isPrivateProfile}
                      friend={friend}
                      setFriends={setFriends}
                      isFriendOfLoggedInUser={isFriendOfLoggedInUser}
                      userId={parseInt(userId || "", 10)}
                      toggle={toggle}
                      setToggle={setToggle}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageFriend;
