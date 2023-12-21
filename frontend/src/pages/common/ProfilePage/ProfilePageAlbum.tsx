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
import { Link } from "react-router-dom";
function ProfilePageAlbum () {
    const[albums, setAlbums] = useState<IAlbum[]>([]);
    const authContext = useContext(AuthContext);
    const axiosToken = useAxiosToken();
    useEffect(() => {
        const userId = authContext?.user?.id;
        axiosToken
            .get(`/album/user/${userId}`) // TODO: get user id from auth
            .then((res) => {
            setAlbums(res.data);
            });
        }, []);
  return (
  
  <div className="container">
    <Link to="/createalbum">
    <Button variant="secondary" className="mt-3">Create Album</Button>
    </Link>
    <div className="row mt-3">
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
