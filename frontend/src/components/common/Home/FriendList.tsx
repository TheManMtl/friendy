import React, { useEffect, useState } from "react";
import { FriendsForList } from "../../../models/FriendsForList";
import HomeSingleFriend from "./SingleFriend";
import useAxiosToken from "../../../hooks/useAxiosToken";

type HomeFriendListProps = {};

const HomeFriendList: React.FC<HomeFriendListProps> = ({}) => {
  const [friends, setFriends] = useState<FriendsForList[]>([]);
  // router.get("/all/:id", friends.viewAllFriends);
  const axios = useAxiosToken();

  useEffect(() => {
    try {
      axios
        .get(`/friends/all/89`)
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
          // Each item in the array is rendered as a list item
          <HomeSingleFriend friend={friend} linkToProfile={linkToProfile} />
        ))}
    </div>
  );
};

export default HomeFriendList;
