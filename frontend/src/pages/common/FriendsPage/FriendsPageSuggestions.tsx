import React, { useEffect, useState } from 'react';
import axios from "axios";
import FriendPanel from '../../../components/common/FriendPanel/FriendPanel';

type SuggestedFriend = {
  userId: number;
  name: string;
  thumbnail: string | null;
  profileImgId: number | null;
};

function FriendsPageSuggestions() {
  const [suggestedFriends, setSuggestedFriends] = useState<SuggestedFriend[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = '5';
        const response = await axios.get(`http://localhost:8080/api/friends/suggested/${userId}`);
        setSuggestedFriends(response.data);
      } catch (error) {
        console.error('Could not retrieve suggested friends:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <div>
      <div>
        <div className="d-flex justify-content-between align-items-center p-2 m-2">
          <h4>Suggested Friends (by school)</h4>
        </div>
        <div className="panel-grid">
          {suggestedFriends.map((friend, index) => (
            <FriendPanel
              key={index}
              friend={friend}
              buttonText="Add Friend"
              onClick={() => console.log(`Add Friend ${friend.name}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FriendsPageSuggestions;
