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

interface PostModalProps {
  showPostModal: boolean;
  closePost: () => void;
  src: string;
  alt: string;
  size?: string;
  username?: string;
}

const PostModal: React.FC<PostModalProps> = ({
  src,
  alt,
  size,
  showPostModal,
  closePost,
  username,
}) => {
  const authContext = useContext(AuthContext);
  const [file, setFile] = useState<any>();
  const [content, setContent] = useState<string>("");
  const [filedValue, setFieldValue] = useState();
  const [files, setFiles] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const axiosToken = useAxiosToken();
  //Formik properties
  // const initialValues = {
  //   authorId: authContext?.user?.id,
  //   type: PostType.timeline,
  //   content: "",
  //   imageId: null,
  // }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("content", content);
    formData.append("authorId", authContext?.user?.id.toString() ?? "");
    formData.append("profileId", authContext?.user?.id.toString() ?? "");
    formData.append("type", PostType.timeline);
    await axiosToken.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

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
      alert("An error occurred during posting. Please try again.");
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
      <Modal centered show={showPostModal} onHide={closePost} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
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
              rows={8}
              placeholder="content"
              style={{ width: "165%", fontSize: "40px" }}
            ></textarea>
            <input
              onChange={(e: any) => setFile(e.target.files[0])}
              type="file"
              accept="image/*"
            ></input>

            <ButtonF
              type="submit"
              variant="color"
              label="Create Post"
              onClick={closePost}
            ></ButtonF>
          </form>
          <div className="row">
            {/* <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
            // validationSchema={validationSchema}
            >
              {(formikprops) => (
                <Form encType="multipart/form-data">
                  <div>
                    <Field
                      as="textarea"
                      type="content"
                      id="content"
                      name="content"
                      placeholder="Share your thoughts here..."
                      rows={8}
                      style={{ width: "165%", fontSize: "40px" }}
                    />
                  </div>
                  <div>
                    <Field
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*" */}
            {/* // onChange={(event: HTMLInputElement) => {
                    //   const file = event.currentTarget.files[0];
                    //   setFieldValue("image", file);
                    // }}
                    />
                  </div>
                  {/* Buttons inside the Form */}
            {/* <div className="mt-3">
                    <Button variant="secondary" onClick={closePost}>
                      Close
                    </Button>
                    <ButtonF
                      type="submit"
                      variant="color"
                      label="Create Post"
                      onClick={closePost}
                    ></ButtonF>
                  </div>
                </Form>
              )}
            </Formik> */}
          </div>
        </Modal.Body>
        {/* Modal.Footer is not needed in this case */}
      </Modal>
    </div>
  );
};

export default PostModal;
