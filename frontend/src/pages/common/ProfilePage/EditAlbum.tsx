import React, { FormEvent, useContext, useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./CreateAlbum.css";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Post, PostType } from "../../../types/common";
import { AuthContext } from "../../../context/AuthProvider";
import useAxiosToken from "../../../hooks/useAxiosToken";

function EditAlbum() {
    const authContext = useContext(AuthContext);
    const [files, setFiles] = useState<File[]>([]);
    const [title, setTitle] = useState<string>("")
    const axiosToken = useAxiosToken();
    const navigate = useNavigate();
    const initialValues = {
        profileId: authContext?.user?.id,
        authorId: authContext?.user?.id,
        type: PostType.timeline,
        content: "",
        imageId: null,
    };

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const newAlbum = await axiosToken.post("/albums", { 
                                                title: title, 
                                                profileId: authContext?.user?.id});

        const imageData = new FormData();
        if (files.length !== 0 && newAlbum.data.id !== null) {
            files.forEach((file, index) => {
                imageData.append("images", file);
              });
            imageData.append("albumId", newAlbum.data.id.toString());
            imageData.append("authorId", authContext?.user?.id.toString() ?? "");
            imageData.append("profileId", authContext?.user?.id.toString() ?? "");
            imageData.append("type", PostType.albumImg);
            imageData.append("albumId", newAlbum.data.id.toString() ?? "");
        }

        const post = await axiosToken.post("/posts", imageData, { headers: { 'Content-Type': 'multipart/form-data' } })
    }

    return (
        <div className="parent-container d-flex">
            <div className="container leftPanel col-xl-3">
                <div className="row">
                    <div className="col-xl-3 mb-3">
                        <Button variant="link" onClick={() => navigate(-1)}>
                            <i className="bi bi-arrow-left-circle-fill text-secondary fs-3"></i>
                        </Button>
                    </div>
                    <hr></hr>
                    <h2 className="pt-5 mb-5">Edit Album</h2>
                    <form onSubmit={submit}>
                        <div className="mb-5">

                            <input
                                type="text"
                                className="form-control"
                                id="albumTitle"
                                placeholder="Album Title"
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