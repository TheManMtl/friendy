import React, { useEffect, useState } from 'react';
import { axiosToken } from '../../../services/api/axios'; 
import { Constants } from '../../../data/constants';
import FriendPanel from '../../../components/common/FriendPanel/FriendPanel';
import useAxiosToken from '../../../hooks/useAxiosToken';

type FriendList = {
    friendId: number;
    name: string;
    userId: number;
    friendsSince: Date;
    profileImgId: number | null;
}

function FriendsPageList() {
    const [user, setUser] = useState(null);
    const [friends, setFriends] = useState<FriendList[]>([]);
    const axios = useAxiosToken();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = '5';
                const response = await axios.get(`/friends/all/${userId}`);
                setFriends(response.data);
            } catch (error) {
                console.error('Could not retrieve friends list:', error);
            }
        };

        fetchData();
    }, []);

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
                            buttonText="Add Friend"
                            onClick={() => console.log(`Add Friend ${friend.name}`)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FriendsPageList;
