import React from "react";
import "./ProfileImage.css";

interface Props {
  src: string;
  alt: string;
  size?: string;
}

//size: small, medium, - alex added small-med
const ProfileImage: React.FC<Props> = ({ src, alt, size }) => {
  return (
    <div>
      <div className={`profile-img-container ${size}`}>
        <div className={`profile-img ${size}`}>
          <img src={src} alt={alt} className="innerImage" />
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
