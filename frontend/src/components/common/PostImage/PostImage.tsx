import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";

type PostImageProps = {
  // src: string;
  alt: string;
  thumbnailUrl?: string;
};

const PostImage: React.FC<PostImageProps> = (props) => {
  return (
    <div className="container">
    <div className="row">
      <div className="col-lg-4 col-md-12 mb-4 mb-lg-0 position-relative">
        <img
          src={props.thumbnailUrl} 
          className="w-100 shadow-1-strong rounded mb-4"
          alt={"Post Thumbnail"}
        />

        <div className="position-absolute top-0 end-0 m-3">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-three-dots-vertical"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Delete
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Move to Album
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Make profile picture
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Make cover photo
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
    }
export default PostImage;