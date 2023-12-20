
import React, { useContext, useEffect, useState } from "react";
import "./PhotoPage.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Dropdown } from 'flowbite-react';
import { IPost } from "../../shared/interface/post.interface";
import { AuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import PostImage from "../../../components/common/PostImage/PostImage";
import axios from "../../../services/api/axios";

function ProfilePagePhoto() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const authContext = useContext(AuthContext);


  useEffect(() => {
    const userId = authContext?.user?.id;
    axios
      .get(`/posts/user/${userId}`) // TODO: get user id from auth
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={`post-${post.id}`} className="mt-2">
          <PostImage
           postId={post.id}
            thumbnailUrl={post.thumbnailUrl}
            alt={"thumbnail"}
          />
        </div>
      ))}
    </div>
  )
}



export default ProfilePagePhoto;
