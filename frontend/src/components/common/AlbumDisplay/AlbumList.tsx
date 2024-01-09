'use client'
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileImage from "../ProfileImage/ProfileImage";
import {Card} from 'flowbite-react'
import Image from 'next/image';
import "../PostCard/PostCard.css";
import useAxiosToken from "../../../hooks/useAxiosToken";
import axios from "../../../services/api/axios";
import {Modal,Button} from "react-bootstrap";
import { AuthContext } from "../../../context/AuthProvider";
import "bootstrap/dist/js/bootstrap.bundle.min";

type AlbumListProps = {
  albumId: number
  title:string
   onAlbumDeleted: () => void;
}

const AlbumList: React.FC <AlbumListProps>= (props) => {
  const axiosToken = useAxiosToken();
    const [deleteModal, setDeleteModal] = useState(false);
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const userId = authContext?.user?.id;
    const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
    useEffect(() => {
      const fetchAlbumThumbnail = async () => {
        try {
          const response = await axiosToken.get(`posts/album/${props.albumId}/post`);
          console.log("Response data:", response.data); // Check the response structure
          setThumbnailUrl(response.data[0].thumbnailUrl);
          console.log("Thumbnail url:", thumbnailUrl);
        } catch (err) {
          console.log('Error fetching recent post image:',err);
        }
      };
      fetchAlbumThumbnail();
    }, [props.albumId, axiosToken]);
    const handleDeleteModal = async () =>{
      try{
         await axiosToken.delete(`/albums/${props.albumId}`);
         setDeleteModal(false);
         console.log("Album deleted successfully");
         setDeleteModal(false);
         props.onAlbumDeleted();
      }catch(err){
         console.log(err);
      }
     
    } 
    const displayAlbumDetail = () => {
      navigate(`/profile/${userId}/album/${props.albumId}`);
    };
    const handleEditAlbumClick = () => {
      navigate(`/profile/${userId}/editalbum/${props.albumId}`);
    }
    
  return (
 <div className="album-card">
  
  {thumbnailUrl &&(
    <img
    src={thumbnailUrl}
    alt="Album Thumbnail"
    
    className="rounded w-100 shadow-1-strong rounded "
    />
  )}
 

<div className="max-w-sm bg-white border mb-3 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<div className="p-5">
         
             <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"  onClick={displayAlbumDetail}>{props.title}</h5>
         
</div>
</div>
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
          Delete Album
        </a>
      </li>
      <li>
        <a className="dropdown-item" onClick={handleEditAlbumClick}>
          Edit Album
        </a>
      </li>
      
    </ul>
  </div>

</div>
<Modal show={deleteModal} onHide={() => setDeleteModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {props.title}?</Modal.Body>
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
};

export default AlbumList;