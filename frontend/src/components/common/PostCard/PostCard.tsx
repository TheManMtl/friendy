import { useState } from "react";
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
import {
  HandThumbsUp,
  SendFill,
  PlayFill,
  ThreeDots,
  Trash,
  Pencil
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
  type: string
  currentUserProfileThumb?: string | null;
  openEdit?: () => void;

}

interface input {
  body: string;
}

const PostCard: React.FC<PostCardProps> = (props) => {

  const axiosToken = useAxiosToken();
  const [success, setSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const { user } = useAuth();
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  
  const validationSchema = Yup.object().shape({
    body: Yup.string().max(1500).required("Comment body must be between 1 and 1500 characters."),
  });
  const initialValues = {
    body: ""
  };

  const handleCommentOnPost = async (data: input, { resetForm }: FormikHelpers<input>) => {
    console.log("handleCommentOnPost called");
    try {
      console.log("will it work?");
      await axiosToken.post(`/comments/post/${props.id}`, data);
      setSuccess(true);
      setIsFocused(false);
      resetForm();
      setRefresh((prev) => prev + 1);
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
      return '1m';
    }
    if (min < 60) {
      return min + 'm';
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
      return "a day ago"
    }
    if (day < 7) {
      return day + " days ago"
    }

    const month = newDate.getMonth();
    const months: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let result = months[month] + " " + newDate.getDate();
    if (newDate.getFullYear() < new Date().getFullYear()) {
      result += (" " + newDate.getFullYear());
    }
    return result;
  }
  const getCommentTime = (datetime: string) => {
    //TODO
  }

    //Post modal for editing
    const [showPostModal, setShowPostModal] = useState<boolean>(false);
    const closePost = () => {
      setShowPostModal(false);
    };
    const openEdit = () => setShowPostModal(true);
    //end edit modal section


  const openDelete = () => {
    
  }

  const handleDeletePost = async () => {
    console.log("handleDeletePost called");
    try {
      await axiosToken.delete(`/posts/${props.id}`);
      setSuccess(true);
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={refresh}>
      <div className="card">
        <div className="card-body">
          <div className="row card-title">
            <div className="col-1">
              <ProfileImage
                src={props.profileImageSrc}
                alt="profile"
                size="small"
              />
            </div>
            <div className="col-10">
              <div className="d-flex justify-content-start">
                <span className="fw-bold"> {props.username} </span>
                {
                  props.type === "profilePic" ? (
                    <span className="text-secondary"> &nbsp;updated their profile picture.</span>
                  ) : (<></>)
                }
                {
                  props.type === "coverPhoto" ? (
                    <span className="text-secondary"> &nbsp;changed their cover photo.</span>
                  ) : (<></>)
                }
              </div>
              <div className="d-flex justify-content-start">
                <small className="text-secondary">{getPostTime(props.time)}</small>
              </div>
            </div>
            <div className="col-1">
              {
                props.authorId === user!.id ? (
                  <div className="dropdown">
                    <div data-bs-toggle="dropdown" aria-expanded="false">
                      <ThreeDots />
                    </div>
                    <ul className="dropdown-menu">
                      <li className="dropdown-item" onClick={openEdit}><Pencil /> Edit post</li>
                      <li className="dropdown-item" onClick={openDelete}><Trash /> Move to trash</li>
                    </ul>
                  </div>
                ) : (
                  <></>
                )
              }
            </div>
          </div>
          <div className="card-content container">
            <p className="text-left-custom">
              {props.content}
            </p>
            {props.thumbnailUrl && (
              <div className="card-img">
                <img
                  src={props.thumbnailUrl}
                  className="card-img-top"
                  alt="Post Thumbnail"
                />
              </div>
            )}
          </div>

          <div className="row">

            <div className="col-2 text-start">
              {
                props.likeCount > 0 ?
                  (
                    <>
                      <HandThumbsUp />
                      <small>{" " + props.likeCount}</small>
                    </>
                  ) : (
                    <></>
                  )
              }
            </div>

            {
              props.commentCount > 0 ?
                (
                  <div className="col-4 offset-6 text-end text-secondary">
                    <small>{props.commentCount + " "}</small>
                    {
                      props.commentCount === 1 ? (
                        <small>comment</small>

                      ) : (
                        <small>comments</small>
                      )
                    }
                  </div>

                ) : (
                  <></>
                )
            }

          </div>
          <hr />
          <div className="row text-center">
            <div className="col-4">
              <HandThumbsUp />
              {/* TODO buttons */}
              <span className="text-secondary px-3">Like</span>
            </div>
            <div className="col-4 offset-4">
              <span className="text-secondary px-3">Comment</span>
            </div>
          </div>
          <hr />
          {
            props.commentCount > 0 ?
              (
                <div className="row">
                  {/* TODO: display first comment only, toggle full list view */}
                  <CommentContainer postId={props.id} commentId={0} />
                </div>

              ) : (
                <></>
              )
          }
        </div>
        <div className="card-footer bg-transparent border-0">
          <Formik
            initialValues={initialValues}
            onSubmit={handleCommentOnPost}
            validationSchema={validationSchema}
            validateOnChange={true}
          >
            {(formikprops) => (
              <Form>
                <div className={`textarea-container${isFocused ? " focused" : ""}`}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  <div>
                    <Field
                      as="textarea"
                      id={props.id + "CommentInput"}
                      name="body"
                      placeholder="Write a comment..."
                      rows={isFocused ? 2 : 1}
                      className="pe-5"
                    />
                  </div>
                  {/* <Button type="submit" variant="color" label="Post comment"></Button> */}
                  {/* {isFocused && ( */}
                  <button className="btn-block btn-color submit-button" type="submit" onClick={() => console.log("Button clicked")}><SendFill /></button>
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
          props.currentUserProfileThumb
            ? props.currentUserProfileThumb
            : 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCxaZG5PZ2b0vJvY43fF39JensmbejwDzB_FvoT73FxQ&s"
        }
        alt={"profile"}
        size={"small"}
        username={user!.name}
        profileId={user!.id.toString()}
        postId={props.id}
        postBody={props.content}
      />
    </div>
  );
};

export default PostCard;
