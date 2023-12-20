import React, { useEffect, useState, useContext } from "react";
import "./ProfilePage.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { IPost } from "../../shared/interface/post.interface";
import { IUser } from "../../shared/interface/user.interface";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import CoverImage from "../../../components/common/ProfilePage/CoverImage";
import ProfileInfoMenu from "../../../components/common/ProfilePage/ProfileInfoMenu";
import { useProfilePageContext } from "../../../context/ProfilePageProvider";
import ProfilePageHome from "./ProfilePageHome";
import ProfilePageAbout from "./ProfilePageAbout";
import ProfilePagePhoto from "./ProfilePagePhoto";
import ProfilePageFriend from "./ProfilePageFriend";
import ProfilePageAlbum from "./ProfilePageFriend";
import { useParams } from "react-router-dom";
import useAxiosToken from "../../../hooks/useAxiosToken";
import { User, Post } from "../../../types/common";

interface ProfilPageType {
  userInfo?: User;
  postsInfo?: IPost;
}

const ProfilePage: React.FC<ProfilPageType> = () => {
  const [userId, setUserId] = useState<number>();
  // TODO: get current user id from auth
  const { selectedRoute } = useProfilePageContext();
  const [isPrivateProfile, setIsPrivateProfile] = useState<boolean>(false);
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  const { user, setUser } = useAuth();
  const axiosToken = useAxiosToken();

  const [userProfile, setUserProfile] = useState<User | null>(null);
  // const [posts, setPosts] = useState<Post[] | null>(null);
  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }
    setUserId(user?.id);
    if (user != null) {
      try {
        axiosToken.get(`/profile/view/${id}`).then((response) => {
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

          if (id && userId) {
            // Convert id to a number using parseInt
            const idAsNumber = parseInt(id); // The second parameter (10) is the radix/base, use 10 for decimal
            if (idAsNumber === userId) {
              console.log("====Is Private Profile====");
              setIsPrivateProfile(true);
            }
          }
        });
      } catch (error: any) {
        console.log("error message");
      }
    }
  }, [axiosToken, id, navigate, user, userId]);

  const renderMainPanelContent = () => {
    switch (selectedRoute) {
      case `/profile/${id}`:
        return (
          <ProfilePageHome
            userProfile={userProfile}
            isPrivateProfile={isPrivateProfile}
          />
        );
      case `/profile/${id}/about`:
        return <ProfilePageAbout />;
      case `/profile/${id}/friend`:
        return <ProfilePageFriend />;
      case `/profile/${id}/photo`:
        return <ProfilePagePhoto />;
      case `/profile/${id}/album`:
        return <ProfilePageAlbum />;
      default:
        return (
          <ProfilePageHome
            userProfile={userProfile}
            isPrivateProfile={isPrivateProfile}
          />
        );
    }
  };
  return (
    <div>
      <CoverImage src={coverImageUrl} isPrivateProfile={isPrivateProfile} />
      <ProfileInfoMenu
        userName={userProfile?.name}
        userId={id}
        isPrivateProfile={isPrivateProfile}
        userBio={userProfile?.bio}
      />
      <div>{renderMainPanelContent()}</div>
      {isPrivateProfile ? (
        <div>This is private</div>
      ) : (
        <div>This is public</div>
      )}
    </div>
  );
};
export default ProfilePage;
