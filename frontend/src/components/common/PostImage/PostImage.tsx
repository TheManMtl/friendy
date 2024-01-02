import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Modal, Button, Form } from "react-bootstrap";
import { IPost } from "../../../pages/shared/interface/post.interface";
import axios from "../../../services/api/axios";
import useAxiosToken from "../../../hooks/useAxiosToken";
import { AuthContext } from "../../../context/AuthProvider";
import { IAlbum } from "../../../pages/shared/interface/album.interface";

type PostImageProps = {
  postId: number;
  alt: string;
  thumbnailUrl?: string;
};

const PostImage: React.FC<PostImageProps> = (props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [moveToAlbumModal, setMoveToAlbumModal] = useState(false);
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const axiosToken = useAxiosToken();
  const authContext = useContext(AuthContext);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const handleDeleteModal = () => {

    try {
      axiosToken.delete(`/posts/${props.postId}`);
      setDeleteModal(false);
      console.log("Post deleted successfully");
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
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlbums();
  }, []); // Empty dependency array for fetching on mount

  const handleMoveToAlbumModal = () => {
    setMoveToAlbumModal(true);
  };

  // const handleMoveToAlbumModal = () => {

  //   try {
  //     axiosToken.put(`/posts/${props.postId}/album`);
  //     setMoveToAlbumModal(false);
  //     console.log("Post is moved to album successfully");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // const handleMoveToAlbumModalOpen = () => {
  //   fetchAlbums();
  //   setMoveToAlbumModal(true);
  // };

  // const fetchAlbums = () => {
  //   const userId = authContext?.user?.id;
  //   try{
  //     axiosToken.get(`/albums/user/${userId}`).then((res) => {
  //       setAlbums(res.data);
  //     });

  //   }catch(err){
  //     console.log(err);
  //   }
  // }
  const handleAlbumSelection = (albumId: number) => {
    console.log(albumId + " is selected");
    setSelectedAlbumId(albumId);
  };
  const handleMoveToAlbum = () => {
    console.log("Move to album button clicked");
    if (selectedAlbumId !== null) {
      try {
        axiosToken.put(`/posts/toalbum/${props.postId}`, { albumId: selectedAlbumId });
        setMoveToAlbumModal(false);
        console.log("Post moved to album successfully");
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Please select an album");
    }
  };

  return (

    <div className="">
      <img
        src={props.thumbnailUrl}
        className="w-100 shadow-1-strong rounded mb-4"
        alt={"Post Thumbnail"}
      />

      <div className="position-absolute top-0 end-0 m-3">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-three-dots-vertical"></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" onClick={() => setDeleteModal(true)}>
                Delete
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={() => setMoveToAlbumModal(true)}>
                Move to Album
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Make profile picture
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Make cover photo
              </a>
            </li>
          </ul>
        </div>

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


  );
}
export default PostImage;