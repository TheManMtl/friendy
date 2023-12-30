'use client'
import React, { useState } from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import {Card} from 'flowbite-react'
import Image from 'next/image';
import "../PostCard/PostCard.css";
import useAxiosToken from "../../../hooks/useAxiosToken";
import axios from "../../../services/api/axios";
import {Modal,Button} from "react-bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min";

type AlbumListProps = {
  albumId: number
  title:string
  thumbnailUrl?: string;

}
const AlbumList: React.FC <AlbumListProps>= (props) => {
  const axiosToken = useAxiosToken();
    const [deleteModal, setDeleteModal] = useState(false);
    const handleDeleteModal = () =>{
   
      try{
         axiosToken.delete(`/albums/${props.albumId}`);
         setDeleteModal(false);
         console.log("Album deleted successfully");
      }catch(err){
         console.log(err);
      }
    } 
  return (
    
  
//   <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//     <a href="">
//         <img className="rounded-t-lg" src="" alt="" />
//     </a>
//     <div className="p-5">
//         <a href="">
//             <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h5>
//         </a>
       
//         <a href="" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//             Read more
//              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
//             </svg>
//         </a>
//     </div>
// </div>
 <div className="">
{/* <img
  src={props.thumbnailUrl} 
  className="w-100 shadow-1-strong rounded mb-4"
  alt={"Post Thumbnail"}
/> */}
<div className="max-w-sm bg-white border mb-3 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<div className="p-5">
         <a href="">
             <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h5>
         </a>
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
        <a className="dropdown-item" href="#">
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