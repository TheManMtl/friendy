import React, { useEffect, useState } from "react";
import HomeFriendRequest from "./FriendRequest";
import HomeFriendList from "./FriendList";

type HomeRightPanelProps = {};

// eslint-disable-next-line no-empty-pattern
const HomeRightPanel: React.FC<HomeRightPanelProps> = ({}) => {
  const [toggle, setToggle] = useState<boolean>(true);
  useEffect(() => {}, [toggle]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <HomeFriendRequest
              id={"hello"}
              toggle={toggle}
              setToggle={setToggle}
            />
          </div>
          <div className="col-12">
            <HomeFriendList toggle={toggle} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeRightPanel;
