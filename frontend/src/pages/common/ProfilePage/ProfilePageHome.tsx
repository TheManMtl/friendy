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
import { AuthContext } from "../../../context/AuthProvider";

interface ProfileHomeProps {
  userProfile: IUser | null;
  isPrivateProfile: boolean;
  profileThumb: string | null;
}

const ProfilePageHome: React.FC<ProfileHomeProps> = ({
  userProfile,
  isPrivateProfile,
  profileThumb,
}) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const axiosToken = useAxiosToken();

  //start Post modal section
  const [showPostModal, setShowPostModal] = useState<boolean>(false);
  const closePost = () => {
    setShowPostModal(false);
  };
  const openPost = () => setShowPostModal(true);

  //end Modal section

  const { id } = useParams();
  useEffect(() => {
    console.log("line 33!!");
    getPosts();
    console.log("line 35!!");
  }, [id]);

  const getPosts = async () => {
    // if (props.userProfile) { //FIXME
    console.log("line 41!!");
    try {
      const response = await axiosToken.get(`/posts/user/${id}`);
      console.log("should have fetched posts");
      const list = response.data as IPost[];

      if (list[0]) {
        const updatedList = await Promise.all(
          list.map(async (post) => {
            if (post.author.profileImg) {
              const url = await getImgUrl(
                post.author.profileImg!.Image.thumbnail
              );
              console.log("profile img url: " + url);

              if (url) {
                post.author.profileImg!.Image.thumbnail = url;
              }
            }
            if (post.Image) {
              const url = await getImgUrl(post.Image.fileName);
              console.log("post img url: " + url);

              if (url) {
                post.thumbnailUrl = url;
              }
            }
            return post;
          })
        );
        setPosts(updatedList);
      }
    } catch (error) {
      //TODO
      console.log(error);
    }
    // }
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
          <PhotoGallery />
        </div>
        {/* right content */}
        <div className="rightContent col-md-7">
          <div className="">
            <PostInput
              src={
                profileThumb
                  ? profileThumb
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCxaZG5PZ2b0vJvY43fF39JensmbejwDzB_FvoT73FxQ&s"
              }
              alt={"profile"}
              size={"small"}
              openPost={openPost}
            />
          </div>
          {posts[0] ? (
            posts.map((post) => (
              <div key={`post-${post.id}`} className="mt-2">
                <PostCard
                  id={post.id}
                  profileImageSrc={
                    post.author.profileImg?.Image?.thumbnail as string
                  }
                  time={post.createdAt}
                  username={post.author.name}
                  content={post.content}
                  thumbnailUrl={post.thumbnailUrl}
                  likeCount={post.likeCount}
                  commentCount={post.commentCount}
                  comments={post.comments}
                />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Post Modal - This modal is opened by the button in PostInput component*/}
      <PostModal showPostModal={showPostModal} closePost={closePost} />
    </div>
  );
};

export default ProfilePageHome;
