import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Field } from "formik";
import ProfileImage from "../ProfileImage/ProfileImage";
import * as Yup from "yup";
import { Button as ButtonF } from "../../../components/common";
import { Post, PostType } from "../../../types/common";
import { AuthContext } from "../../../context/AuthProvider";
import useAxiosToken from "../../../hooks/useAxiosToken";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { apiError } from "../../../types/common";

interface ChangeProfiletModalProps {
  showChangeProfileModal: boolean;
  closeChangeProfileModal: () => void;
}

const ChangeProfileModal: React.FC<ChangeProfiletModalProps> = ({
  showChangeProfileModal,
  closeChangeProfileModal,
}) => {
  const axiosToken = useAxiosToken();
  const authContext = useContext(AuthContext);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [profilePost, setProfilePost] = useState<Post | undefined>(undefined);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleImageChange = (event: any) => {
    event.preventDefault();
    const file = event.target.files[0];
    setFile(file);
  };
  const uploadFile = () => {
    if (file !== undefined && file !== null) {
      const formData = new FormData();
      formData.append("image", file);

      if (userId) {
        axiosToken
          .get(`/albums/profile/${userId}`)
          .then((response) => {
            const profileAlbumId = response.data.id;
            console.log("=====profile album id=====" + profileAlbumId);
            // Append other fields to formData

            formData.append("authorId", userId.toString());
            formData.append("type", PostType.profilePic);
            //formData.append("content", "This is a profile image");
            formData.append("albumId", profileAlbumId.toString());

            axiosToken
              .post("/posts", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              })
              .then((response) => {
                axiosToken
                  .put("/profile/update", {
                    profilePostId: response.data.post.id,
                  })
                  .then((response) => {
                    setSuccess(true);
                  })
                  .catch((error) => {
                    const err = error as AxiosError<apiError>;
                    if (!err?.response) {
                      setErrorMessage("Failed to connect to server.");
                    } else if (err.response?.data?.message) {
                      setErrorMessage(err.response.data.message);
                    } else {
                      console.log(err);
                      setErrorMessage("Failed to upload.");
                    }
                  });


                // TODO:use flash message
                // alert("Picture successfully uploaded!");
                // window.location.reload();
              })
              .catch((error) => {
                const err = error as AxiosError<apiError>;
                if (!err?.response) {
                  setErrorMessage("Failed to connect to server.");
                } else if (err.response?.data?.message) {
                  setErrorMessage(err.response.data.message);
                } else {
                  console.log(err);
                  setErrorMessage("Failed to upload.");
                }
              });
            setFile(undefined);
          })
          .catch((error: any) => {
            console.log("===Get album id error===" + error);
          });
      } else {
        console.log("====userId is null=====");
      }

      // axiosToken
      //   .post("/posts", formData, {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   })
      //   .then((response) => {
      //     axiosToken
      //       .put("/profile/update", { profilePostId: response.data.post.id })
      //       .then((response) => {
      //         console.log(
      //           "====changed profilePostId===" + response.data.profilePostId
      //         );
      //       })
      //       .catch((error) => {
      //         console.log(error);
      //       });
      //     // TODO:use flash message
      //     alert("Picture successfully uploaded!");
      //     window.location.reload();
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      // setFile(undefined);

      //update profilePostId in the User record
    } else {
      console.log("====No file selected===");
    }
  };

  useEffect(() => {
    if (authContext?.user?.id) {
      setUserId(authContext?.user?.id);
    }
  }, []);

  const handleClose = () => {
    closeChangeProfileModal();
    setErrorMessage("");
    window.location.reload();
  };
  return (
    <div>
      {" "}
      <Modal
        centered
        show={showChangeProfileModal}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Change profile image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            success ? (
              <div>
                Successfully uploaded.
              </div>
            ) : (
              <Form>
                <Form.Group>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Form.Group>
                {errorMessage ? (
                  <div className="mt-5 mb-3">{errorMessage}</div>
                ) : (
                  <ButtonF
                    variant="color"
                    label="Upload"
                    onClick={uploadFile}
                  ></ButtonF>
                )}

              </Form>
            )}
          {/* <Button variant="secondary" onClick={closeChangeProfileModal}>
            Close
          </Button> */}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChangeProfileModal;
