import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import ProfileImage from "../ProfileImage/ProfileImage";
import * as Yup from "yup";
import { Button as ButtonF } from "../../../components/common";
import useAxiosToken from "../../../hooks/useAxiosToken";
import { Post, PostType } from "../../../types/common";
import { AuthContext } from "../../../context/AuthProvider";

interface PostModalProps {
  showPostModal: boolean;
  closePost: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ showPostModal, closePost }) => {
  const authContext = useContext(AuthContext);
  const [filedValue, setFieldValue] = useState();
  const [files, setFiles] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const axiosToken = useAxiosToken();
  //Formik properties
  const initialValues = {
    authorId: authContext?.user?.id,
    type: PostType.timeline,
    content: "",
    imageId: null,
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
              <ProfileImage
                src={
                  "https://www.istockphoto.com/resources/images/IllustrationsLanding/BackgroundTile.jpg"
                }
                alt={"profilImage"}
                size="small"
              />
            </div>
            <div className="col-10 d-flex justify-content-start">
              <div>username</div>
            </div>
          </div>
          <div className="row">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              // validationSchema={validationSchema}
            >
              {(formikprops) => (
                <Form>
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
                      accept="image/*"
                      // onChange={(event: HTMLInputElement) => {
                      //   const file = event.currentTarget.files[0];
                      //   setFieldValue("image", file);
                      // }}
                    />
                  </div>
                  {/* Buttons inside the Form */}
                  <div className="mt-3">
                    <Button variant="secondary" onClick={closePost}>
                      Close
                    </Button>
                    <ButtonF
                      type="submit"
                      variant="color"
                      label="Save Changes"
                      onClick={closePost}
                    ></ButtonF>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
        {/* Modal.Footer is not needed in this case */}
      </Modal>
    </div>
  );
};

export default PostModal;
