import React from "react";
import HomeFriendRequest from "../../components/common/Home/FriendRequest";

function HomePage() {
  return (
    <div className="container px-0 mx-0">
      <div className="row">
        <div className="col-3">leftpanel</div>
        <div className="col-6">timeline</div>
        <div className="col-3">
          <HomeFriendRequest id={"hello"} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
