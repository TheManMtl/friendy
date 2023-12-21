import React, { useEffect, useState } from "react";

import "../CommentReply/CommentReply.css";
import useAxiosToken from "../../../hooks/useAxiosToken";
import ProfileImage from "../ProfileImage/ProfileImage";
import { SendFill } from "react-bootstrap-icons";

type CommentReplyProps = {};

const CommentReply: React.FC<CommentReplyProps> = ({}) => {
  const axiosToken = useAxiosToken();

  return (
    <div className="d-flex flex-lg-row flex-column my-3 pe-5">
      <div className="">
        <ProfileImage
          src={
            "data:image/jpeg;base64,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"
          }
          alt={"alt"}
          size={"small"}
        />
      </div>
      <div className=" flex-grow-1">
        <form className={``} onSubmit={() => console.log("submit")}>
          <input
            className=" comment-reply mt-2"
            type="text"
            aria-label="Comment Reply"
            //   {...register("searchTerms")}
          />
        </form>
      </div>
      <div className=" flex-column comment-submit">
        <SendFill />
      </div>
    </div>
  );
};

export default CommentReply;
