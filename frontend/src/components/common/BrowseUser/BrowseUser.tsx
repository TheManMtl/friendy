import React, { useEffect, useState } from "react";
import "./BrowseUser.css";
import { SearchProfile } from "../../../models/SearchProfile";
import ProfileImage from "../ProfileImage/ProfileImage";
import { useNavigate } from "react-router-dom";
import { RequestProfile } from "../../../models/RequestProfile";
import FriendRequestBtn from "../FriendRequestBtn/FriendRequestBtn";

type BrowseUserProps = {
  profile: SearchProfile;
  requestedByUser: number[];
  requestedToUser: number[];
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
};

const BrowseUser: React.FC<BrowseUserProps> = ({
  profile,
  requestedByUser,
  requestedToUser,
  toggle,
  setToggle,
}) => {
  const [isRequestor, setisRequestor] = useState<boolean>(false);
  const [isRequested, setisRequested] = useState<boolean>(false);
  useEffect(() => {
    console.log("Loading");
    for (let id of requestedByUser) {
      console.log(id + " BY");
    }
    for (let id of requestedToUser) {
      console.log(id + " TO");
    }
    console.log("IS TRYE OR FALSE?!" + requestedByUser.includes(profile.id));
    setisRequestor(requestedByUser.includes(profile.id));
    setisRequested(requestedToUser.includes(profile.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedByUser, requestedToUser]);
  const navigate = useNavigate();

  const returnNewFriend = (friend: RequestProfile | null) => {
    console.log("friend request");
    if (friend == null) {
      console.log("passing the function properly");
      setToggle(!toggle);
    }
  };
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
          <p
            className="fw-bolder"
            onClick={() => navigate(`/profile/${profile.id}`)}
          >
            {profile.name && profile.name}
          </p>
          <p>
            {profile.school && profile.school + " | "}
            {profile.workplace && profile.workplace + " | "}
            {profile.location && profile.location}
          </p>
          <p>{profile.mutualFriends} mutual friends</p>
        </div>
        <div className="col-3 my-auto">
          {!isRequested && !isRequestor ? (
            <button className={`btn friend-${profile.isFriend} py-2 pz-1`}>
              {profile.isFriend ? "Friend" : "Add Friend"}
            </button>
          ) : isRequestor ? (
            <div>Friend request sent</div>
          ) : (
            <div>
              <p>Friend Request</p>
              <FriendRequestBtn
                value={true}
                returnNewFriend={returnNewFriend}
                friendId={profile.id}
              />
              <FriendRequestBtn
                value={false}
                returnNewFriend={returnNewFriend}
                friendId={profile.id}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default BrowseUser;
