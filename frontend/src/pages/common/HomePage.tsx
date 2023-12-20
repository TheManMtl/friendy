import React from "react";
import HomeFriendRequest from "../../components/Home/FriendRequest";
import HomeRightPanel from "../../components/Home/HomeRightPanel";
import "./HomePage.css";
function HomePage() {
  return (
    <div className="container-fluid px-0 mx-0">
      <div className="row">
        <div className="col-lg-3 d-none d-lg-block ">leftpanel</div>
        <div className="col-6 ">timeline</div>
        <div className="col-lg-3 d-none d-lg-block ">
          <HomeRightPanel />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
