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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("====image file changed===");
    const file = event?.target?.files?.[0];
    setFile(file);
  };
  const uploadFile = () => {
    console.log("===upload image button clicked===");
    if (file !== undefined && file !== null) {
      console.log("===File has been loaded===");
      const formData = new FormData();
      formData.append("image", file);
      console.log("====file appended====");
      console.log("===userId:====" + userId);

      if (userId) {
        // const userIdAsNumber = parseInt(userId);
        // Append other fields to formData
        formData.append("authorId", userId.toString());
        formData.append("type", PostType.profilePic);
        formData.append("content", "This is a profile image");
        formData.append("profileId", userId.toString());
      }

      for (const entry of formData.entries()) {
        const [fieldName, fieldValue] = entry;
        console.log(`${fieldName}: ${fieldValue}`);
      }

      axiosToken
        .post("/posts/", formData)
        .then((response) => {
          console.log("pictureId", response.data.id);
          // TODO:use flash message
          alert("Picture successfully uploaded!");
        })
        .catch((error) => {
          console.log(error);
        });
      setFile(undefined);
    } else {
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
        show={showChangeProfileModal}
        onHide={closeChangeProfileModal}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Change profile image</Modal.Title>
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

          <Button variant="secondary" onClick={closeChangeProfileModal}>
            Close
          </Button>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChangeProfileModal;
