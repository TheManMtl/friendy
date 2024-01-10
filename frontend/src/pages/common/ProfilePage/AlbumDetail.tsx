
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./PhotoPage.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Dropdown } from 'flowbite-react';
import { IPost } from "../../shared/interface/post.interface";
import { AuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import PostImage from "../../../components/common/PostImage/PostImage";
import axios from "../../../services/api/axios";
import useAxiosToken from "../../../hooks/useAxiosToken";
import { Button } from "react-bootstrap";
import { useProfilePageContext } from "../../../context/ProfilePageProvider";
import { IUser } from "../../shared/interface/user.interface";

function AlbumDetail() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const authContext = useContext(AuthContext);
  const userId = authContext?.user?.id;
  const axiosToken = useAxiosToken();
  const { albumId } = useParams();
  const navigate = useNavigate();
  const { setRoute } = useProfilePageContext();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
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
    if (albumId) {
      axiosToken
        .get(`/posts/album/${albumId}`)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log("Can't find posts for album", err);
        });
    }

  }, [albumId, axiosToken]);

  const handleNavigate = () => {
    if (authContext && userId) {
      navigate(`/profile/${userId}/album`);
    } else {
      console.log("User ID not found");
    }
  }
  const showAlert = (message: string) => {
    setAlertMessage(message);
  };
  return (
    <div>
      <div className="row">
        <div className="col-xl-2 mb-3">
          <Link to={`/profile/${userId}/album`}
            onClick={() => handleLinkClick(`/profile/${userId}/album`)}>
            <Button variant="link">
              <i className="bi bi-arrow-left-circle text-secondary fs-3 "></i>
            </Button>
          </Link>
        </div>

      </div>


      <div className="container">
        <div className="row">
          {posts.map((post) => (
            <div key={`post-${post.id}`} className="col-lg-4 col-md-12 mb-4 mb-lg-0 position-relative">
              <PostImage
                postId={post.id}
                thumbnailUrl={post.thumbnailUrl}
                alt={"thumbnail"}
                showAlert={showAlert}
                onPostDeleted={refreshPosts}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default AlbumDetail;