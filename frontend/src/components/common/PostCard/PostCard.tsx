import React from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import "./PostCard.css";

type PostCardProps = {
  profileImageSrc: string;
  time: string;
  username: string;
  content: string;
  thumbnailUrl?: string;
}

const PostCard: React.FC<PostCardProps> = (props) => {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="row card-title">
            <div className="col-1">
              <ProfileImage
                src={props.profileImageSrc}
                alt="profile"
                size="small"
              />
            </div>
            <div className="col-11 ">
              <div className="d-flex justify-content-start">
                <h5>{props.username}</h5>
              </div>
              <div className="d-flex justify-content-start">
                <p className="smallText">{props.time}</p>
              </div>
            </div>
          </div>
          <div className="card-content container">
            <p className="text-left-custom">
              {props.content}
            </p>
            {props.thumbnailUrl && (
              <div className="card-img">
                <img
                  src={props.thumbnailUrl}
                  className="card-img-top"
                  alt="Post Thumbnail"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
