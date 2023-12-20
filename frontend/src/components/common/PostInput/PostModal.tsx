import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import ProfileImage from "../ProfileImage/ProfileImage";
import * as Yup from "yup";
import { Button as ButtonF } from "../../../components/common";

interface submitProps {
  postBody: string;
}
interface PostModalProps {
  showPostModal: boolean;
  closePost: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ showPostModal, closePost }) => {
  const [filedValue, setFieldValue] = useState();
  const [files, setFiles] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  //Formik properties
  const initialValues = {
    postBody: "",
  };
  const onSubmit = (data: submitProps) => {
    try {
      if (files != null) {
      }
    } catch (error) {}
  };
  const validationSchema = Yup.object().shape({
    podtBody: Yup.string().max(1000).required(),
  });

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
      {" "}
      {/* Post Modal */}
      <Modal centered show={showPostModal} onHide={closePost} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Creat Post</Modal.Title>
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
              validationSchema={validationSchema}
            >
              {(formikprops) => (
                <Form>
                  <div>
                    <Field
                      as="textarea"
                      type="postBody"
                      id="postBody"
                      name="postBody"
                      placeholder="postBody"
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
                      //   onChange={(event: HTMLInputElement) => {
                      //     const file = event.currentTarget.files[0];
                      //     setFieldValue("image", file);
                      //   }}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closePost}>
            Close
          </Button>
          <ButtonF type="submit" variant="color" label="Save Changes"></ButtonF>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostModal;
