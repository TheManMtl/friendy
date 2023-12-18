import React, { useEffect, useState } from "react";
import { FriendsForList } from "../../../models/FriendsForList";

type HomeFriendListProps = {
  id: string;
};

const HomeFriendList: React.FC<HomeFriendListProps> = ({ id }) => {
  const [friends, setFriends] = useState<FriendsForList[]>([]);

  useEffect(() => {}, [friends]);
  return <div>hello</div>;
};

export default HomeFriendList;
