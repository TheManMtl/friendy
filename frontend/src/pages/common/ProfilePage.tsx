import React from "react";
import "./ProfilePage.css";
import ProfileImage from "../../components/common/ProfileImage/ProfileImage";
import PostCard from "../../components/common/PostCard/PostCard";
import PostInput from "../../components/common/PostInput/PostInput";

function ProfilePage() {
  return (
    <div>
      <div className="coverImage row">
        <div className="col-12">
          <div className="cover-image-container">
            <div
              className="cover-image"
              style={{ position: "relative", overflow: "hidden" }}
            >
              <img
                className="inner-image"
                src="https://images.pexels.com/photos/580151/pexels-photo-580151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="cover"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
            <button className="btn-cover-image">Edit cover image</button>
          </div>
        </div>
      </div>

      <div className="InfoCard card py-4">
        <div className="basicInfo row">
          <div className="leftInfo col-md-6">
            <div className="profileName px-5">
              <div className="row">
                <div
                  className="col-4 d-flex justify-content-end"
                  style={{ position: "relative" }}
                >
                  <div style={{ position: "absolute", bottom: "2rem" }}>
                    <ProfileImage
                      src={
                        "https://www.istockphoto.com/resources/images/IllustrationsLanding/BackgroundTile.jpg"
                      }
                      alt={"profile"}
                      size={"medium"}
                    />
                  </div>
                </div>
                <div className="col-8">
                  <h4 className="d-flex justify-contnet-start">Profile Name</h4>
                  <p className="d-flex justify-contnet-start">Profile Bio</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rightInfo col-md-6 d-flex justify-content-end">
            <div className="px-5">
              <button className="btn btn-secondary">Edit Profile</button>
            </div>
          </div>
        </div>
        <div className="nav ">
          <ul>
            <li>Posts</li>
            <li>About</li>
            <li>Friends</li>
            <li>Photos</li>
          </ul>
        </div>
      </div>

      <div className="contentSection row mt-3 px-5 py-3 d-flex justify-content-center">
        <div className="leftContent col-md-4">
          <div className="IntroCard card py-4">
            <h4>Intro</h4>
            <div className="d-flex justify-content-center">
              <div>
                <p>Self intro</p>
                <button className="btn btn-secondary">Edit bio</button>
              </div>
            </div>
            <div className="details">
              <p>
                Studied at <a href="/">University of Moratuwa</a>
              </p>
              <p>
                Went to <a href="/">Ananda College</a>
              </p>
              <p>
                From <a href="/">Colombo, Sri Lanka</a>
              </p>
              <button className="btn btn-secondary">Edit details</button>
            </div>
          </div>

          <div className="photosCard card mt-3 py-4">
            <h4>Photos</h4>
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
        {/* right content */}
        <div className="rightContent col-md-7">
          <PostInput
            src={
              "https://www.istockphoto.com/resources/images/IllustrationsLanding/BackgroundTile.jpg"
            }
            alt={"profile"}
            size={"small"}
          />
          <PostCard />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
