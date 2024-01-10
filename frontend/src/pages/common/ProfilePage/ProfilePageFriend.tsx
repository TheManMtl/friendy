import React, { useEffect, useState } from "react";
import ProfileImage from "../../../components/common/ProfileImage/ProfileImage";
import ProfileFriendCards from "../../../components/common/ProfileFriendCards/ProfileFriendCards";
import useAxiosToken from "../../../hooks/useAxiosToken";
import { FriendListType } from "../../../types/common";

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
  // Array to store logged-in user friends' IDs
  const [loggedinUserFriendsIds, setLoggedinUserFriendsIds] = useState<
    number[]
  >([]);

  console.log("=====Friend Sub Page param Id====" + paramUserId);

  useEffect(() => {
    try {
      axiosToken
        .get(`/friends/all/${paramUserId}`)
        .then((response: any) => {
          setFriends(response.data);
        })
        .catch((error: any) => {
          console.log("==error for getting param users friends===" + error);
        });

      axiosToken
        .get(`/friends/all/${userId}`)
        .then((response: any) => {
          setLoggedinUserFriends(response.data);

          // Extract IDs and update the state
          const friendsIds = response.data.map(
            (friend: FriendListType) => friend.userId
          );
          setLoggedinUserFriendsIds(friendsIds);
        })
        .catch((error: any) => {
          console.log("==error for getting param users friends===" + error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
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
                const isFriendOfLoggedInUser = loggedinUserFriendsIds.includes(
                  friend.userId
                );
                return (
                  <React.Fragment key={index}>
                    <ProfileFriendCards
                      isPrivateProfile={isPrivateProfile}
                      friend={friend}
                      setFriends={setFriends}
                      isFriendOfLoggedInUser={isFriendOfLoggedInUser}
                    />
                  </React.Fragment>
                );
              })}
              {/* {friends.map((friend, index) => (
                              

                <ProfileFriendCards
                  key={index}
                  isPrivateProfile={isPrivateProfile}
                  friend={friend}
                />
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageFriend;
