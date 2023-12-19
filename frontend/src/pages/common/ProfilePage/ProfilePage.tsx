import React, { useEffect, useState, useContext } from "react";
import axios from "../../../services/api/axios";
import "./ProfilePage.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { IPost } from "../../shared/interface/post.interface";
import { IUser } from "../../shared/interface/user.interface";
import { AuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import CoverImage from "../../../components/common/CoverImage/CoverImage";
import ProfileInfoMenu from "../../../components/common/ProfileInfoMenu/ProfileInfoMenu";
import { useProfilePageContext } from "../../../context/ProfilePageProvider";
import ProfilePageHome from "./ProfilePageHome";
import ProfilePageAbout from "./ProfilePageAbout";
import ProfilePagePhoto from "./ProfilePagePhoto";
import ProfilePageFriend from "./ProfilePageFriend";
import ProfilePageAlbum from "./ProfilePageFriend";

interface ProfilPageType {
  userInfo?: IUser;
  postsInfo?: IPost;
}

const ProfilePage: React.FC<ProfilPageType> = () => {
  // const [user, setUser] = useState<User | null>(null);
  // const [profileUrl, setProfileUrl] = useState<String | null>("");
  const [posts, setPosts] = useState<IPost[]>([]);
  const [userId, setUserId] = useState<number>();
  // TODO: get current user id from auth

  const { selectedRoute } = useProfilePageContext();

  const authContext = useContext(AuthContext);

  const [userProfile, setUserProfile] = useState<IUser | null>(null);
  // const [posts, setPosts] = useState<Post[] | null>(null);
  let navigate = useNavigate();

  useEffect(() => {
    if (authContext?.user == null) {
      navigate("/login");
    }
    console.log("ProfilePage - AuthContext:", authContext);
    console.log("ProfilePage - User:", authContext?.user);
    setUserId(authContext?.user?.id);
    const userId = authContext?.user?.id;
    if (authContext?.user != null) {
      try {
        axios
          .get(`/profile/view/${userId}`, {
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
      .get(`/posts/user/${userId}`)
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  const renderMainPanelContent = () => {
    console.log("====userId before render====" + userId);

    switch (selectedRoute) {
      case `/profile/${userId}`:
        return <ProfilePageHome />;
      case `/profile/${userId}/about`:
        return <ProfilePageAbout />;
      case `/profile/${userId}/friend`:
        return <ProfilePageFriend />;
      case `/profile/${userId}/photo`:
        return <ProfilePagePhoto />;
      case `/profile/${userId}/album`:
        return <ProfilePageAlbum />;
      default:
        return <ProfilePageHome />;
    }
  };
  return (
    <div>
      <CoverImage />
      <ProfileInfoMenu userName={userProfile?.name} userId={userId} />
      <div>{renderMainPanelContent()}</div>
    </div>
  );
};
export default ProfilePage;
