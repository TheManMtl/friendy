'use client'
import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Card} from 'flowbite-react'
import Image from 'next/image';
import { IAlbum } from "../../shared/interface/album.interface";
import useAxiosToken from "../../../hooks/useAxiosToken";
import { AuthContext } from "../../../context/AuthProvider";
import AlbumList from "../../../components/common/AlbumDisplay/AlbumList";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function ProfilePageAlbum () {
    const[albums, setAlbums] = useState<IAlbum[]>([]);
    const authContext = useContext(AuthContext);
    const axiosToken = useAxiosToken();
    const navigate = useNavigate();
    
    const {userId}= useParams();
    useEffect(() => {
        const userId = authContext?.user?.id;
        axiosToken
            .get(`/albums/user/${userId}`) 
            .then((res) => {
            setAlbums(res.data);
            });
        }, []);
        const handleCreateAlbumClick = () => {
            navigate(`/profile/${userId}/createalbum`);
          };
  return (
  
  <div className="container">
   
    <Button variant="secondary" onClick={handleCreateAlbumClick} className="mt-3">Create Album</Button>
    
    <div className="row mt-3 mb-3">
    {albums.map((album)=> (
        <div key={`album-${album.id}`} className="col-lg-4 col-md-12 mb-4 mb-lg-0 position-relative">
            <AlbumList
            albumId={album.id}
            title={album.title}       
            />
        </div>
        )
    )
        }
        </div>
  </div>
  );
};

export default ProfilePageAlbum;
