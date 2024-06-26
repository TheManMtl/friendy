import React from 'react';
import { Button } from '../../../components/common';
import ProfileImage from '../ProfileImage/ProfileImage';
import { useNavigate } from 'react-router-dom';

type FriendPanelProps = {
  key: number;
  friend: {
    userId: number;
    name: string;
    thumbnail: string;
  };
  buttonText: string;
  onClick: () => void;
  profileImgUrl?: string;
};

const FriendPanel: React.FC<FriendPanelProps> = ({ key, friend, buttonText, onClick, profileImgUrl }) => {
  const navigate = useNavigate();

  const handleNameClick = () => {
    navigate(`/profile/${friend.userId}`);
  };

  const buttonClass = buttonText === 'Undo Request' || buttonText === 'Remove Friend' ? 'yellow' : 'blue';

  return (
    <div
      key={key}
      className="panel justify-content-center align-items-center"
      style={{ backgroundImage: `url(${friend.thumbnail})`, position: 'relative' }}
    >
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="friendName">
        <div className="panel-btn-anchor">
          <h5 className="mb-4" onClick={handleNameClick}>
            {friend.name}
          </h5>
          <Button label={buttonText} variant={buttonClass} onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default FriendPanel;

