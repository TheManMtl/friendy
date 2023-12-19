import React from "react";
import "./FriendRequest.css";
import ProfileImage from "../common/ProfileImage/ProfileImage";

type HomeFriendRequestProps = {
  id: string;
};

const HomeFriendRequest: React.FC<HomeFriendRequestProps> = ({ id }) => (
  <div className="container">
    <div className="row ">
      <div className="col-12 ">
        <div className="row">
          <div className="col-6">
            <p className="text-start ms-4">Friend requests</p>
          </div>
          <div className="col-6">
            <p className="text-end me-4">See all</p>
          </div>
        </div>
      </div>
      <div className="col-4">
        <ProfileImage
          src={
            "https://scontent-ord5-1.xx.fbcdn.net/v/t1.18169-9/28379432_10157297850924552_2972732071966056584_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=be3454&_nc_ohc=VFMsdzCJOV4AX9tq6zf&_nc_ht=scontent-ord5-1.xx&oh=00_AfABzFekE7O0O31mPQze_d9YTKCi4yBTFqkuHWfTFl-9Rw&oe=65A8A9DA"
          }
          alt={"testing"}
          size={"small-med"}
        />{" "}
      </div>
      <div className="col-8">
        <div className="row">
          <div className="col-12">Name</div>
          <div className="col-12">Mutuals</div>
          <div className="col-6">confirm</div>
          <div className="col-6">delete</div>
        </div>
      </div>
    </div>
  </div>
);

export default HomeFriendRequest;
