import React, { useEffect, useRef, useState } from "react";
import "./MainComment.css";
import useAxiosToken from "../../../hooks/useAxiosToken";
import { SendFill } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

type Reply = {
  body: string;
};
type CommentReplyProps = {
  postId: number;
  submit: any;
};

const MainComment: React.FC<CommentReplyProps> = ({ postId, submit }) => {
  const axiosToken = useAxiosToken();

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
    console.log(input.body + "INPUT BOOODY");
    console.log("submitting");
    if (input.body.length < 1 || input.body.length > 1500) {
      return;
    }
    let url: string;
    url = `${process.env.REACT_APP_HOST_URL}/comments/post/${postId}`;
    console.log(url);

    await axiosToken
      .post(url, {
        body: input.body,
      })
      .then((response) => {
        console.log("success!!");
        submit();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="d-flex flex-lg-row flex-column my-3 ">
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

export default MainComment;
