import React, { useEffect, useState } from "react";

import "./ImagePostDisplay.css";
import useAxiosToken from "../../../hooks/useAxiosToken";
import ProfileImage from "../../../components/common/ProfileImage/ProfileImage";
import {
  HandThumbsUpFill,
  HandThumbsUp,
  ChatFill,
  Chat,
} from "react-bootstrap-icons";
import Comment from "../../../components/common/Comment/Comment";
import { Profile } from "../../../models/Profile";
import { SinglePost } from "../../../models/SinglePost";
type ImagePostContentProps = {
  user: Profile;
  post: SinglePost;
};

const ImagePostContent: React.FC<ImagePostContentProps> = ({ user, post }) => {
  const axiosToken = useAxiosToken();

  return (
    <div className="image-post-content-scroll">
      <div className="row p-5 ">
        <div className="col-12">
          <div className="row my-3 text-start">
            <div className="col-2 my-auto profile-thumbnail">
              <ProfileImage
                src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-focus-face.jpg?auto=avif,webp&format=jpg&width=944"
                alt="profile image"
                size="small-small-med"
              />
            </div>
            <div className="col-10">
              <div className="row text-start basic-info">
                <div className="col-12 fw-bolder display-text">
                  {user && user.name && user!.name}
                </div>
                <div className="col-12 display-text">8h</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 text-start display-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In unde cum
          esse fuga quasi illum incidunt recusandae nihil, minus vero, ex,
          necessitatibus eum culpa. Nostrum itaque voluptates nemo vitae
          ducimus!
        </div>
        <div className="col-12 mt-4 ">
          <div className="row">
            <div className="col-6 text-start ps-4">
              <HandThumbsUpFill size={25} />
              <span className="ms-2 display-text">834</span>
            </div>
            <div className="col-6 text-end pe-4">
              <span className="me-2 display-text">93</span>
              <ChatFill size={25} />
            </div>
          </div>
        </div>

        <div className="col-12 py-2 my-3 interact-options">
          <div className="row">
            <div className="col-6 text-center ps-5">
              <HandThumbsUp size={30} /> <span className="ms-2">Like</span>
            </div>
            <div className="col-6 text-center pe-5">
              <Chat size={30} /> <span className="ms-2">Comment</span>
            </div>
          </div>
        </div>

        <div className="col-12 no-margin-padding-left">
          <Comment isNested={false} size={1} />
          <Comment isNested={true} size={1} />
        </div>
      </div>
    </div>
  );
};

export default ImagePostContent;
