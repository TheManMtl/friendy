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
import { axiosToken } from "../../../services/api/axios";
type CommentProps = {
  isNested: boolean;
  comment: Comments;
};

const Comment: React.FC<CommentProps> = ({ isNested, comment }) => {
  const [viewReplies, setViewReplies] = useState<boolean>(false);
  const [makeComment, setMakeComment] = useState<boolean>(false);
  const [replies, setReplies] = useState<number[]>([]);
  const [newComments, setNewComments] = useState<Comments[]>([]);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [theComment, setTheComment] = useState<Comments>(comment);
  const [commentChanged, setCommentChanges] = useState<boolean>(false);
  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const newComment = (commentId: number) => {
    const updatedReplies = [...replies, commentId];
    setReplies(updatedReplies);
  };

  useEffect(() => {
    console.log("comment changed");
    const fetchLikes = async () => {
      await axiosToken
        .get(`${process.env.REACT_APP_HOST_URL}/likes/comment/${comment.id}`)
        .then((response) => {
          console.log(response.data + "user liked comment");
          setUserLiked(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchLikes();
  }, [commentChanged]);

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await Promise.all(
        replies.map(async (commentId) => {
          try {
            const response = await axiosToken.get(
              `${process.env.REACT_APP_HOST_URL}/comments/single/${commentId}`
            );
            return response.data;
          } catch (error) {
            console.log(error);
            return null;
          }
        })
      );
      const filteredComments = comments.filter((comment) => comment !== null);

      setNewComments(filteredComments);
    };

    if (replies.length > 0) {
      fetchComments();
    }
  }, [replies]);

  return (
    <div
      className={`d-flex flex-lg-row flex-column my-3 pe-2 nested-${isNested} `}
    >
      {theComment.profileImg && (
        <div className="">
          <ProfileImage
            src={theComment.profileImg!}
            alt={"alt"}
            size={"small-small-med"}
          />
        </div>
      )}

      <div className=" flex-grow-1">
        <div className="row text-start bg-comment ms-1">
          <div className="col-12  fw-bolder">
            {theComment.name && theComment.name}
          </div>
          <div className="col-12 ">{theComment.body && theComment.body}</div>
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
              {theComment.createdAt &&
                timeAgo.format(new Date(theComment.createdAt))}
            </span>
            <span className="comment-interaction ">
              <HandThumbsUpFill />{" "}
              {theComment.likeCount && <>{theComment.likeCount}</>}
            </span>
          </div>
          {theComment.childCount > 0 && !makeComment && (
            <div className="col-12 view-replies">
              {theComment.childCount > 0 && (
                <div
                  onClick={() => {
                    setViewReplies(!viewReplies);
                    console.log(theComment.id);
                  }}
                >
                  {viewReplies ? <>Close Replies</> : <>View Replies</>}
                </div>
              )}
            </div>
          )}
          {makeComment && (
            <CommentReply
              commentId={theComment.id}
              newComment={newComment}
              setMakeComment={setMakeComment}
            />
          )}
          {replies.length > 0 &&
            newComments.map((comment, index) => (
              <Comment key={index} isNested={true} comment={comment} />
            ))}
          {comment.childCount > 0 && viewReplies && (
            <CommentContainer commentId={comment.id} postId={comment.postId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
