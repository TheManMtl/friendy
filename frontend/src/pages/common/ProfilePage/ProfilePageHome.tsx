import React, { useState, useEffect } from "react";
import PhotoGallery from "../../../components/common/ProfilePage/PhotoGallery";
import ProfileIntroCard from "../../../components/common/ProfilePage/ProfileIntroCard";
import PostInput from "../../../components/common/PostInput/PostInput";
import { IPost } from "../../shared/interface/post.interface";
import PostCard from "../../../components/common/PostCard/PostCard";
import axios from "../../../services/api/axios";
import PostModal from "../../../components/common/PostInput/PostModal";
import { User } from "../../../types/common";

interface ProfileHomeProps {
  userProfile: User | null;
}

const ProfilePageHome: React.FC<ProfileHomeProps> = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  //start Post modal section
  const [showPostModal, setShowPostModal] = useState<boolean>(false);
  const closePost = () => {
    setShowPostModal(false);
  };
  const openPost = () => setShowPostModal(true);

  //end Modal section

  useEffect(() => {
    axios.get(`/posts/user/1`).then((res) => {
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
              openPost={openPost}
            />
          </div>
          {posts.map((post) => (
            <div key={`post-${post.id}`} className="mt-2">
              <PostCard
                profileImageSrc="https://picsum.photos/200"
                time={post.createdAt}
                username={post.author.name}
                content={post.content}
                thumbnailUrl={post.thumbnailUrl}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Post Modal - This modal is opened by the button in PostInput component*/}
      <PostModal showPostModal={showPostModal} closePost={closePost} />
    </div>
  );
};

export default ProfilePageHome;
