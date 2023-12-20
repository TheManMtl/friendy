import React, { useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Modal,Button} from "react-bootstrap";
import { IPost } from "../../../pages/shared/interface/post.interface";
import axios from "../../../services/api/axios";

type PostImageProps = {
  postId:number;
  alt: string;
  thumbnailUrl?: string;
};

const PostImage: React.FC<PostImageProps> = (props) => {
  const[deleteModal, setDeleteModal] = useState(false);

  const handleDeleteModal = () =>{
   
     try{
        axios.delete(`/posts/${props.postId}`);
        setDeleteModal(false);
        console.log("Post deleted successfully");
     }catch(err){
        console.log(err);
     }
    

  }
  return (
    <div className="container">
    <div className="row">
      <div className="col-lg-4 col-md-12 mb-4 mb-lg-0 position-relative">
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
                <a className="dropdown-item" onClick={()=>setDeleteModal(true)}>
                  Delete
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
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
      </div>
    </div>
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
  </div>


  );
    }
export default PostImage;