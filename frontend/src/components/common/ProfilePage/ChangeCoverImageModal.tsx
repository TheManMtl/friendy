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

interface ChangeCoverImageModalProps {
  showCoverImageModal: boolean | undefined;
  closeCoverImageModal: () => void;
}
const ChangeCoverImageModal: React.FC<ChangeCoverImageModalProps> = ({
  showCoverImageModal,
  closeCoverImageModal,
}) => {
  const axiosToken = useAxiosToken();
  const authContext = useContext(AuthContext);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [userId, setUserId] = useState<number | undefined>(undefined);

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
        // Append other fields to formData
        // formData.append("authorId", userId.toString());
        // formData.append("type", PostType.coverPhoto);
        // formData.append("content", "Cover image");
        //check album id with the profileId==userId and type==coverPhoto and isDeleted==0
        //if exists return the id, if not create one record in album and then return the id
        axiosToken
          .get(`/albums/cover/${userId}`)
          .then((response) => {
            const coverAlbumId = response.data.id;
            console.log("====Album id====" + coverAlbumId);
            // Append other fields to formData
            formData.append("authorId", userId.toString());
            formData.append("type", PostType.coverPhoto);
            formData.append("content", "Cover image");
            formData.append("albumId", coverAlbumId.toString());

            axiosToken
              .post("/posts", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              })
              .then((response) => {
                //update coverPostId in user record
                axiosToken
                  .put("/profile/update", {
                    coverPostId: response.data.post.id,
                  })
                  .then((response) => {})
                  .catch((error) => {
                    console.log(error);
                  });
                closeCoverImageModal();
                // TODO:use flash message
                alert("Cover image successfully uploaded!");
                window.location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
            setFile(undefined);
          })
          .catch((error: any) => {
            console.log(error);
          });
      }

      //   axiosToken
      //     .post("/posts", formData, {
      //       headers: { "Content-Type": "multipart/form-data" },
      //     })
      //     .then((response) => {
      //       //update coverPostId in user record
      //       axiosToken
      //         .put("/profile/update", { coverPostId: response.data.post.id })
      //         .then((response) => {})
      //         .catch((error) => {
      //           console.log(error);
      //         });
      //       closeCoverImageModal();
      //       // TODO:use flash message
      //       alert("Cover image successfully uploaded!");
      //       window.location.reload();
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      //   setFile(undefined);
      // } else {
      console.log("====No file selected===");
    }
  };

  useEffect(() => {
    if (authContext?.user?.id) {
      setUserId(authContext?.user?.id);
    }
  }, []);

  return (
    <div>
      {" "}
      <Modal
        centered
        onHide={closeCoverImageModal}
        show={showCoverImageModal}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Cover image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>
            <ButtonF
              variant="color"
              label="Up load"
              onClick={uploadFile}
            ></ButtonF>
          </Form>

          {/* <Button variant="secondary" onClick={closeCoverImageModal}>
            Close
          </Button> */}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChangeCoverImageModal;
