import React, { useContext, useEffect, useState } from "react";
import "./PhotoPage.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Dropdown } from "flowbite-react";
import { IPost } from "../../shared/interface/post.interface";
import { AuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import PostImage from "../../../components/common/PostImage/PostImage";
import axios from "../../../services/api/axios";
import useAxiosToken from "../../../hooks/useAxiosToken";
import { Alert } from "react-bootstrap";

interface ProfilePagePhotoProps {
  profileId: number | undefined;
}

const ProfilePagePhoto: React.FC<ProfilePagePhotoProps> = ({ profileId }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const axiosToken = useAxiosToken();

  const refreshPosts = async () => {
    console.log("Refreshing posts");
    
    try {
      await axiosToken
          .get(`/posts/user/${profileId}/photos`)
          .then((res) => {
              setPosts(res.data);
          });
  } catch (err) {
      console.log(err);
  }
  };
  useEffect(() => {
   refreshPosts();
  }, [profileId]);
  const showAlert = (message: string) => {
    setAlertMessage(message);
  };
  return (
    <div>
      {alertMessage && (
        <Alert
          variant="success"
          onClose={() => setAlertMessage(null)}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
      <div className="container">
        <div className="row">
          {posts.map((post) => (
            <div
              key={`post-${post.id}`}
              className="col-lg-4 col-md-12 mb-4 mb-lg-0 position-relative"
            >
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
  );
};

export default ProfilePagePhoto;
