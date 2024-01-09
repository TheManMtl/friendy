import React, { useEffect, useState } from "react";
import "../../../pages/common/ProfilePage/ProfilePage.css";
import useAxiosToken from "../../../hooks/useAxiosToken";
import Axios from "axios";
import { IPost } from "../../../pages/shared/interface/post.interface";

interface PhotoGalleryProps {
  userParamId: string | undefined;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ userParamId }) => {
  const axiosToken = useAxiosToken();
  const [imageUrlArr, setImageUrlArr] = useState<string[]>();
  const [thumbUrlArr, setThumbUrlArr] = useState<string[]>();
  //fetch first 9 posts with the authroId=userId imageId !=null
  useEffect(() => {
    if (userParamId !== undefined) {
      axiosToken
        .get(`/posts/user/${userParamId}/photos`)
        .then((response) => {
          if (response.data.length > 0) {
            //Take the first 9 imageUrl
            const first9Images = response.data.slice(0, 9);
            //Extract imageUrl values and update imageUrlArr
            const imageUrlValues = first9Images.map(
              (item: IPost) => item.imageUrl
            );
            const thumbUrlValues = first9Images.map(
              (item: IPost) => item.thumbnailUrl
            );
            setImageUrlArr(imageUrlValues);
            setThumbUrlArr(thumbUrlValues);
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
              {imageUrlArr && imageUrlArr.length > 0
                ? imageUrlArr.slice(0, 3).map((imageUrl, index) => (
                    <a
                      key={index}
                      href={imageUrl}
                      data-toggle="lightbox"
                      data-gallery="example-gallery"
                      className="col-sm-4"
                    >
                      <img
                        src={imageUrl}
                        className="img-fluid"
                        alt={`gallery-${index}`}
                      />
                    </a>
                  ))
                : Array.from({
                    length: Math.max(0, 3 - (imageUrlArr?.length ?? 0)),
                  }).map((_, index) => (
                    <div key={index} className="col-sm-4">
                      {/* Fallback content or empty */}
                    </div>
                  ))}
            </div>
            <div className="mt-3 row">
              {imageUrlArr && imageUrlArr.length > 3
                ? imageUrlArr.slice(3, 6).map((imageUrl, index) => (
                    <a
                      key={index}
                      href={imageUrl}
                      data-toggle="lightbox"
                      data-gallery="example-gallery"
                      className="col-sm-4"
                    >
                      <img
                        src={imageUrl}
                        className="img-fluid"
                        alt={`gallery-${index}`}
                      />
                    </a>
                  ))
                : Array.from({
                    length: Math.max(0, 3 - (imageUrlArr?.length ?? 0)),
                  }).map((_, index) => (
                    <div key={index} className="col-sm-4">
                      {/* Fallback content or empty */}
                    </div>
                  ))}
            </div>
            <div className="mt-3 row">
              {imageUrlArr && imageUrlArr.length > 6
                ? imageUrlArr.slice(6, 9).map((imageUrl, index) => (
                    <a
                      key={index}
                      href={imageUrl}
                      data-toggle="lightbox"
                      data-gallery="example-gallery"
                      className="col-sm-4"
                    >
                      <img
                        src={imageUrl}
                        className="img-fluid"
                        alt={`gallery-${index}`}
                      />
                    </a>
                  ))
                : Array.from({
                    length: Math.max(0, 3 - (imageUrlArr?.length ?? 0)),
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
