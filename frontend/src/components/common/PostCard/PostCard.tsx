import { useState, useEffect } from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import "./PostCard.css";
import { Comment as IComment } from "../../../types/common";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { Button } from "../../../components/common";
import useAxiosToken from "../../../hooks/useAxiosToken";
import CommentContainer from "../Comment/CommentContainer";
import Comment from "../Comment/Comment";
import useAuth from "../../../hooks/useAuth";
import PostModal from "../PostInput/PostModal";
import DeletePostModal from "./DeletePostModal";
import { AxiosError } from "axios";
import { apiError } from "../../../types/common";
import { IPost } from "../../../pages/shared/interface/post.interface";

import {
  HandThumbsUp,
  SendFill,
  PlayFill,
  ThreeDots,
  Trash,
  Pencil,
} from "react-bootstrap-icons";

type PostCardProps = {
  id: number;
  authorId: number;
  profileImageSrc: string;
  time: string;
  username: string;
  content: string;
  thumbnailUrl?: string;
  likeCount: number;
  commentCount: number;
  comments?: IComment[];
  type: string;
  currentUserProfileThumb?: string | null;
  openEdit?: () => void;
  profileId?: number | null;
  profileName?: string;
  submit: any | null;

};

interface input {
  body: string;
}

const PostCard: React.FC<PostCardProps> = (props) => {
  const axiosToken = useAxiosToken();
  const [success, setSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [changed, setChanged] = useState(0);
  const { user } = useAuth();

  const [errorMessage, setErrorMessage] = useState('');
  const [liked, setLiked] = useState<boolean>(false);
  const [found, setFound] = useState<boolean>(true);
  const [reRender, setReRender] = useState<boolean>(false);
  // const [post, setPost] = useState<SinglePost>();
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [post, setPost] = useState(props);

  const submit = () => {
    setReRender(!reRender);
  };

  useEffect(() => {

    const getLiked = async () => {
      await axiosToken
        .get(`/likes/post/${post.id}`)
        .then((response) => {
          console.log(response.data + "user liked comment");
          setLiked(response.data);
        })
        .catch((error: unknown) => {
          const err = error as AxiosError<apiError>;

          if (!err?.response) {
            setErrorMessage("Failed to connect to server.");
            console.log(errorMessage);

          } else if (err.response?.data?.message) {
            setErrorMessage(err.response.data.message);
            console.log(errorMessage);

          } else {
            console.log(err);
            setErrorMessage("Something went wrong.");
          }
        });
    };

    const refreshPost = async () => {
      try {
      const response = await axiosToken.get(`/posts/${post.id}`);
      console.log(response.data);

          // setPost(refreshedPost);
          setPost({...post, 
            commentCount: response?.data?.commentCount,
            comments: response?.data?.comments,
            likeCount: response?.data?.likeCount,
            content: response?.data?.content
          });

          setFound(true);
      } catch (error: unknown) {
        setFound(false);

          const err = error as AxiosError<apiError>;
          console.log(error);

          if (!err?.response) {
            setErrorMessage("Failed to connect to server.");
            console.log(errorMessage);

          } else if (err.response?.data?.message) {
            setErrorMessage(err.response.data.message);
            console.log(errorMessage);

          } else {
            console.log(err);
            setErrorMessage("Something went wrong.");
          }
        }
    };

    getLiked();
    if (!firstRender) {
      refreshPost();
    } else {
      setFirstRender(false);
    }
  }, [liked, post.id, changed, reRender]);


  const handleLike = async () => {

    console.log("like clicked");

    await axiosToken
      .post(`/likes/post/${post.id}`)
      .then((response) => {
        console.log(response.data);
        setLiked(!liked);
      })
      .catch((error) => {
        console.log("is this NOT working?");
        console.log(error);
      });
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  //FIXME: clear validation error message on blur after attempting submit with empty input val (check if error message and input val)
  const handleBlur = () => {
    setIsFocused(false);
  };

  const validationSchema = Yup.object().shape({
    body: Yup.string()
      .max(1500)
      .required("Comment body must be between 1 and 1500 characters."),
  });
  const initialValues = {
    body: "",
  };

  const handleCommentOnPost = async (
    data: input,
    { resetForm }: FormikHelpers<input>
  ) => {
    console.log("handleCommentOnPost called");
    try {
      console.log("will it work?");
      await axiosToken.post(`/comments/post/${post.id}`, data);
      setSuccess(true);
      setIsFocused(false);
      resetForm();
      setChanged((prev) => prev + 1);
      submit();
      console.log("did it work?");
    } catch (error) {
      //TODO
      console.log("did it work? no :( ");

      console.log(error);
    }
  };

  //datetime helpers
  const getPostTime = (datetime: string) => {
    //console.log("getPostTime arg: " + datetime);

    // const diff = new Date().getTimezoneOffset();
    // console.log("diff: " + diff);
    let newDate = new Date(datetime);
    //console.log(newDate);

    //newDate = new Date(newDate.getTime() - (diff * 60000));
    // console.log(newDate);

    const millisec = Date.now() - newDate.getTime();

    const min = Math.floor(millisec / 60000);
    if (min === 0) {
      return "1m";
    }
    if (min < 60) {
      return min + "m";
    }
    const hr = Math.floor(min / 60);
    if (hr < 2) {
      return "about an hour ago";
    }
    if (hr < 24) {
      return hr + " hours ago";
    }
    const day = Math.floor(hr / 24);
    if (day < 2) {
      return "a day ago";
    }
    if (day < 7) {
      return day + " days ago";
    }

    const month = newDate.getMonth();
    const months: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let result = months[month] + " " + newDate.getDate();
    if (newDate.getFullYear() < new Date().getFullYear()) {
      result += " " + newDate.getFullYear();
    }
    return result;
  };

  //Post modal for editing
  const [showPostModal, setShowPostModal] = useState<boolean>(false);
  const closePost = () => {
    setShowPostModal(false);
    submit();

  };
  const openEdit = () => setShowPostModal(true);
  //end edit modal section

  //confirm delete modal
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    submit();
  };
  const openDelete = () => setShowDeleteModal(true);
  //end confirm delete modal section

  return (
    !found ? <></> :
    <div>
      <div className="card">
        <div className="card-body">
          <div className="row card-title">
            <div className="col-1">
              <ProfileImage
                src={post.profileImageSrc}
                alt="profile"
                size="small"
              />
            </div>
            <div className="col-10">
              <div className="d-flex justify-content-start">
                {/* TODO handle route hashing? */}
                <a href={`#/profile/${post.authorId}`} className="fw-bold">
                  {" "}
                  {post.username}{" "}
                </a>
                {post.type === "profilePic" ? (
                  <span className="text-secondary">
                    {" "}
                    &nbsp;updated their profile picture.
                  </span>
                ) : (
                  <></>
                )}
                {post.type === "coverPhoto" ? (
                  <span className="text-secondary">
                    {" "}
                    &nbsp;changed their cover photo.
                  </span>
                ) : (
                  <></>
                )}
                {
                  post.profileId && post.authorId !== post.profileId ? (
                    <span>&nbsp; <PlayFill />&nbsp; {post.profileName}</span>
                  ) : (<></>)
                }
              </div>
              <div className="d-flex justify-content-start">
                <small className="text-secondary">
                  {getPostTime(post.time)}
                </small>
              </div>
            </div>
            <div className="col-1">
              {post.authorId === user!.id ? (
                <div className="dropdown">
                  <div data-bs-toggle="dropdown" aria-expanded="false">
                    <ThreeDots />
                  </div>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item" onClick={openEdit}>
                      <Pencil /> Edit post
                    </li>
                    <li className="dropdown-item" onClick={openDelete}>
                      <Trash /> Move to trash
                    </li>
                  </ul>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="card-content container">
            <p className="text-left-custom">{post.content}</p>
            {post.thumbnailUrl && (
              <div className="card-img">
                <img
                  src={post.thumbnailUrl}
                  className="card-img-top"
                  alt="Post Thumbnail"
                />
              </div>
            )}
          </div>

          <div className="row">
            <div className="col-2 text-start">
              {post.likeCount > 0 ? (
                <>
                  <HandThumbsUp />
                  <small>{" " + post.likeCount}</small>
                </>
              ) : (
                <></>
              )}
            </div>

            {post.commentCount > 0 ? (
              <div className="col-4 offset-6 text-end text-secondary">
                <small>{post.commentCount + " "}</small>
                {post.commentCount === 1 ? (
                  <small>comment</small>
                ) : (
                  <small>comments</small>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
          <hr />
          <div className="row text-center">
            <div className="col-4">
              <span onClick={handleLike}>
                <HandThumbsUp />
                <span className="text-secondary px-3">{liked ? <>Unlike</> : <>Like</>}</span>
              </span>
            </div>
            <div className="col-4 offset-4">
              <span className="text-secondary px-3">Comment</span>
            </div>
          </div>
          <hr />
          {post.commentCount > 0 ? (
            <div className="row">
              {/* TODO: display first comment only, toggle full list view */}
              <CommentContainer
                postId={post.id}
                commentId={0}
                reRender={reRender}
                submit={null}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="card-footer bg-transparent border-0">
          <Formik
            initialValues={initialValues}
            onSubmit={handleCommentOnPost}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {(formikprops) => (
              <Form>
                <div
                  className={`textarea-container${isFocused ? " focused" : ""}`}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  <div>
                    <Field
                      as="textarea"
                      id={post.id + "CommentInput"}
                      name="body"
                      placeholder="Write a comment..."
                      rows={isFocused ? 2 : 1}
                      className="pe-5"
                    />
                  </div>
                  {/* <Button type="submit" variant="color" label="Post comment"></Button> */}
                  {/* {isFocused && ( */}
                  <button
                    className="btn-block btn-color submit-button p-0 px-1"
                    type="submit"
                    onClick={() => console.log("Button clicked")}
                  >
                    <SendFill />
                  </button>
                  {/* )}  */}
                </div>
                <ErrorMessage name="body" component="div" />
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <PostModal
        showPostModal={showPostModal}
        closePost={closePost}
        src={
          post.currentUserProfileThumb
            ? post.currentUserProfileThumb
            :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCxaZG5PZ2b0vJvY43fF39JensmbejwDzB_FvoT73FxQ&s"
        }
        alt={"profile"}
        size={"small"}
        username={user!.name}
        profileId={user!.id.toString()}
        postId={post.id}
        postBody={post.content}
      />

      <DeletePostModal
        showDeleteModal={showDeleteModal}
        closeDeleteModal={closeDeleteModal}
        postId={post.id}
      />
    </div>
  );
};

export default PostCard;
