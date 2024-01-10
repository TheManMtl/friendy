import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Modal, Button, Form, Alert, Dropdown } from "react-bootstrap";
import { IPost } from "../../../pages/shared/interface/post.interface";
import axios from "../../../services/api/axios";
import useAxiosToken from "../../../hooks/useAxiosToken";
import { AuthContext } from "../../../context/AuthProvider";
import { IAlbum } from "../../../pages/shared/interface/album.interface";
import { useNavigate, useParams } from "react-router-dom";

type PostImageProps = {
  postId: number;
  alt: string;
  thumbnailUrl?: string;
  onPostDeleted: () => void;
};

const PostImage: React.FC<PostImageProps & { showAlert: (message: string) => void }> = (props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [moveToAlbumModal, setMoveToAlbumModal] = useState(false);
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const axiosToken = useAxiosToken();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const { id } = useParams();
  const userId = authContext?.user?.id;
  const [isPrivateProfile, setIsPrivateProfile] = useState<boolean>(false);
  const handleDeleteModal = async () => {

    try {
      await axiosToken.delete(`/posts/${props.postId}`);
      setDeleteModal(false);
      console.log("Post deleted successfully");
      props.onPostDeleted();
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const userId = authContext?.user?.id;
        axiosToken.get(`/albums/user/${userId}`).then((res) => {
          setAlbums(res.data);
          handlePrivateProfile();
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlbums();
  }, [id, userId]); // Empty dependency array for fetching on mount
  const handlePrivateProfile = () => {
    if (id === userId?.toString()) {
      setIsPrivateProfile(true);
    }
  }

  const handleMoveToAlbumModal = () => {
    setMoveToAlbumModal(true);
  };

  const handleAlbumSelection = (albumId: number) => {
    console.log(albumId + " is selected");
    setSelectedAlbumId(albumId);
  };
  const handleMoveToAlbum = async () => {
    console.log("Move to album button clicked");
    if (selectedAlbumId !== null) {
      try {
       await axiosToken.put(`/posts/toalbum/${props.postId}`, { albumId: selectedAlbumId });
        setMoveToAlbumModal(false);
        console.log("Post moved to album successfully");
        props.onPostDeleted();
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Please select an album");
    }
  };
  const displayPostDetail = () => {
    navigate(`/display?postid=${props.postId}`)
  };
  const handleProfilePicture = async () => {
    try {
      const reqBody = {
        type: "profilePic",
        userId: authContext?.user?.id,
      }
      await axiosToken.put(`/posts/updatetype/${props.postId}`, reqBody);
      console.log("Profile picture and album updated successfully");
      props.showAlert("Profile picture and album updated successfully");
    } catch (err) {
      console.error("Error updating profile picture or album:", err);
    }
  };
  const handleCoverPicture = async () => {
    try {
      const reqBody = {
        type: "coverPic",
        userId: authContext?.user?.id,
      }
      await axiosToken.put(`/posts/updatetype/${props.postId}`, reqBody);
      console.log("Cover picture and album updated successfully");
      props.showAlert("Cover picture and album updated successfully");
    } catch (err) {
      console.error("Error updating cover picture or album:", err);
    }
  }

  return (
    <div>
      {alertMessage && (
        <Alert variant="success" onClose={() => setAlertMessage(null)} dismissible>
          {alertMessage}
        </Alert>
      )}

      <div className="mt-3">
        <img
          src={props.thumbnailUrl}
          className="w-100 shadow-1-strong rounded mb-4"
          alt={"Post Thumbnail"}
          onClick={displayPostDetail}
        />

        <div className="position-absolute top-0 pt-2 end-0 m-3">

          {isPrivateProfile && (
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <i className="bi bi-three-dots-vertical"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setDeleteModal(true)}>Delete</Dropdown.Item>
                <Dropdown.Item onClick={() => setMoveToAlbumModal(true)}>Move to Album</Dropdown.Item>
                <Dropdown.Item onClick={handleProfilePicture}>Make profile picture</Dropdown.Item>
                <Dropdown.Item onClick={handleCoverPicture}>Make cover photo</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>

        {/* delete modal */}
        <Modal show={deleteModal} onHide={() => setDeleteModal(false)} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Delete Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteModal}>
              Yes, delete
            </Button>
          </Modal.Footer>
        </Modal>
        {/* move to album modal */}
        <Modal show={moveToAlbumModal} onHide={() => setMoveToAlbumModal(false)} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Move photo to another album</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Select another album for this photo
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Please select another album
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {albums.map((album) => (
                  <li key={album.id}><a className="dropdown-item" onClick={() => handleAlbumSelection(album.id)}>{album.title}</a></li>
                ))}

              </ul>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setMoveToAlbumModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleMoveToAlbum}>
              Move Photo
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>

  );
}
export default PostImage;