import React, { useEffect, useState } from "react";
import "./FriendRequest.css";
import ProfileImage from "../common/ProfileImage/ProfileImage";
import FriendRequestBtn from "../common/FriendRequestBtn/FriendRequestBtn";
import { RequestProfile } from "../../models/RequestProfile";
import SingleFriendRequest from "./SingleFriendRequest";
import useAxiosToken from "../../hooks/useAxiosToken";
import { useNavigate } from "react-router-dom";

type HomeFriendRequestProps = {
  id: string;
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
};

const HomeFriendRequest: React.FC<HomeFriendRequestProps> = ({
  id,
  toggle,
  setToggle,
}) => {
  const [friendRequests, setFriendRequests] = useState<RequestProfile[]>([]);
  const [rerender, setRerender] = useState<boolean>(true);
  const axiosToken = useAxiosToken();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("REQUEST RERENDRED");
    try {
      axiosToken

        .get(
          `${process.env.REACT_APP_HOST_URL}/friends/active-requests?direction=received`
        )
        .then((response: any) => {
          // console.log(
          //   JSON.stringify(response.data, null, 2) + "friendsresp -> \n\n\n\n"
          // );
          setFriendRequests(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [toggle]);

  const returnNewFriend = (friend: RequestProfile | null) => {
    console.log("friend request");
    if (friend == null) {
      console.log("passing the function properly");
      setToggle(!toggle);
    }
  };

  return (
    <div className="container">
      <hr />
      <div className="row ">
        <div className="col-12 mb-3">
          <div className="row">
            <div className="col-6">
              <p className="text-start ms-4">Friend requests</p>
            </div>
            <div className="col-6">
              <p
                className="text-end me-4"
                onClick={() => navigate(`/friends/requests`)}
              >
                See all
              </p>
            </div>
          </div>
        </div>
        {friendRequests && friendRequests.length > 0 && (
          <SingleFriendRequest
            returnNewFriend={returnNewFriend}
            friend={friendRequests[0]}
          />
        )}
        {friendRequests && friendRequests.length > 1 && (
          <SingleFriendRequest
            returnNewFriend={returnNewFriend}
            friend={friendRequests[1]}
          />
        )}
      </div>
      <hr />
    </div>
  );
};
export default HomeFriendRequest;
