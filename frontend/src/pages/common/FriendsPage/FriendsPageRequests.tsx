import React, { useEffect, useState } from 'react';
import FriendPanel from '../../../components/common/FriendPanel/FriendPanel';
import useAxiosToken from '../../../hooks/useAxiosToken';

type FriendRequest = {
  friendId: number;
  name: string;
  userId: number;
  thumbnail: string;
};

function FriendsPageRequests({ userId }: { userId: number }) {
  const [friendRequestsSent, setFriendRequestsSent] = useState<FriendRequest[]>([]);
  const [friendRequestsReceived, setFriendRequestsReceived] = useState<FriendRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<number[]>([]);
  const axiosToken = useAxiosToken();

  const revokeFriendRequest = async (friendId: number) => {
    try {
      const response = await axiosToken.delete('/friends/remove', {
        data: { id: friendId },
      });
      console.log('Friend request revoked successfully:', response.data);
      window.alert("friend request removed - todo: make this panel *disappear* when you remove request ;)")
    } catch (error) {
      console.error('Error revoking friend request:', error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosToken.get(`/friends/active-requests?direction=received`);
        setFriendRequestsReceived(response.data);
      } catch (error) {
        console.error('Could not find active friend requests:', error);
      }
    };

    fetchData();
  }, [axiosToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosToken.get(`/friends/active-requests?direction=sent`);
        setFriendRequestsSent(response.data);
      } catch (error) {
        console.error('Could not find active friend requests:', error);
      }
    };

    fetchData();
  }, [axiosToken]);

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between align-items-center p-2 m-2">
          <h4>Requests Sent</h4>
        </div>
        <div className="panel-grid">
          {friendRequestsSent.map((friend, index) => (
            <FriendPanel
              key={index}
              friend={friend}
              buttonText="Undo Request"
              onClick={() => revokeFriendRequest(friend.userId)}
            />
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center p-2 m-2">
        <h4>Requests Received</h4>
      </div>
      <div className="panel-grid">
        {friendRequestsReceived.map((friend, index) => (
          <FriendPanel
            key={index}
            friend={friend}
            buttonText="Accept Request"
            onClick={() => console.log(`Accept Request ${friend.name}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default FriendsPageRequests;
