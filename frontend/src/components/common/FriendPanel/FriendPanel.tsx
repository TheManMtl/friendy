import React from 'react';
import { Button } from '../../../components/common';
import ProfileImage from '../ProfileImage/ProfileImage';

type FriendPanelProps = {
  key: number;
  friend: {
    name: string;
    thumbnail: string
  };
  buttonText: string;
  onClick: () => void;
  profileImgUrl?: string;
};

const FriendPanel: React.FC<FriendPanelProps> = ({ key, friend, buttonText, onClick, profileImgUrl }) => (
  <div key={key} className="panel justify-content-center align-items-center" style={{ backgroundImage: `url(${friend.thumbnail})` }}>
    <br></br><br></br><br></br><br></br><br></br><br></br>
    <div className="friendName">
      <h5 className="mb-4">{friend.name}</h5>
      <Button
        label={buttonText}
        variant="default"
        onClick={onClick}
      />
    </div>

  </div>
);

export default FriendPanel;
