import React, { useEffect, useState } from "react";

import "./Comment.css";
import useAxiosToken from "../../../hooks/useAxiosToken";
import { Comments } from "../../../models/Comments";
import Comment from "./Comment";

type CommentContainerProps = {
  postId: number;
  commentId: number;
  reRender: boolean;
  submit: any | null;
};

const CommentContainer: React.FC<CommentContainerProps> = ({
  postId,
  commentId,
  reRender,
  submit,
}) => {
  const [comments, setComments] = useState<Comments[]>([]);
  const axiosToken = useAxiosToken();
  const [toggle, setToggle] = useState<boolean>(true);
  const [isParent, setIsParent] = useState<boolean>(false);
  useEffect(() => {
    let url = "";
    if (commentId === 0) {
      url = `${process.env.REACT_APP_HOST_URL}/comments/post/${postId}`;
      setIsParent(true);
    } else {
      url = `${process.env.REACT_APP_HOST_URL}/comments/comment/${commentId}`;
    }
    const fetchData = async () => {
      await axiosToken
        .get(url)
        .then((response) => {
          console.log(response.data);
          setComments(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle, reRender]);
  return (
    <>
      {comments && comments.length > 0 && (
        <div>
          {comments.map((comment, index) => (
            <Comment
              key={index}
              isNested={!isParent}
              comment={comment}
              submit={submit}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CommentContainer;
