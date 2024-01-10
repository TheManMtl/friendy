import React, { useState } from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import "./PostInput.css";

interface Props {
  src: string;
  alt: string;
  size?: string;
  openPost: () => void;
  userName?: string;
  isOtherUserProfile: boolean;
}
const PostInput: React.FC<Props> = ({ src, alt, size, openPost, userName, isOtherUserProfile }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="inputBtn row py-2">
          <div className="col-1">
            <ProfileImage src={src} alt={alt} size={size} />
          </div>
          <div className="col-11">
            {/* TODO: use modal to open post window */}
            <button className="col-11 btn-input mt-1" onClick={openPost}>
              {
                isOtherUserProfile === true && userName != null ? (
                  <>Write something to {userName}...</>
                ) : (
                  <>What's on your mind?</>
                )
              }
            </button>
          </div>
        </div>
        <hr />
        {/* <div className="row py-2">
          <div className="col-6">
            {" "}
            <a href="/profile">Photo/video</a>
          </div>
          <div className="col-6">
            {" "}
            <a href="/profile">Life event</a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PostInput;
