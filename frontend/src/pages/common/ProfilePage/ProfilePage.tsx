import React, { useEffect, useState } from "react";
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
import ProfilePageAlbum from "./ProfilePageAlbum";
import { useParams } from "react-router-dom";
import useAxiosToken from "../../../hooks/useAxiosToken";
import { AxiosError } from "axios";
import { apiError } from "../../../types/common";
import { idText } from "typescript";

interface ProfilPageType {
  userInfo?: IUser;
  postsInfo?: IPost;
}

const ProfilePage: React.FC<ProfilPageType> = () => {
  const [userId, setUserId] = useState<number>();
  const { selectedRoute } = useProfilePageContext();
  const [isPrivateProfile, setIsPrivateProfile] = useState<boolean>(false);
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  const { user } = useAuth();
  const axiosToken = useAxiosToken();
  const [profileThumb, setProfileThumb] = useState<string>("");
  const [currentUserProfileThumb, setCurrentUserProfileThumb] =
    useState<string>("");
  const [userProfile, setUserProfile] = useState<IUser | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }
    setUserId(user?.id);
    if (user != null) {
      axiosToken
        .get(`/profile/view/${id}`)
        .then((response) => {
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
              profilePostId: user.profileImgId,
              school: user.school,
              workplace: user.workplace,
              profileImageUrl: user.profileImgThumbnail,
              coverImagePostId: user.coverImgId,
            });
            setProfileThumb(user.profileImgThumbnail);
            setCoverImageUrl(user.coverImgFileName);

            // if (user.profileImgId != null) {
            //   console.log("=======profilePostId is:====" + user.profileImgId);
            //   axiosToken
            //     .get(`/posts/userprofile/${user.profileImgId}`)
            //     .then((response) => {
            //       if (response.data.length !== 0 && !response.data.isDeleted) {
            //         //TODO: fetch the profil pic which has the id associated with the user
            //         setProfileThumb(response.data.thumbnailUrl);
            //       }
            //     })
            //     .catch((error: any) => {
            //       const err = error as AxiosError<apiError>;

            //       if (!err?.response) {
            //         setErrorMessage("Failed to connect to server.");
            //         console.log(errorMessage);
            //       } else if (err.response?.data?.message) {
            //         setErrorMessage(err.response.data.message);
            //         console.log(errorMessage);
            //       } else {
            //         console.log(err);
            //         setErrorMessage("Something went wrong.");
            //       }
            //       setProfileThumb(
            //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnGZWTF4dIu8uBZzgjwWRKJJ4DisphDHEwT2KhLNxBAA&s"
            //       );
            //     });
            // } else {
            //   setProfileThumb(
            //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnGZWTF4dIu8uBZzgjwWRKJJ4DisphDHEwT2KhLNxBAA&s"
            //   );
            // }

            //FIXME: Delete this part once the backend of fetching coverimageUrl works
            // if (user.coverImgId != null) {
            //   console.log("=======coverImagePostId is:====" + user.coverImgId);
            //   axiosToken
            //     .get(`/posts/userprofile/${user.coverImgId}`)
            //     .then((response) => {
            //       if (response?.data?.length !== 0) {
            //         //TODO: fetch the profil pic which has the id associated with the user
            //         setCoverImageUrl(response.data.imageUrl);
            //         console.log(
            //           "====cover image url is:=====" + response.data.imageUrl
            //         );
            //       } else {
            //         setCoverImageUrl(
            //           "https://t4.ftcdn.net/jpg/03/78/40/11/360_F_378401105_9LAka9cRxk5Ey2wwanxrLTFCN1U51DL0.jpg"
            //         );
            //       }
            //     })
            //     .catch((error: any) => {
            //       const err = error as AxiosError<apiError>;

            //       if (!err?.response) {
            //         setErrorMessage("Failed to connect to server.");
            //         console.log(errorMessage);
            //       } else if (err.response?.data?.message) {
            //         setErrorMessage(err.response.data.message);
            //         console.log(errorMessage);
            //       } else {
            //         console.log(err);
            //         setErrorMessage("Something went wrong.");
            //       }
            //     });
            // }

          if (id && userId) {
            // Convert id to a number using parseInt
            const idAsNumber = parseInt(id); // The second parameter (10) is the radix/base, use 10 for decimal
            if (idAsNumber === userId) {
              console.log("====Is Private Profile====");
              setIsPrivateProfile(true);
            }
          }
        })
        .catch((error: any) => {
          const err = error as AxiosError<apiError>;
          if (err.response?.status === 404) {
            navigate("/404");
          }
          if (!err?.response) {
            setErrorMessage("Failed to connect to server.");
            console.log(errorMessage);
          } else if (err.response?.data?.message) {
            setErrorMessage(err.response.data.message);
            console.log(errorMessage);
          } else {
            console.log(err);
            setErrorMessage("Something went wrong.");
          }
        });
    }

    //get current user profile pic
    axiosToken
      .get(`/profile/thumbnail/${user!.id}`)
      .then((response) => {
        setCurrentUserProfileThumb(response?.data);
      })
      .catch((error: any) => {
        const err = error as AxiosError<apiError>;

        if (!err?.response) {
          setErrorMessage("Failed to connect to server.");
          console.log(errorMessage);
        } else if (err.response?.data?.message) {
          setErrorMessage(err.response.data.message);
          console.log(errorMessage);
        } else {
          console.log(err);
          setErrorMessage("Something went wrong.");
        }

        setCurrentUserProfileThumb(
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnGZWTF4dIu8uBZzgjwWRKJJ4DisphDHEwT2KhLNxBAA&s"
        );


      });

  }, [axiosToken, id, navigate, user, userId]);

  const renderMainPanelContent = () => {
    switch (selectedRoute) {
      case `/profile/${id}`:
        return (
          <ProfilePageHome
            userProfile={userProfile}
            isPrivateProfile={isPrivateProfile}
            profileThumb={profileThumb}
            userId={userId}
            currentUserProfileThumb={currentUserProfileThumb}
          />
        );
      case `/profile/${id}/about`:
        return (
          <ProfilePageAbout
            userProfile={userProfile}
            isPrivateProfile={isPrivateProfile}
          />
        );
      case `/profile/${id}/friend`:
        return (
          <ProfilePageFriend
            isPrivateProfile={isPrivateProfile}
            paramUserId={id}
            userId={userId?.toString()}
          />
        );
      case `/profile/${id}/photo`:
        return <ProfilePagePhoto profileId={parseInt(id??"")} />;
      case `/profile/${id}/album`:
        return <ProfilePageAlbum profileId={parseInt(id??"")}/>;
      default:
        return (
          <ProfilePageHome
            userProfile={userProfile}
            isPrivateProfile={isPrivateProfile}
            profileThumb={profileThumb}
            userId={userId}
            currentUserProfileThumb={currentUserProfileThumb}
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
        profileThumb={profileThumb}
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
