import React, { useEffect, useState } from "react";

import "./ImagePostDisplay.css";
import useAxiosToken from "../../../hooks/useAxiosToken";
import ImageDisplay from "./ImageDisplay";
import ImagePostContent from "./ImagePostContent";
import { useSearchParams } from "react-router-dom";
import { SinglePost } from "../../../models/SinglePost";
import { Profile } from "../../../models/Profile";

type ImagePostDisplayProps = {};

const ImagePostDisplay: React.FC<ImagePostDisplayProps> = ({}) => {
  const axiosToken = useAxiosToken();
  const [searchParams] = useSearchParams();
  const [post, setPost] = useState<SinglePost>();
  const [user, setUser] = useState<Profile>();

  useEffect(() => {
    const postId = searchParams.get("postid");
    let authorId: number;
    const fetchData = async () => {
      await axiosToken
        .get(`${process.env.REACT_APP_HOST_URL}/posts/${postId}`)
        .then((response: any) => {
          console.log(response.data);
          authorId = response.data.authorId;
          if (response.data.imageUrl == null) {
            console.log("not an image");
          }
          setPost(response.data);
        })
        .catch((error: any) => {
          console.log(error);
        });

      await axiosToken
        .get(`${process.env.REACT_APP_HOST_URL}/profile/view/${authorId}`)
        .then((response: any) => {
          console.log(response.data);
          setUser(response.data.profileInfo);
        })
        .catch((error: any) => {
          console.log(error);
        });
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="container-fluid wh-100">
      <div className="d-flex flex-lg-row flex-column">
        <div className="flex-grow-1 bg-black full-height">
          {post?.imageUrl && <ImageDisplay src={post.imageUrl} />}
        </div>

        <div className=" post-content h-100">
          {user && post && <ImagePostContent user={user!} post={post!} />}
        </div>
      </div>
    </div>
  );
};

export default ImagePostDisplay;
