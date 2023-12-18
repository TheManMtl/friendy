import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./ProfilePage.css";
import ProfileImage from "../../components/common/ProfileImage/ProfileImage";
import PostCard from "../../components/common/PostCard/PostCard";
import PostInput from "../../components/common/PostInput/PostInput";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { IPost } from "../shared/interface/post.interface";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import CoverImage from "../../components/common/CoverImage/CoverImage";
import ProfileInfoMenu from "../../components/common/ProfileInfoMenu/ProfileInfoMenu";
import PhotoGallery from "../../components/common/PhotoGallery/PhotoGallery";
import ProfileIntroCard from "../../components/common/ProfileIntroCard/ProfileIntroCard";
import { useProfilePageContext } from "../../context/ProfilePageProvider";

interface User {
  bio?: string;
  birthday?: Date;
  coverPostId?: number;
  createdAt: Date;
  email: string;
  location?: string;
  name: string;
  password: string;
  position?: string;
  profilePostId?: number;
  school?: string;
  workplace?: string;
}

interface Post {
  albumId?: number;
  authorId: number;
  commentCount: number;
  content?: string;
  id: number;
  imageId?: number;
  likeCount: number;
  postId?: number;
  profileId?: number;
}

interface ProfilPageType {
  userInfo?: User;
  postsInfo?: Post;
}

const ProfilePage: React.FC<ProfilPageType> = () => {
  // const [user, setUser] = useState<User | null>(null);
  // const [profileUrl, setProfileUrl] = useState<String | null>("");
  const [posts, setPosts] = useState<IPost[]>([]);

  // useEffect(() => {
  // axios
  //   .get(`${process.env.REACT_APP_HOST_URL}/api/users/auth`, {
  //     headers: {
  //       accessToken: localStorage.getItem("accessToken"),
  //     },
  //   })
  //   .then((response) => {
  //     if (response.data.error) {
  //       setAuthState({ ...authState, status: false });
  //     } else {
  //       setAuthState({
  //         email: response.data.email,
  //         id: response.data.id,
  //         role: response.data.role,
  //         approval: response.data.approval,
  //         status: true,
  //       });
  //     }
  //   });
  // TODO: get current user id from auth

  const { selectedRoute } = useProfilePageContext();

  const authContext = useContext(AuthContext);

  const [userProfile, setUserProfile] = useState<User | null>(null);
  // const [posts, setPosts] = useState<Post[] | null>(null);
  const [profileUrl, setProfileUrl] = useState<String | null>("");
  let navigate = useNavigate();

  useEffect(() => {
    if (authContext?.user == null) {
      navigate("/login");
    }
    console.log("ProfilePage - AuthContext:", authContext);
    console.log("ProfilePage - User:", authContext?.user);
    const userId = authContext?.user?.id;
    if (authContext != null) {
      try {
        axios
          .get(`${process.env.REACT_APP_HOST_URL}/api/profile/view/103`, {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          })
          .then((response) => {
            if (response.data.error) {
              console.log("====Error receiving response.data=====");
            } else {
              const user = response.data.profileInfo;
              setUserProfile({
                bio: user.bio,
                birthday: user.birthday,
                coverPostId: user.coverPostId,
                createdAt: user.createdAt,
                email: user.email,
                location: user.location,
                name: user.name,
                password: user.password,
                position: user.position,
                profilePostId: user.profilePostId,
                school: user.school,
                workplace: user.workplace,
              });
            }
          });
      } catch (error: any) {
        console.log("error message");
      }
    }

    axios
      .get(`${process.env.REACT_APP_HOST_URL}/api/posts/user/1`)
      .then((res) => {
        setPosts(res.data);
      });
  }, []);
  return (
    <div>
      <CoverImage />
      <ProfileInfoMenu userName={userProfile?.name} />

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
};
export default ProfilePage;
