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
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import CommentContainer from "../../../components/common/Comment/CommentContainer";

type ImagePostContentProps = {
  user: Profile;
  post: SinglePost;
};

const ImagePostContent: React.FC<ImagePostContentProps> = ({ user, post }) => {
  const axiosToken = useAxiosToken();
  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");

  return (
    <div className="image-post-content-scroll">
      <div className="row p-5 ">
        <div className="col-12">
          <div className="row my-3 text-start">
            <div className="col-2 my-auto profile-thumbnail">
              {user.profileImgThumbnail && (
                <ProfileImage
                  src={user.profileImgThumbnail}
                  alt="profile image"
                  size="small-small-med"
                />
              )}
            </div>
            <div className="col-10">
              <div className="row text-start basic-info">
                <div className="col-12 fw-bolder display-text">
                  {user && user.name && user!.name}
                </div>
                <div className="col-12  date-text">
                  {post.createdAt && timeAgo.format(new Date(post.createdAt))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {post.content && (
          <div className="col-12 text-start display-text">{post.content}</div>
        )}

        <div className="col-12 mt-4 ">
          <div className="row">
            <div className="col-6 text-start ps-4 ">
              <HandThumbsUpFill size={25} />
              <span className="ms-2 display-text">
                {post.likeCount == null ? 0 : post.likeCount}
              </span>
            </div>
            <div className="col-6 text-end pe-4">
              <span className="me-2 display-text">
                {post.commentCount == null ? 0 : post.commentCount}
              </span>
              <ChatFill size={25} />
            </div>
          </div>
        </div>

        <div className="col-12 py-2 my-3 interact-options">
          <div className="row">
            <div className="col-6 text-center like-comment p-1">
              <HandThumbsUp size={30} /> <span>Like</span>
            </div>
            <div className="col-6 text-center like-comment p-1 ">
              <Chat size={30} /> <span>Comment</span>
            </div>
          </div>
        </div>

        <div className="col-12 no-margin-padding-left">
          <CommentContainer commentId={0} postId={89} />
        </div>
      </div>
    </div>
  );
};

export default ImagePostContent;

// POST

// User
// :
// {name: 'Mer W', profileImg: null}
// authorId
// :
// null
// body
// :
// "wow!"
// childCount
// :
// 0
// createdAt
// :
// "2023-12-21T16:29:41.000Z"
// deletedAt
// :
// null
// id
// :
// 12
// isDeleted
// :
// false
// likeCount
// :
// 0
// parentId
// :
// null
// postId
// :
// 89
// updatedAt
// :
// "2023-12-21T16:29:41.000Z"
// userId
// :
// 104
