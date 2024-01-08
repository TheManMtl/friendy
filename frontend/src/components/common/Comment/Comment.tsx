import React, { useEffect, useState } from "react";

import "./Comment.css";
import useAxiosToken from "../../../hooks/useAxiosToken";
import ProfileImage from "../ProfileImage/ProfileImage";
import CommentReply from "../CommentReply/CommentReply";
import {
  HandThumbsUpFill,
  HandThumbsUp,
  ChatFill,
  Chat,
} from "react-bootstrap-icons";
import { Comments } from "../../../models/Comments";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import CommentContainer from "./CommentContainer";
type CommentProps = {
  isNested: boolean;
  comment: Comments;
};
 
const Comment: React.FC<CommentProps> = ({ isNested, comment }) => {
  const [viewReplies, setViewReplies] = useState<boolean>(false);
  const [makeComment, setMakeComment] = useState<boolean>(false);
  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");
  return (
    <div
      className={`d-flex flex-lg-row flex-column my-3 pe-2 nested-${isNested} `}
    >
      {comment.profileImg && (
        <div className="">
          <ProfileImage
            src={comment.profileImg!}
            alt={"alt"}
            size={"small-small-med"}
          />
        </div>
      )}

      <div className=" flex-grow-1">
        <div className="row text-start bg-comment ms-1">
          <div className="col-12  fw-bolder">
            {comment.name && comment.name}
          </div>
          <div className="col-12 ">{comment.body && comment.body}</div>
        </div>
        <div className="row text-start  ms-1">
          <div className="col-12">
            <span className="comment-interaction me-2">Like</span>
            <span
              className={`comment-interaction  me-2 comment-${makeComment}`}
              onClick={() => {
                setMakeComment(!makeComment);
              }}
            >
              Comment
            </span>
            <span className="comment-interaction me-2">
              {comment.createdAt && timeAgo.format(new Date(comment.createdAt))}
            </span>
            <span className="comment-interaction ">
              <HandThumbsUpFill />{" "}
              {comment.likeCount && <>{comment.likeCount}</>}
            </span>
          </div>
          {comment.childCount > 0 && !makeComment && (
            <div className="col-12 view-replies">
              {comment.childCount > 0 && (
                <div
                  onClick={() => {
                    setViewReplies(!viewReplies);
                  }}
                >
                  {viewReplies ? <>Close Replies</> : <>View Replies</>}
                </div>
              )}
            </div>
          )}
          {makeComment && <CommentReply />}
          {comment.childCount > 0 && viewReplies && (
            <CommentContainer commentId={comment.id} postId={comment.postId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
