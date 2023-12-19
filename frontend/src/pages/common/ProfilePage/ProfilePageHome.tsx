import React, { useState, useEffect } from "react";
import PhotoGallery from "../../../components/common/PhotoGallery/PhotoGallery";
import ProfileIntroCard from "../../../components/common/ProfileIntroCard/ProfileIntroCard";
import PostInput from "../../../components/common/PostInput/PostInput";
import { IPost } from "../../shared/interface/post.interface";
import PostCard from "../../../components/common/PostCard/PostCard";
import axios from "../../../services/api/axios";

function ProfilePageHome() {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    axios
      .get(`/posts/user/1`)
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  return (
    <div>
      <div className="contentSection row mt-1 px-5 py-3 d-flex justify-content-center">
        <div className="leftContent col-md-4">
          <ProfileIntroCard />
          <PhotoGallery />
        </div>
        {/* right content */}
        <div className="rightContent col-md-7">
          <div className="">
            <PostInput
              src={
                "https://www.istockphoto.com/resources/images/IllustrationsLanding/BackgroundTile.jpg"
              }
              alt={"profile"}
              size={"small"}
            />
          </div>
          {posts.map((post) => (
            <div key={`post-${post.id}`} className="mt-2">
              <PostCard
                profileImageSrc="https://picsum.photos/200"
                time={post.createdAt}
                username="username" // TODO: get username from auth
                content={post.content}
                thumbnailUrl={post.thumbnailUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePageHome;
