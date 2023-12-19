import React from "react";
import HomeFriendRequest from "./FriendRequest";
import HomeFriendList from "./FriendList";

type HomeRightPanelProps = {};

// eslint-disable-next-line no-empty-pattern
const HomeRightPanel: React.FC<HomeRightPanelProps> = ({}) => (
  <>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <HomeFriendRequest id={"hello"} />
        </div>
        <div className="col-12">
          <HomeFriendList />
        </div>
      </div>
    </div>
  </>
);

export default HomeRightPanel;
