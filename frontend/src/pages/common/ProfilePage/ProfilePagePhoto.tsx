
import React, { useContext, useEffect, useState } from "react";
import "./PhotoPage.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Dropdown } from 'flowbite-react';
import { IPost } from "../../shared/interface/post.interface";
import { AuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import PostImage from "../../../components/common/PostImage/PostImage";
import axios from "../../../services/api/axios";
import useAxiosToken from "../../../hooks/useAxiosToken";

function ProfilePagePhoto() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const authContext = useContext(AuthContext);
 const axiosToken = useAxiosToken();

  useEffect(() => {
    const userId = authContext?.user?.id;
    axiosToken
      .get(`/posts/user/${userId}`) // TODO: get user id from auth
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  return (
    <div>
      
      <div className="container">
    <div className="row">
      {posts.map((post) => (
        <div key={`post-${post.id}`} className="col-lg-4 col-md-12 mb-4 mb-lg-0 position-relative">
          <PostImage
           postId={post.id}
            thumbnailUrl={post.thumbnailUrl}
            alt={"thumbnail"}
          />
        </div>
      ))}
      </div>
      </div>
    </div>
  )
}



export default ProfilePagePhoto;
