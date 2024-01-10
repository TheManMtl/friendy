import React, { useContext, useEffect, useState } from "react";

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
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
type CommentProps = {
  isNested: boolean;
  comment: Comments;
  submit: any | null;
};

const Comment: React.FC<CommentProps> = ({ isNested, comment, submit }) => {
  const [viewReplies, setViewReplies] = useState<boolean>(false);
  const [makeComment, setMakeComment] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<boolean>(false);
  const [replies, setReplies] = useState<number[]>([]);
  const [newComments, setNewComments] = useState<Comments[]>([]);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [theComment, setTheComment] = useState<Comments>(comment);
  const [commentChanged, setCommentChanges] = useState<boolean>(false);
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [toDelete, setToDelete] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const newComment = (commentId: number) => {
    const updatedReplies = [...replies, commentId];
    setReplies(updatedReplies);
    if (submit) {
      submit();
    }
  };

  const handleLike = async () => {
    console.log("LIKE");
    // router.post("/comment/:id([0-9]+)", authUser, likes.likeCommentToggle);
    await axiosToken
      .post(`${process.env.REACT_APP_HOST_URL}/likes/comment/${comment.id}`)
      .then((response) => {
        console.log(response.data);
        console.log("is this working?");
        setCommentChanges(!commentChanged);
      })
      .catch((error) => {
        console.log("is this NOT working?");
        console.log(error);
      });
  };

  const handleDelete = async () => {
    console.log("delete");
    let url: string;
    if (theComment.parentId) {
      console.log("comment on comment");
      url = `${process.env.REACT_APP_HOST_URL}/comments/comment/${comment.id}`;
    } else {
      console.log("comment on post");
      url = `${process.env.REACT_APP_HOST_URL}/comments/post/${comment.id}`;
    }
    const deleteComment = async () => {
      await axiosToken
        .delete(url)
        .then((response) => {
          setIsDeleted(true);
          if (submit) {
            submit();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    deleteComment();
  };

  useEffect(() => {
    console.log("user:  ");
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
    const fetchNewComment = async () => {
      await axiosToken
        .get(`${process.env.REACT_APP_HOST_URL}/comments/single/${comment.id}`)
        .then((response) => {
          setTheComment(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchLikes();
    if (!firstRender) {
      fetchNewComment();
    } else {
      setFirstRender(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment.id, commentChanged]);

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
    <>
      {!isDeleted ? (
        <div>
          <div
            className={`d-flex flex-lg-row flex-column my-3 pe-2 nested-${isNested} `}
          >
            {theComment.profileImg && !editComment && (
              <div
                className=""
                onClick={() => navigate(`/profile/${theComment.userId}`)}
              >
                <ProfileImage
                  src={theComment.profileImg!}
                  alt={"alt"}
                  size={"small-small-med"}
                />
              </div>
            )}

            <div className=" flex-grow-1">
              {!editComment && (
                <div className="row text-start bg-comment ms-1">
                  <div
                    className="col-12  fw-bolder"
                    onClick={() => navigate(`/profile/${theComment.userId}`)}
                  >
                    {theComment.name && !editComment && theComment.name}
                  </div>
                  <div className="col-12 ">
                    {theComment.body && !editComment && theComment.body}
                  </div>
                </div>
              )}

              {editComment && (
                <div className="row text-start ms-1">
                  <div className="col-12">
                    <CommentReply
                      commentId={theComment.id}
                      newComment={newComment}
                      setMakeComment={setEditComment}
                      isNewComment={false}
                      commentChanged={commentChanged}
                      setCommentChanges={setCommentChanges}
                      value={theComment.body}
                      submit={submit}
                    />
                  </div>
                  <div
                    className="comment-interaction fw-bolder col-12 text-end cancel-edit"
                    onClick={() => {
                      setEditComment(!editComment);
                    }}
                  >
                    Cancel
                  </div>
                </div>
              )}
              <div className="row text-start  ms-1">
                {!editComment && !toDelete && (
                  <div className="col-12">
                    <span
                      className={`comment-interaction me-1 user-liked-${userLiked}`}
                      onClick={handleLike}
                    >
                      {userLiked ? <>Unlike</> : <>Like</>}
                    </span>
                    <span
                      className={`comment-interaction  me-1 comment-${makeComment}`}
                      onClick={() => {
                        setMakeComment(!makeComment);
                      }}
                    >
                      Comment
                    </span>
                    <span className="comment-interaction me-1">
                      {theComment.createdAt &&
                        timeAgo.format(new Date(theComment.createdAt))}
                    </span>
                    <span className="comment-interaction ">
                      <HandThumbsUpFill />{" "}
                      {theComment.likeCount && <>{theComment.likeCount}</>}
                    </span>
                  </div>
                )}

                {theComment.userId === user?.id && (
                  <div className="col-12">
                    {!toDelete ? (
                      <>
                        {" "}
                        <span
                          onClick={() => {
                            setEditComment(!editComment);
                          }}
                          className="comment-interaction fw-bolder"
                        >
                          {!editComment && <>Edit</>}
                        </span>
                        <span className="comment-interaction fw-bolder">
                          {!editComment && (
                            <span
                              onClick={() => {
                                setToDelete(true);
                              }}
                            >
                              Delete
                            </span>
                          )}
                        </span>
                      </>
                    ) : (
                      <div className="comment-interaction fw-bolder">
                        <span className="me-5">Are you sure?</span>
                        <span
                          className="me-2 text-danger"
                          onClick={handleDelete}
                        >
                          Yes
                        </span>
                        <span
                          className="me-2"
                          onClick={() => {
                            setToDelete(false);
                          }}
                        >
                          No
                        </span>
                      </div>
                    )}
                  </div>
                )}
                {theComment.childCount > 0 && !makeComment && (
                  <div className="col-12 view-replies">
                    {theComment.childCount > 0 && !editComment && !toDelete && (
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
              </div>
            </div>
          </div>
          <div className="nested-in-comment">
            {makeComment && (
              <CommentReply
                commentId={theComment.id}
                newComment={newComment}
                setMakeComment={setMakeComment}
                isNewComment={true}
                commentChanged={commentChanged}
                setCommentChanges={setCommentChanges}
                value={null}
                submit={submit}
              />
            )}

            {replies.length > 0 &&
              newComments.map((comment, index) => (
                <Comment
                  key={index}
                  isNested={true}
                  comment={comment}
                  submit={submit}
                />
              ))}
            {comment.childCount > 0 && viewReplies && (
              <div className="nested-in-comment">
                {" "}
                <CommentContainer
                  commentId={comment.id}
                  postId={comment.postId}
                  reRender={true}
                  submit={submit}
                />{" "}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center my-3 ms-5">Comment has been deleted</div>
      )}
    </>
  );
};

export default Comment;
