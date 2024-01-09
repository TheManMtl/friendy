import React from "react";
import "../../../pages/common/ProfilePage/ProfilePage.css";
import { useState } from "react";
import ChangeCoverImageModal from "./ChangeCoverImageModal";

interface coverImageProps {
  src: string | undefined;
  isPrivateProfile: boolean;
}

const CoverImage: React.FC<coverImageProps> = ({ src, isPrivateProfile }) => {
  //start CoverImage modal section
  const [showCoverImageModal, setShowCoverImageModal] =
    useState<boolean>(false);
  const closeCoverImageModal = () => {
    setShowCoverImageModal(false);
  };
  const openCoverImageModal = () => setShowCoverImageModal(true);

  //end CoverImage Modal section

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
                src={src}
                alt="cover"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
            {isPrivateProfile ? (
              <button className="btn-cover-image" onClick={openCoverImageModal}>
                Edit cover image
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* CoverImage Modal*/}
      <ChangeCoverImageModal
        showCoverImageModal={showCoverImageModal}
        closeCoverImageModal={closeCoverImageModal}
      />
    </div>
  );
};

export default CoverImage;
