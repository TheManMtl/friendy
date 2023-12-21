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

function FriendsPageList({ userId }: { userId: number}) {
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

  const addFriend = async (friendId: number, userId: number) => {
    try {
      if (sentRequests.includes(friendId)) {
        await axios.delete(`/remove`, {
          data: { rid: userId, id: friendId }
        });
        setSentRequests((prevRequests) => prevRequests.filter((id) => id !== friendId));
      } else {
        const response = await axios.post('/friends/request', {
          rid: userId,
          id: friendId,
        });
        setSentRequests((prevRequests) => [...prevRequests, friendId]);
      }
    } catch (error) {
      console.error('Error sending/undoing friend request:', error);
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
              buttonText={sentRequests.includes(friend.userId) ? 'Undo Request' : 'Add Friend'}
              onClick={() => addFriend(friend.userId, userId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FriendsPageList;
