import React, { useEffect, useState } from "react";
import { FriendsForList } from "../../models/FriendsForList";
import axios from "axios";
import HomeSingleFriend from "./SingleFriend";

type HomeFriendListProps = {};

const HomeFriendList: React.FC<HomeFriendListProps> = ({}) => {
  const [friends, setFriends] = useState<FriendsForList[]>([]);

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_HOST_URL}/friends/all/89`)
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
  }, []);

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
