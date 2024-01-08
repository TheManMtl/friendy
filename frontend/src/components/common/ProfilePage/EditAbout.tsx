import React from "react";
import { Formik, ErrorMessage } from "formik";
import axios from "../../../services/api/axios";
import { IUser } from "../../../pages/shared/interface/user.interface";

interface ProfileAboutProps {
  userProfile: IUser | null;
  isPrivateProfile: boolean;
}

const EditAbout: React.FC<ProfileAboutProps> = ({
  userProfile,
  isPrivateProfile,
}) => {
  return (
    <div className="d-flex justify-content-center row ">
      {/* School panel */}
      <div className="school d-flex justify-content-start row mt-3">
        <div className="col-3 icon d-flex justify-content-end">
          <i className="bi bi-mortarboard-fill icon"></i>
        </div>
        <div className="col-5 d-flex justify-content-start">
          <p>Studied at {userProfile?.school}</p>
        </div>
        <div className="col-2 d-flex justify-content-start">
          <button className="btn btn-secondary">Edit</button>
        </div>
      </div>
      {/* Location panel */}
      <div className="school d-flex justify-content-start row mt-3">
        <div className="col-3 icon d-flex justify-content-end">
          <i className="bi bi-mortarboard-fill icon"></i>
        </div>
        <div className="col-5 d-flex justify-content-start">
          <p>Lives in {userProfile?.location}</p>
        </div>
        <div className="col-2 d-flex justify-content-start">
          <button className="btn btn-secondary">Edit</button>
        </div>
      </div>
      {/* Work panel */}
      <div className="school d-flex justify-content-start row mt-3">
        <div className="col-3 icon d-flex justify-content-end">
          <i className="bi bi-mortarboard-fill icon"></i>
        </div>
        <div className="col-5 d-flex justify-content-start">
          <p>Works at {userProfile?.workplace}</p>
        </div>
        <div className="col-2 d-flex justify-content-start">
          <button className="btn btn-secondary">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default EditAbout;
