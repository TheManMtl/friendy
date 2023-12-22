import { useState } from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import "./PostCard.css";
import { Comment } from "../../../types/common";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FormikHelpers} from "formik";
import { Button } from "../../../components/common";
import useAxiosToken from "../../../hooks/useAxiosToken";

type PostCardProps = {
  id: number
  profileImageSrc: string;
  time: string;
  username: string;
  content: string;
  thumbnailUrl?: string;
  likeCount: number;
  commentCount: number;
  comments?: Comment[];
}

interface input {
  body: string;
}

const PostCard: React.FC<PostCardProps> = (props) => {

  const axiosToken = useAxiosToken();
  const [success, setSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

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

  const handleCommentOnPost = async (data: input, {resetForm}: FormikHelpers<input>) => {
    console.log("handleCommentOnPost called");
    try {
      console.log("will it work?");
      await axiosToken.post(`/comments/post/${props.id}`, data);
      setSuccess(true);
      setIsFocused(false);
      resetForm();
      //TODO
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
      result += newDate.getFullYear();
    }
    return result;
  }
  const getCommentTime = (datetime: string) => {
    //TODO
  }

  return (
    <div>
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
            <div className="col-11 ">
              <div className="d-flex justify-content-start">
                <h5>{props.username}</h5>
              </div>
              <div className="d-flex justify-content-start">
                <p className="smallText">{getPostTime(props.time)}</p>
              </div>
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

          <div className="row justify-content-between">

            {
              props.likeCount > 0 ?
                (
                  <div className="col-1">
                    <img src={window.location.origin + "/thumbs-up.png"} alt="thumb" height={15} width={15} />
                    <small>{" " + props.likeCount}</small>
                  </div>

                ) : (
                  <></>
                )
            }

            {
              props.commentCount > 0 ?
                (
                  <div className="col-4 text-end text-secondary">
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
              <img src={window.location.origin + "/thumbs-up.png"} alt="thumb" height={15} width={15} />
              {/* TODO buttons */}
              <span className="text-secondary px-3">Like</span>
            </div>
            <div className="col-4">
              <span className="text-secondary px-3">Comment</span>
            </div>
            <div className="col-4">
              <span className="text-secondary px-3">Share</span>
            </div>
          </div>
          <hr />
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
                    <button className="btn-block btn-color submit-button" type="submit"  onClick={() => console.log("Button clicked")}>&#10148;</button>
                  {/* )}  */}

                </div>
                <ErrorMessage name="body" component="div" />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
