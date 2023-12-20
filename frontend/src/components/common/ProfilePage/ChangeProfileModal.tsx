import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Field } from "formik";
import ProfileImage from "../ProfileImage/ProfileImage";
import * as Yup from "yup";
import { Button as ButtonF } from "../../../components/common";
import axios from "../../../services/api/axios";
import { Post, PostType } from "../../../types/common";
import { AuthContext } from "../../../context/AuthProvider";

interface ChangeProfiletModalProps {
  showChangeProfileModal: boolean;
  closeChangeProfileModal: () => void;
}

const ChangeProfileModal: React.FC<ChangeProfiletModalProps> = ({
  showChangeProfileModal,
  closeChangeProfileModal,
}) => {
  const authContext = useContext(AuthContext);
  const [file, setFile] = useState<File>();

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
              <Form.Control type="file" accept="image/*" />
            </Form.Group>
            <ButtonF
              variant="color"
              label="Up load"
              //   onClick={uploadFiles}
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
