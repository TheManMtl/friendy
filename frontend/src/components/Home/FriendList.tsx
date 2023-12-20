import React, { useEffect, useState } from "react";
import { FriendsForList } from "../../models/FriendsForList";
import axios from "axios";
import HomeSingleFriend from "./HomeSingleFriend";

type HomeFriendListProps = {
  toggle: boolean;
};

const HomeFriendList: React.FC<HomeFriendListProps> = ({ toggle }) => {
  const [friends, setFriends] = useState<FriendsForList[]>([]);

  useEffect(() => {
    console.log("FRIEND RERENDERED");
    try {
      axios
        .get(`${process.env.REACT_APP_HOST_URL}/friends/all/101`)
        .then((response: any) => {
          console.log(
            JSON.stringify(response.data, null, 2) + "friendsresp -> \n\n\n\n"
          );
          setFriends(response.data);
        });
    } catch (error: any) {
      console.error("Error during login:", error.message);
      alert("An error occurred during login. Please try again.");
    }
  }, [toggle]);

  const linkToProfile = (id: number) => {
    console.log(id);
  };
  return (
    <div className=" me-auto">
      {friends &&
        friends.length > 0 &&
        friends.map((friend, index) => (
          <HomeSingleFriend friend={friend} linkToProfile={linkToProfile} />
        ))}
    </div>
  );
};

export default HomeFriendList;
