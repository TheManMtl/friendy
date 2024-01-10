import React, { useEffect, useState } from "react";
import "../../../pages/common/ProfilePage/ProfilePage.css";
import useAxiosToken from "../../../hooks/useAxiosToken";
import Axios from "axios";
import { IPost } from "../../../pages/shared/interface/post.interface";
import { useNavigate } from "react-router-dom";

interface PhotoGalleryProps {
  userParamId: string | undefined;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ userParamId }) => {
  const axiosToken = useAxiosToken();
  const [imagePosts, setImagePost] = useState<IPost[]>();
  const navigate = useNavigate();

  // const displayPostDetail = () => {
  //   navigate(`/display?postid=${props.postId}`);
  // };

  useEffect(() => {
    if (userParamId !== undefined) {
      axiosToken
        .get(`/posts/user/${userParamId}/photos`)
        .then((response) => {
          if (response.data.length > 0) {
            //Take the first 9 imageUrl
            const first9Images: IPost[] = response.data.slice(0, 9);
            setImagePost(first9Images);
            //Extract imageUrl values and update imageUrlArr
            // const imageUrlValues = first9Images.map(
            //   (item: IPost) => item.imageUrl && item.postId
            // );
            // const thumbUrlValues = first9Images.map(
            //   (item: IPost) => item.thumbnailUrl && item.postId
            // );
            // setImageUrlArr(imageUrlValues);
            // setThumbUrlArr(thumbUrlValues);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return (
    <div>
      <div className="photosCard card mt-3 py-4">
        <div className="d-flex mb-2 justify-content-start offset-1">
          <h4>Photos</h4>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="row">
              {imagePosts && imagePosts.length > 0
                ? imagePosts.slice(0, 3).map((imagePost, index) => (
                    <div
                      onClick={() => {
                        navigate(`/display?postid=${imagePost.id}`);
                      }}
                      className="col-sm-4 curser-pointer"
                    >
                      <img
                        src={imagePost.imageUrl}
                        className="img-fluid"
                        alt={`gallery-${index}`}
                      />
                    </div>
                  ))
                : Array.from({
                    length: Math.max(0, 3 - (imagePosts?.length ?? 0)),
                  }).map((_, index) => (
                    <div key={index} className="col-sm-4">
                      {/* Fallback content or empty */}
                    </div>
                  ))}
            </div>
            <div className="mt-3 row">
              {imagePosts && imagePosts.length > 3
                ? imagePosts.slice(3, 6).map((imagePost, index) => (
                    <div
                      onClick={() => {
                        navigate(`/display?postid=${imagePost.id}`);
                      }}
                      className="col-sm-4 curser-pointer"
                    >
                      <img
                        src={imagePost.imageUrl}
                        className="img-fluid"
                        alt={`gallery-${index}`}
                      />
                    </div>
                  ))
                : Array.from({
                    length: Math.max(0, 3 - (imagePosts?.length ?? 0)),
                  }).map((_, index) => (
                    <div key={index} className="col-sm-4">
                      {/* Fallback content or empty */}
                    </div>
                  ))}
            </div>
            <div className="mt-3 row">
              {imagePosts && imagePosts.length > 6
                ? imagePosts.slice(6, 9).map((imagePost, index) => (
                    <div
                      onClick={() => {
                        navigate(`/display?postid=${imagePost.id}`);
                      }}
                      className="col-sm-4 curser-pointer"
                    >
                      <img
                        src={imagePost.imageUrl}
                        className="img-fluid"
                        alt={`gallery-${index}`}
                      />
                    </div>
                  ))
                : Array.from({
                    length: Math.max(0, 3 - (imagePosts?.length ?? 0)),
                  }).map((_, index) => (
                    <div key={index} className="col-sm-4">
                      {/* Fallback content or empty */}
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
