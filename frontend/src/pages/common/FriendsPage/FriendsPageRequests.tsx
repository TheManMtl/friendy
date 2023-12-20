import React, { useEffect, useState } from 'react';
import useAxiosToken from '../../../hooks/useAxiosToken';
import FriendPanel from '../../../components/common/FriendPanel/FriendPanel';


type FriendRequest = {
  friendId: number;
  name: string;
  userId: number;
}

//TODO - switch out of hard coded user
function FriendsPageRequests({ userId }: { userId: number | undefined }) {
  const [user, setUser] = useState(null);
  const [friendRequestsSent, setFriendRequestsSent] = useState<FriendRequest[]>([]);
  const [friendRequestsReceived, setFriendRequestsReceived] = useState<FriendRequest[]>([]);
  const axiosToken = useAxiosToken();

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
  }, []);
  

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
  }, []);



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
              onClick={() => console.log(`Undo Request ${friend.name}`)}
            />
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center p-2 m-2">
        <h4>Requests Recieved</h4>
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

export default FriendsPageRequests
