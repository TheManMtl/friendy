import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/common';

type Friend = {
    friendId: number;
    name: string;
    userId: number;
    friendsSince: Date;
}

function FriendsPageList() {
    const [user, setUser] = useState(null);
    const [friends, setFriends] = useState<Friend[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = '101';
                const friendsResponse = await fetch(`http://localhost:8080/api/friends/all/${userId}`);
                const friendsData = await friendsResponse.json();
                setFriends(friendsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const friendPanels = friends.map((friend, index) => (
        <div key={index} className="panel justify-content-center align-items-center" style={{ backgroundImage: `url('https://picsum.photos/200/200?random=${index}')` }}>
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <div className="friendName">
                <h5 className="mb-4">{friend.name}</h5>
                <Button
                    label="Remove Friend"
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
                    <h4>Your friends</h4>
                </div>
                <div className="panel-grid">
                    {friendPanels}
                </div>
            </div>
        </div>
    );
}

export default FriendsPageList;
