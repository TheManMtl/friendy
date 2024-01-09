import React, { useEffect, useRef, useState } from "react";

import "../CommentReply/CommentReply.css";
import useAxiosToken from "../../../hooks/useAxiosToken";
import ProfileImage from "../ProfileImage/ProfileImage";
import { SendFill } from "react-bootstrap-icons";
import FormData from "form-data";
import { useForm } from "react-hook-form";
import { Comments } from "../../../models/Comments";
import useAuth from "../../../hooks/useAuth";
import { Profile } from "../../../models/Profile";

type Reply = {
  body: string;
};
type CommentReplyProps = {
  commentId: number;
  newComment(commentId: number): any;
  setMakeComment(window: boolean): any;
  isNewComment: boolean;
  commentChanged: boolean;
  setCommentChanges: any;
  value: string | null;
};

const CommentReply: React.FC<CommentReplyProps> = ({
  commentId,
  newComment,
  setMakeComment,
  isNewComment,
  commentChanged,
  setCommentChanges,
  value,
}) => {
  const axiosToken = useAxiosToken();
  const { user } = useAuth();
  const [theUser, setTheUser] = useState<Profile>();

  useEffect(() => {
    const getUser = async () => {
      await axiosToken
        .get(`${process.env.REACT_APP_HOST_URL}/profile/view/${user!.id}`)
        .then((response: any) => {
          console.log(response.data);
          setTheUser(response.data.profileInfo);
        })
        .catch((error: any) => {
          console.log(error);
        });
    };
    getUser();
  }, []);
  const handleTextareaInput = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
    setValue("body", event.target.value);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Reply>();

  async function onSubmit(input: Reply) {
    console.log(input.body);
    console.log("submitting");
    if (input.body.length < 1 || input.body.length > 1500) {
      return;
    }
    let url: string;
    let method: "post" | "patch";
    if (isNewComment) {
      url = `${process.env.REACT_APP_HOST_URL}/comments/comment/${commentId}`;
      method = "post";
    } else {
      url = `${process.env.REACT_APP_HOST_URL}/comments/${commentId}`;
      method = "patch";
    }
    await axiosToken
      .request({
        url,
        method,
        data: {
          body: input.body,
        },
      })
      .then((response) => {
        console.log("success!!");
        console.log(response.data);
        setMakeComment(false);
        if (isNewComment) {
          newComment(response.data.id);
        }
        setCommentChanges(!commentChanged);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="d-flex flex-lg-row flex-column my-3 ">
      <div className="">
        {theUser && theUser!.profileImgThumbnail && (
          <ProfileImage
            src={theUser.profileImgThumbnail}
            alt={"alt"}
            size={"small"}
          />
        )}
      </div>
      <div className=" flex-grow-1 ">
        <form
          className={`form-row`}
          id="commentForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            onChange={handleTextareaInput}
            className="comment-reply mt-2"
            rows={1}
            aria-label="Comment Reply"
            style={{ overflow: "break-word", resize: "none" }}
            defaultValue={value ? value : ""}
          />
        </form>
      </div>
      <button
        className=" flex-column comment-submit"
        id="submitBtn"
        type="submit"
        form="commentForm"
      >
        <SendFill />
      </button>
    </div>
  );
};

export default CommentReply;
