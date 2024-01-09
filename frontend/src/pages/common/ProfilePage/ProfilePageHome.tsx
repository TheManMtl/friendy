import { useState, useEffect } from "react";
import PhotoGallery from "../../../components/common/ProfilePage/PhotoGallery";
import ProfileIntroCard from "../../../components/common/ProfilePage/ProfileIntroCard";
import PostInput from "../../../components/common/PostInput/PostInput";
import { IPost } from "../../shared/interface/post.interface";
import PostCard from "../../../components/common/PostCard/PostCard";
import { useParams } from "react-router-dom";
import useAxiosToken from "../../../hooks/useAxiosToken";
import PostModal from "../../../components/common/PostInput/PostModal";
import { IUser } from "../../shared/interface/user.interface";
import useAuth from "../../../hooks/useAuth";
import { AxiosError } from "axios";
import { apiError } from "../../../types/common";

interface ProfileHomeProps {
  userProfile: IUser | null;
  isPrivateProfile: boolean;
  profileThumb: string | null;
  userId: number | undefined;
  currentUserProfileThumb: string;
}

const ProfilePageHome: React.FC<ProfileHomeProps> = ({
  userProfile,
  isPrivateProfile,
  profileThumb,
  userId,
  currentUserProfileThumb,
}) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const axiosToken = useAxiosToken();
  const { user } = useAuth();
  //start Post modal section
  const [showPostModal, setShowPostModal] = useState<boolean>(false);
  const [paramId, setParamId] = useState<string | undefined>();
  const openPost = () => setShowPostModal(true);
  const closePost = () => setShowPostModal(false);
  //end Modal section

  //FIXME: handle 404 with custom page
  const { id } = useParams();
  const paramIdVariable = id;
  console.log("===the id from params====" + paramIdVariable);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setParamId(id);
    console.log("===the id after setParamaId===" + paramIdVariable);
    console.log("line 33!!");
    getPosts();
    console.log("line 35!!");
  }, []);

  //FIXME: when url param changes, old user's posts are not removed unless new user has posts on timeline
  const getPosts = async () => {
    try {
      const response = await axiosToken.get(`/posts/user/${id}`);
      console.log("should have fetched posts");
      const list = response.data as IPost[];

      if (list[0]) {
        const updatedList = await Promise.all(
          list.map(async (post) => {
            //get user profile pic
            try {
              const response = await axiosToken.get(
                `/profile/thumbnail/${post.authorId}`
              );
              console.log(response.data);
              post.author.profileImg = response.data;

              //temporary: replace pic with full size
              if (post.Image) {
                const url = await getImgUrl(post.Image.fileName);
                console.log("post img url: " + url);
                if (url) {
                  post.thumbnailUrl = url;
                }
              }
              return post;
            } catch (error: any) {
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
              post.author.profileImg =
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnGZWTF4dIu8uBZzgjwWRKJJ4DisphDHEwT2KhLNxBAA&s";
              console.log("post thumbnail url: " + post.author.profileImg);
              return post;
            }
          })
        );
        setPosts(updatedList);
      }
    } catch (error) {
      //TODO
      console.log(error);
    }
  };

  const getImgUrl = async (fileName: string) => {
    try {
      const response = await axiosToken.get(`/images/${fileName}`);
      console.log(response.data);

      return response.data;
    } catch (error) {
      //TODO handle
      console.log("Error fetching image URL:", error);
    }
  };

  return (
    <div>
      <div className="contentSection row mt-1 px-5 py-3 d-flex justify-content-center">
        <div className="leftContent col-md-4">
          <ProfileIntroCard
            userProfile={userProfile}
            isPrivateProfile={isPrivateProfile}
          />
          <PhotoGallery userParamId={paramIdVariable} />
        </div>
        {/* right content */}
        <div className="rightContent col-md-7">
          <div className="">
            <PostInput
              src={currentUserProfileThumb}
              alt={"profile"}
              size={"small"}
              openPost={openPost}
              userName={userProfile?.name}
              isOtherUserProfile={!isPrivateProfile}
            />
          </div>
          {posts[0] ? (
            posts.map((post) => (
              <div key={`post-${post.id}`} className="mt-2">
                <PostCard
                  id={post.id}
                  authorId={post.authorId}
                  profileImageSrc={post.author.profileImg as string}
                  time={post.createdAt}
                  username={post.author.name}
                  content={post.content}
                  thumbnailUrl={post.thumbnailUrl}
                  likeCount={post.likeCount}
                  commentCount={post.commentCount}
                  comments={post.comments}
                  type={post.type}
                  currentUserProfileThumb={currentUserProfileThumb}
                />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Post Modal - This modal is opened by the button in PostInput component*/}
      <PostModal
        showPostModal={showPostModal}
        closePost={closePost}
        src={currentUserProfileThumb}
        alt={"profile"}
        size={"small"}
        username={user!.name}
        profileId={id ? id!.toString() : null}
      />
    </div>
  );
};

export default ProfilePageHome;
