import React, { FormEvent, useContext, useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./CreateAlbum.css";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Post, PostType } from "../../../types/common";
import { AuthContext } from "../../../context/AuthProvider";
import useAxiosToken from "../../../hooks/useAxiosToken";
import { useParams } from 'react-router-dom';
import { useProfilePageContext } from "../../../context/ProfilePageProvider";
// function EditAlbum() {
  
    const EditAlbum =()=> {
        const { albumId } = useParams();
    const authContext = useContext(AuthContext);
    const [files, setFiles] = useState<File[]>([]);
    const [title, setTitle] = useState<string>("")
    const axiosToken = useAxiosToken();
    const userId=authContext?.user?.id;
    const { setRoute } = useProfilePageContext();
    const navigate = useNavigate();
    const handleLinkClick = (route: string) => {
        setRoute(route);
      };
    useEffect(() => {
        try{
            axiosToken.get(`/albums/${albumId}`).then((res) => {
               
                setTitle(res.data.title);
            })
        }catch(err){
            console.log("can't find the album",err);
        }
    }, [albumId]);


    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
try{
        const newAlbum = await axiosToken.put(`/albums/${albumId}`, { 
                                                title: title, 
                                                profileId: authContext?.user?.id});

        const imageData = new FormData();
        if (files.length !== 0 && newAlbum.data.id !== null) {
            files.forEach((file, index) => {
                imageData.append("images", file);
              });
            imageData.append("albumId", newAlbum.data.id.toString());
            imageData.append("authorId", authContext?.user?.id.toString() ?? "");
            // imageData.append("profileId", authContext?.user?.id.toString() ?? "");
            // imageData.append("type", PostType.albumImg);
            imageData.append("albumId", newAlbum.data.id.toString() ?? "");
            await axiosToken.post("/posts/multiple", imageData, { headers: { 'Content-Type': 'multipart/form-data' } });
        }
        navigate(`/profile/${userId}/album`);
    } catch (err) {
        console.log("Error editing album",err);
    }
    }

    return (
        <div className="parent-container d-flex">
            <div className="container leftPanel col-xl-3">
                <div className="row">
                    <div className="col-xl-3 mb-3">
                    <Link to={`/profile/${userId}/album`}
            onClick={() => handleLinkClick(`/profile/${userId}/album`)}>
                        <Button variant="link" >
                            <i className="bi bi-arrow-left-circle-fill text-secondary fs-3"></i>
                        </Button>
                    </Link>
                    </div>
                    <hr></hr>
                    <h2 className="pt-5 mb-5">Edit Album</h2>
                    <form onSubmit={submit}>
                        <div className="mb-5">

                            <input
                                type="text"
                                className="form-control"
                                id="albumTitle"
                                placeholder={title}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="fileInput" className="custom-file-upload">
                                <input type="file" multiple accept="image/*" onChange={(e: any) => setFiles(e.target.files)} id="fileInput" className="file-input" />
                                Upload Photos
                            </label>
                        </div>
                        <button type="submit" className="btn-input mb-5">Submit</button>
                    </form>

                </div>
            </div>

            <div className="container col-xl-9">
                <div className="row">
                    <div className="">
                        Container Right
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditAlbum;