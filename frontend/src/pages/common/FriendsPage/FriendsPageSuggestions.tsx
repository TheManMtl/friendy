import React, { useEffect, useState } from 'react';
import useAxiosToken from '../../../hooks/useAxiosToken';
import FriendPanel from '../../../components/common/FriendPanel/FriendPanel';

type SuggestedFriend = {
  userId: number;
  name: string;
  thumbnail: string | null;
  profileImgId: number | null;
};

function FriendsPageSuggestions({ userId }: { userId: number }) {
  const [suggestedFriendsBySchool, setSuggestedFriendsBySchool] = useState<SuggestedFriend[]>([]);
  const [suggestedFriendsByLocation, setSuggestedFriendsByLocation] = useState<SuggestedFriend[]>([]);
  const [sentRequests, setSentRequests] = useState<number[]>([]);
  const axios = useAxiosToken();

  // my current setup for filtering by school/location and checking if they're previously sent friend requests
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Authenticated User Id: " + userId);

        const responseSchool = await axios.get(`/friends/suggested-school/${userId}`);
        setSuggestedFriendsBySchool(responseSchool.data);

        const responseLocation = await axios.get(`/friends/suggested-location/${userId}`);
        setSuggestedFriendsByLocation(responseLocation.data);

        const sentRequestsResponse = await axios.get(`/friends/requests/sent`);
        setSentRequests(sentRequestsResponse.data.map((request: any) => request.requestedToId));
      } catch (error: any) {
        console.error('Could not retrieve suggested friends:', error.response?.data || error.message);
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
          <h4>Suggested Friends (by school)</h4>
        </div>
        <div className="panel-grid">
          {suggestedFriendsBySchool.map((friend, index) => (
            <FriendPanel
              key={index}
              friend={friend}
              buttonText={sentRequests.includes(friend.userId) ? 'Undo Request' : 'Add Friend'}
              onClick={() => addFriend(friend.userId, userId ?? 0)}
            />
          ))}
        </div>
        <br />
        <div className="d-flex justify-content-between align-items-center p-2 m-2">
          <h4>Suggested Friends (by location)</h4>
        </div>
        <div className="panel-grid">
          {suggestedFriendsByLocation.map((friend, index) => (
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

export default FriendsPageSuggestions;
