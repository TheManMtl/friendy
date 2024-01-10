'use client'
import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Card } from 'flowbite-react'
import Image from 'next/image';
import { IAlbum } from "../../shared/interface/album.interface";
import useAxiosToken from "../../../hooks/useAxiosToken";
import { AuthContext } from "../../../context/AuthProvider";
import AlbumList from "../../../components/common/AlbumDisplay/AlbumList";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface ProfilePageAlbumProps {
    profileId: number | undefined;
}
const ProfilePageAlbum:React.FC<ProfilePageAlbumProps> = ({ profileId }) => {
    const [albums, setAlbums] = useState<IAlbum[]>([]);
    const authContext = useContext(AuthContext);
    const axiosToken = useAxiosToken();
    const navigate = useNavigate();
    // const profileId = authContext?.user?.id;

    // const {userId}= useParams();
    const fetchAlbums = async () => {
        try {
            await axiosToken
                .get(`/albums/user/${profileId}`)
                .then((res) => {
                    setAlbums(res.data);
                });
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchAlbums();
    }, []);

    const handleCreateAlbumClick = () => {
        navigate(`/profile/${profileId}/createalbum`);
    };

    return (

        <div className="container">

            <Button variant="secondary" onClick={handleCreateAlbumClick} className="mt-3">Create Album</Button>

            <div className="row mt-3 mb-3">
                {albums.map((album) => (
                    <div key={`album-${album.id}`} className="col-lg-4 col-md-12 mb-4 mb-lg-0 position-relative">
                        <AlbumList
                            albumId={album.id}
                            title={album.title}
                            
                            onAlbumDeleted={fetchAlbums}
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
