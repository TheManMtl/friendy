import React, { FormEvent, useContext, useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./CreateAlbum.css";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Post, PostType } from "../../../types/common";
import { AuthContext } from "../../../context/AuthProvider";
import useAxiosToken from "../../../hooks/useAxiosToken";
import { useProfilePageContext } from "../../../context/ProfilePageProvider";

function CreateAlbum() {
    const authContext = useContext(AuthContext);
    const [files, setFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [title, setTitle] = useState<string>("")
    const axiosToken = useAxiosToken();
    const navigate = useNavigate();
    const userId = authContext?.user?.id;
    const { setRoute } = useProfilePageContext();
    const handleLinkClick = (route: string) => {
        setRoute(route);
    };
    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const newAlbum = await axiosToken.post("/albums", {
                title: title,
                profileId: userId
            });

            console.log(newAlbum.data.id);
            console.log(files.length);

            const imageData = new FormData();
            if (files.length !== 0 && newAlbum.data.id !== null) {
                for (let file of files) {
                    imageData.append("images", file);
                };
                imageData.append("authorId", authContext?.user?.id.toString() ?? "");
                imageData.append("type", PostType.albumImg);
                imageData.append("albumId", newAlbum.data.id.toString() ?? "");
                await axiosToken.post("/posts/multiple", imageData, { headers: { 'Content-Type': 'multipart/form-data' } });
            }
            navigate(`/profile/${userId}/album`);
        } catch (err) {
            console.log("Error creating album", err);
        }
    }

    const handleFileChange = (e: any) => {
        setFiles(e.target.files);
        const imageUrls: string[] = [];
        for (let file of e.target.files) {
            imageUrls.push(URL.createObjectURL(file));
        }
        setImagePreviews(imageUrls);
    };


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
                    <h2 className="pt-5 mb-5">Create Album</h2>
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
                                <input type="file" name="images" multiple accept="image/*" onChange={handleFileChange} id="fileInput" className="file-input" />
                                Upload Photos
                            </label>
                        </div>
                        <button type="submit" className="btn-input mb-5">Submit</button>
                    </form>

                </div>
            </div>

            <div className="container col-xl-9">
                <div className="row">
                    {imagePreviews.map((imageSrc, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-4 mb-3">
                            <img src={imageSrc} alt={`preview-${index}`} className="img-fluid" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default CreateAlbum;