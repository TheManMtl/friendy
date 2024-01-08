import React, { useState, useContext, FormEvent } from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import ProfileImage from "../ProfileImage/ProfileImage";
import * as Yup from "yup";
import { Button as ButtonF } from "../../../components/common";
import useAxiosToken from "../../../hooks/useAxiosToken";
import { Post, PostType } from "../../../types/common";
import { AuthContext } from "../../../context/AuthProvider";
import { any } from "prop-types";
import { AxiosError } from "axios";
import { apiError } from "../../../types/common";

interface PostModalProps {
  showPostModal: boolean;
  closePost: () => void;
  src: string;
  alt: string;
  size?: string;
  username?: string;
  profileId: string | null;
  postId?: number;
  postBody?: string;

}

const PostModal: React.FC<PostModalProps> = ({
  src,
  alt,
  size,
  showPostModal,
  closePost,
  username,
  profileId,
  postId,
  postBody
}) => {
  const authContext = useContext(AuthContext);
  const [file, setFile] = useState<any>();
  const [content, setContent] = useState<string>(postBody ?? "");
  const [filedValue, setFieldValue] = useState();
  const [files, setFiles] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const axiosToken = useAxiosToken();
  const [errorMessage, setErrorMessage] = useState('');
  //Formik properties
  // const initialValues = {
  //   authorId: authContext?.user?.id,
  //   type: PostType.timeline,
  //   content: "",
  //   imageId: null,
  // }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!postId) {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("content", content);
        // formData.append("authorId", authContext?.user?.id.toString() ?? "");
        formData.append("profileId", profileId ?? "");
        formData.append("type", PostType.timeline);
        await axiosToken.post("/posts", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        console.log("attempting edit submission");
        await axiosToken.put(`/posts/${postId}`, { content: content });
      }
      handleClose();
    } catch (error: unknown) {
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
    }
  };

  const handleClose = () => {
    closePost();
    setErrorMessage("");
  }

  //FIXME: trigger update to parent component
  const onSubmit = (data: Post) => {
    console.log("====submit button clicked=====");
    try {
      //check if there is photo
      if (files.length !== 0) {
      }

      axiosToken.post("/posts", data).then((response) => {
        console.log("====post posted=====");
        if (response.data.error) {
          console.error(response.data.error);
        }
      });
    } catch (error: any) {
      console.error("Error posting post:", error.message);
    }
  };
  //   const validationSchema = Yup.object().shape({
  //     content: Yup.string().max(1000).required(),
  //   });

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement | null>
  ) => {
    if (event != null && event.target != null) {
      const fileInput = event.target;

      if (fileInput.files != null && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const selectedFiles = Array.from(fileInput.files);
        setFiles(selectedFiles);

        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            // Set the selected image to the data URL
            setSelectedImage(reader.result as string);
            console.log("the end of handleImageChange");
          };
        }
      }
    }
  };

  return (
    <div>
      {/* Post Modal */}
      <Modal centered show={showPostModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{postId ? "Edit post" : "Create post"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: "500px" }}>
          <div className="row mb-4">
            <div className="col-2">
              <ProfileImage src={src} alt={alt} size={size} />
            </div>
            <div className="col-10 d-flex justify-content-start">
              <div>{username}</div>
            </div>
          </div>
          <form onSubmit={submit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setErrorMessage("")}
              rows={8}
              placeholder="content"
              style={{ width: "165%", fontSize: "40px" }}
            ></textarea>
            <input
              onChange={(e: any) => setFile(e.target.files[0])}
              type="file"
              accept="image/*"
            ></input>
          <div className="row mb-3 px-2">
            <div className="col">
            {
              errorMessage ? (
                <div className="mt-5 mb-3">Error: {errorMessage}</div>

              ) : (
                <ButtonF
                  type="submit"
                  variant="color"
                  label={postId ? "Save changes " : "Post"}
                ></ButtonF>
              )
            }
            </div>
          </div>
          </form>
          <div className="row"></div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PostModal;
