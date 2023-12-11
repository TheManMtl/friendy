import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import "./PostInput.css";

interface Props {
  src: string;
  alt: string;
  size?: string;
}
const PostInput: React.FC<Props> = ({ src, alt, size }) => {
  return (
    <div className="card">
      <div className="inputBtn row py-2">
        <div className="col-1">
          <ProfileImage src={src} alt={alt} size={size} />
        </div>
        <div className="col-11">
          <a href="/profile">
            <button className="col-11 btn-input mt-1">
              What's on your mind?
            </button>
          </a>
        </div>
      </div>
      <hr />
      <div className="row py-2">
        <div className="col-6">
          {" "}
          <a href="/profile">Photo/video</a>
        </div>
        <div className="col-6">
          {" "}
          <a href="/profile">Life event</a>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
