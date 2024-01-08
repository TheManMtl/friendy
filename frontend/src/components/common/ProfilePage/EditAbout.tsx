import React, { useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import axios from "../../../services/api/axios";
import { IUser } from "../../../pages/shared/interface/user.interface";
import { useRef, useState } from "react";

interface ProfileAboutProps {
  userProfile: IUser | null;
  isPrivateProfile: boolean;
}

const EditAbout: React.FC<ProfileAboutProps> = ({
  userProfile,
  isPrivateProfile,
}) => {
  const inputSchoolRef = useRef<HTMLInputElement>(null);
  const [school, setSchool] = useState<string | undefined>(userProfile?.school);
  const [editSchool, setEditSchool] = useState<boolean>(false);
  const handleSchoolEdit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    inputSchoolRef?.current?.focus();
  }, [editSchool]);
  return (
    <div className="d-flex justify-content-center row ">
      {/* School panel */}{" "}
      <form onSubmit={(e) => handleSchoolEdit(e)}>
        <div className="school d-flex justify-content-start row mt-3">
          <div className="col-2 icon d-flex justify-content-end">
            <i className="bi bi-mortarboard-fill icon"></i>
          </div>

          <div className="col-6 d-flex justify-content-start">
            <p>Studied at &nbsp;</p>
            {editSchool ? (
              <input
                ref={inputSchoolRef}
                value={school}
                style={{ width: "500px" }}
              />
            ) : (
              <p> {school}</p>
            )}
          </div>
          <div className="col-3 d-flex justify-content-start">
            {editSchool && isPrivateProfile ? (
              <div className="d-flex">
                <button type="submit" className="btn btn-secondary mx-1">
                  Submit
                </button>
                <button
                  className="btn btn-secondary "
                  onClick={() => {
                    if (editSchool) {
                      setEditSchool(!editSchool);
                    }
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : isPrivateProfile ? (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  if (!editSchool) {
                    setEditSchool(!editSchool);
                  }
                }}
              >
                Edit
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </form>
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
