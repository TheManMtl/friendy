import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button as ButtonF } from "../../../components/common";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useAxiosToken from "../../../hooks/useAxiosToken";

interface ChangePasswordModalProps {
  showChangePasswordModal: boolean;
  closeChangePasswordModal: () => void;
}

interface ChangePasswordProps {
  oldPassword: string;
  newPassword: string;
  newPasswordCopy: string;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  closeChangePasswordModal,
  showChangePasswordModal,
}) => {
  const axiosToken = useAxiosToken();
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    newPasswordCopy: "",
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().min(6).required(),
    newPassword: Yup.string().min(6).required(),
    newPasswordCopy: Yup.string().min(6).required(),
  });
  const onSubmit = (data: ChangePasswordProps) => {
    axiosToken
      .put("/users/password", data)
      .then((response) => {
        closeChangePasswordModal();
        alert("password updated successfully");
      })
      .catch((error: any) => {
        console.log("===error message====" + error.response.data.message);
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.message);
        } else {
          // If no specific error message is available, set a generic one
          setErrorMessage("An error occurred during login.");
        }
      });
  };
  return (
    <div>
      <div>
        {" "}
        <Modal
          centered
          show={showChangePasswordModal}
          onHide={closeChangePasswordModal}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                {/* old password */}
                <div className="form-group my-4 mx-4">
                  <Field
                    type="text"
                    id="oldPassword"
                    name="oldPassword"
                    placeholder="Old Password"
                  />
                  <ErrorMessage name="oldPassword" component="div" />
                </div>
                {/* new password */}
                <div className="form-group my-4 mx-4">
                  <Field
                    type="text"
                    id="newPassword"
                    name="newPassword"
                    placeholder="New Password"
                  />
                  <ErrorMessage name="newPassword" component="div" />
                </div>
                {/* new password copy */}
                <div className="form-group my-4 mx-4">
                  <Field
                    type="text"
                    id="newPasswordCopy"
                    name="newPasswordCopy"
                    placeholder="New Password Repeat"
                  />
                  <ErrorMessage name="newPasswordCopy" component="div" />
                </div>
                {errorMessage && (
                  <div className="red mx-4"> {errorMessage}</div>
                )}
                <div className="mx-4">
                  <button className="btn-block btn-color" type="submit">
                    Update
                  </button>
                </div>
              </Form>
            </Formik>
            {/* <Button variant="secondary" onClick={closeChangePasswordModal}>
              Close
            </Button> */}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
