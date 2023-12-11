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
          <button className="col-11 btn btn-input mt-1">
            <a href="/profile"> What's on your mind?</a>
          </button>
        </div>
      </div>
      <hr />
      <div className="row " style={{ flexDirection: "row" }}>
        <p>Live video</p>
        <p>Photos</p>
      </div>
    </div>
  );
};

export default PostInput;
