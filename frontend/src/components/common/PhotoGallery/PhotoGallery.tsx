import React from "react";
import "../../../pages/common/ProfilePage.css";

function PhotoGallery() {
  return (
    <div>
      <div className="photosCard card mt-3 py-4">
        <div className="d-flex mb-2 justify-content-start offset-1">
          <h4>Photos</h4>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="row">
              <a
                href="https://unsplash.it/1200/768.jpg?image=251"
                data-toggle="lightbox"
                data-gallery="example-gallery"
                className="col-sm-4"
              >
                <img
                  src="https://unsplash.it/600.jpg?image=251"
                  className="img-fluid"
                  alt="gallery"
                />
              </a>
              <a
                href="https://unsplash.it/1200/768.jpg?image=252"
                data-toggle="lightbox"
                data-gallery="example-gallery"
                className="col-sm-4"
              >
                <img
                  src="https://unsplash.it/600.jpg?image=252"
                  className="img-fluid"
                  alt="gallery"
                />
              </a>
              <a
                href="https://unsplash.it/1200/768.jpg?image=253"
                data-toggle="lightbox"
                data-gallery="example-gallery"
                className="col-sm-4"
              >
                <img
                  src="https://unsplash.it/600.jpg?image=253"
                  className="img-fluid"
                  alt="gallery"
                />
              </a>
            </div>
            <div className="row">
              <a
                href="https://unsplash.it/1200/768.jpg?image=254"
                data-toggle="lightbox"
                data-gallery="example-gallery"
                className="col-sm-4"
              >
                <img
                  src="https://unsplash.it/600.jpg?image=254"
                  className="img-fluid"
                  alt="gallery"
                />
              </a>
              <a
                href="https://unsplash.it/1200/768.jpg?image=255"
                data-toggle="lightbox"
                data-gallery="example-gallery"
                className="col-sm-4"
              >
                <img
                  src="https://unsplash.it/600.jpg?image=255"
                  className="img-fluid"
                  alt="gallery"
                />
              </a>
              <a
                href="https://unsplash.it/1200/768.jpg?image=256"
                data-toggle="lightbox"
                data-gallery="example-gallery"
                className="col-sm-4"
              >
                <img
                  src="https://unsplash.it/600.jpg?image=256"
                  className="img-fluid"
                  alt="gallery"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoGallery;
