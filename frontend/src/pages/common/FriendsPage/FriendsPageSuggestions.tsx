import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/common';

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
        const userId = '1'; // Still testing hard coded - this is per school right now!
        const suggestionsResponse = await fetch(`http://localhost:8080/api/friends/suggested/${userId}`);
        const suggestionsData = await suggestionsResponse.json();
        setSuggestedFriends(suggestionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const friendPanels = suggestedFriends.map((friend, index) => (
    <div key={index} className="panel justify-content-center align-items-center" style={{ backgroundImage: `url('https://picsum.photos/200/200?random=${index}')` }}>
      <br></br><br></br><br></br><br></br><br></br><br></br>
      <div className="friendName">
        <h5 className="mb-4">{friend.name}</h5>
        <Button
          label="Add Friend"
          variant="default"
          onClick={() => console.log(`Add Friend ${friend.name}`)}
        />
      </div>
    </div>
  ));

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between align-items-center p-2 m-2">
          <h4>Suggested Friends (by school)</h4>
        </div>
        <div className="panel-grid">
          {friendPanels}
        </div>
      </div>
    </div>
  );
}

export default FriendsPageSuggestions;
