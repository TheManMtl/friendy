import React, { useEffect, useState } from 'react';
import FriendPanel from '../../../components/common/FriendPanel/FriendPanel';
import useAxiosToken from '../../../hooks/useAxiosToken';

type FriendList = {
  friendId: number;
  name: string;
  userId: number;
  friendsSince: Date;
  thumbnail: string;
};

function FriendsPageList({ userId }: { userId: number }) {
  const [friends, setFriends] = useState<FriendList[]>([]);
  const [sentRequests, setSentRequests] = useState<number[]>([]);
  const axios = useAxiosToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/friends/all/${userId}`);
        setFriends(response.data);
      } catch (error) {
        console.error('Could not retrieve friends list:', error);
      }
    };

    fetchData();
  }, [userId, axios]);

  const removeFriend = async (userId: number) => {
    try {
      await axios.delete(`/friends/remove`, {
        data: { id: userId }
      });
      setFriends((prevFriends) => prevFriends.filter((friend) => friend.userId !== userId));
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between align-items-center p-2 m-2">
          <h4>Your friends</h4>
        </div>
        <div className="panel-grid">
          {friends.map((friend, index) => (
            <FriendPanel
              key={index}
              friend={friend}
              buttonText="Remove Friend"
              onClick={() => removeFriend(friend.userId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FriendsPageList;
