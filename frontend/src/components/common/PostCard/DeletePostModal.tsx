import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "../Button/Button";
import useAxiosToken from "../../../hooks/useAxiosToken";
import { AxiosError } from "axios";
import { apiError } from "../../../types/common";

interface DeletePostModalProps {
    showDeleteModal: boolean;
    closeDeleteModal: () => void;
    postId?: number;
}

const DeletePostModal: React.FC<DeletePostModalProps> = ({
    showDeleteModal,
    closeDeleteModal,
    postId,
}) => {
    const axiosToken = useAxiosToken();
    const [errorMessage, setErrorMessage] = useState('');

    //FIXME: trigger update to parent component
    const handleDelete = async () => {
        try {

            await axiosToken.delete(`/posts/${postId}`);
            closeDeleteModal();

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
    return (
        <div>
            <Modal centered={true} show={showDeleteModal} onHide={closeDeleteModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Delete post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row px-5 my-5 justify-content-center">
                        {
                            errorMessage ? (
                                <>Error: {errorMessage}</>
                            ) : (
                                <>Move post to trash?</>
                            )
                        }
                    </div>
                    <div className="row px-5 my-5 justify-content-center">
                        <div className="col-6">
                        <Button
              type="submit"
              variant="blue"
              label="Confirm"
              onClick={handleDelete}
            ></Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DeletePostModal;
