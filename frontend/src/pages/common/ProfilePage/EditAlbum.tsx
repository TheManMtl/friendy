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
import { IPost } from "../../shared/interface/post.interface";
import PostImage from "../../../components/common/PostImage/PostImage";
// function EditAlbum() {

const EditAlbum = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const { albumId } = useParams();
    const authContext = useContext(AuthContext);
    const [files, setFiles] = useState<File[]>([]);
    const [title, setTitle] = useState<string>("")
    const axiosToken = useAxiosToken();
    const userId = authContext?.user?.id;
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const { setRoute } = useProfilePageContext();
    const navigate = useNavigate();
    const handleLinkClick = (route: string) => {
        setRoute(route);
    };
    const refreshPosts = async () => {
        console.log("Refreshing posts");

        try {
            await axiosToken
                .get(`/posts/album/${albumId}`)
                .then((res) => {
                    setPosts(res.data);
                });
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        try {
            axiosToken.get(`/albums/${albumId}`).then((res) => {

                setTitle(res.data.title);
            })
            refreshPosts()
        } catch (err) {
            console.log("can't find the album", err);
        }
    }, [albumId]);

    const showAlert = (message: string) => {
        setAlertMessage(message);
    };
    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const newAlbum = await axiosToken.put(`/albums/${albumId}`, {
                title: title,
                profileId: authContext?.user?.id
            });

            const imageData = new FormData();
            if (files.length !== 0 && newAlbum.data.id !== null) {
                // files.forEach((file, index) => {
                //     imageData.append("images", file);
                // });
                for (let file of files) {
                    imageData.append("images", file);
                };
                imageData.append("albumId", newAlbum.data.id.toString());
                imageData.append("authorId", authContext?.user?.id.toString() ?? "");
                // imageData.append("profileId", authContext?.user?.id.toString() ?? "");
                // imageData.append("type", PostType.albumImg);
                imageData.append("albumId", newAlbum.data.id.toString() ?? "");
                await axiosToken.post("/posts/multiple", imageData, { headers: { 'Content-Type': 'multipart/form-data' } });
            }
            navigate(`/profile/${userId}/album`);
        } catch (err) {
            console.log("Error editing album", err);
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
                                <input type="file" multiple accept="image/*" onChange={handleFileChange} id="fileInput" className="file-input" />
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
                        <div className="row">
                            {posts.map((post) => (
                                <div key={`post-${post.id}`} className="col-lg-4 col-md-12 mb-4 mb-lg-0 position-relative">
                                    <div className="row">

                                        <PostImage
                                            postId={post.id}
                                            thumbnailUrl={post.thumbnailUrl}
                                            alt={"thumbnail"}
                                            showAlert={showAlert}
                                            onPostDeleted={refreshPosts}
                                        />
                                        {imagePreviews.map((imageSrc, index) => (
                                            <div key={index} className="col-12 col-md-6 col-lg-4 mb-3">
                                                <img src={imageSrc} alt={`preview-${index}`} className="img-fluid" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditAlbum;