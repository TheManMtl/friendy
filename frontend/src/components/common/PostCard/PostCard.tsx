import React from "react";

const PostCard: React.FC = () => {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <div className="row">
              <div className="col-2">
                <div className="profile-img-container small">
                  <div className="profile-img small">
                    <img
                      src="https://www.w3schools.com/howto/img_avatar.png"
                      alt="avatar"
                      className="innerImage"
                    />
                  </div>
                </div>
              </div>
              <div className="col-10">
                <div className="row">
                  <div className="col-12">
                    <h5 className="card-title">Username</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <p className="card-text">Date</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-text">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatibus, voluptatem, quibusdam, quia voluptate quod
              exercitationem voluptatum quos nesciunt doloribus natus
              repudiandae? Quaerat, quae. Doloremque, quibusdam. Quisquam
              voluptatibus, voluptatem, quibusdam, quia voluptate quod
              exercitationem voluptatum quos nesciunt doloribus natus
              repudiandae? Quaerat, quae. Doloremque, quibusdam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
