import React from 'react';
import { Button } from '../../../components/common';

type FriendPanelProps = {
  key: number;
  friend: { name: string };
  buttonText: string;
  onClick: () => void;
};

const FriendPanel: React.FC<FriendPanelProps> = ({ key, friend, buttonText, onClick }) => (
  <div key={key} className="panel justify-content-center align-items-center" style={{ backgroundImage: `url('https://picsum.photos/200/200?random=${key}')` }}>
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
