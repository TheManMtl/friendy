import React from 'react'
import "../../../pages/common/ProfilePage.css"

function CoverImage() {
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
    </div>
  )
}

export default CoverImage
