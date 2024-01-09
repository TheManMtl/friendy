import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeFriendRequest from "../../components/Home/FriendRequest";
import HomeRightPanel from "../../components/Home/HomeRightPanel";
import "./HomePage.css";
import Newsfeed from "../../components/Home/Newsfeed";
import PostModal from "../../components/common/PostInput/PostModal";
import PostInput from "../../components/common/PostInput/PostInput";
import useAuth from "../../hooks/useAuth";
import useAxiosToken from "../../hooks/useAxiosToken";
import { AxiosError } from "axios";
import { apiError } from "../../types/common";

function HomePage() {

  const axiosToken = useAxiosToken();
  const { user } = useAuth();
  const navigate = useNavigate();
  //profile pic for post input and post modal
  const [currentUserProfileThumb, setCurrentUserProfileThumb] = useState<string>("");
  //start Post modal section
  const [showPostModal, setShowPostModal] = useState<boolean>(false);
  const openPost = () => setShowPostModal(true);
  const closePost = () => setShowPostModal(false);
  //end Modal section

  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }
    getUserThumbnail();
  }, [navigate, user]);

  const getUserThumbnail = () => {

    //get current user profile pic
    axiosToken
      .get(`/profile/thumbnail/${user!.id}`)
      .then((response) => {
        setCurrentUserProfileThumb(response?.data);
      })
      .catch((error: any) => {
        const err = error as AxiosError<apiError>;
        if (err.response?.data?.message) {
          console.log(err.response.data.message);
        } else {
          console.log(err);
        }

        setCurrentUserProfileThumb(
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnGZWTF4dIu8uBZzgjwWRKJJ4DisphDHEwT2KhLNxBAA&s"
        );
      });
  }
  return (
    <div className="container-fluid px-0 mx-0">
      <div className="row">
        <div className="col-lg-3 d-none d-lg-block ">leftpanel</div>
        <div className="col-6 ">
        <div className="row m-3"></div>
            <PostInput
              src={currentUserProfileThumb}
              alt={"profile"}
              size={"small"}
              openPost={openPost}
              userName={user!.name}
              isOtherUserProfile={false}
            />
          <Newsfeed />
        </div>
        <div className="col-lg-3 d-none d-lg-block ">
          <HomeRightPanel />
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
        profileId={null}
      />
    </div>
  );
}

export default HomePage;
