import React, { useEffect, useRef, useState } from "react";
import "../../../pages/common/ProfilePage/ProfilePage.css";
import { IUser } from "../../../pages/shared/interface/user.interface";
import { Link, useNavigate } from "react-router-dom";
import { useProfilePageContext } from "../../../context/ProfilePageProvider";
import useAxiosToken from "../../../hooks/useAxiosToken";

interface IntroCardProps {
  userProfile: IUser | null;
  isPrivateProfile: boolean;
  userId: number | undefined;
  bioVariable: string | undefined;
}
const ProfileIntroCard: React.FC<IntroCardProps> = ({
  userProfile,
  isPrivateProfile,
  userId,
  bioVariable,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [bio, setBio] = useState<string | undefined>(bioVariable);
  const [editBio, setEditBio] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const axiosToken = useAxiosToken();

  const { setRoute } = useProfilePageContext();

  const handleLinkClick = (route: string) => {
    setRoute(route);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setBio(newValue);

    if (!isNaN(Number(newValue))) {
      setErrorMessage("Input must be a string");
    } else {
      setErrorMessage(null);
    }
  };
  const handleBioSubmit = (e: React.FormEvent) => {
    if (errorMessage) {
      return;
    }
    const data = { bio: bio };
    console.log("=====entered into handle Submit====");
    axiosToken
      .put("/profile/update", data)
      .then((response) => {
        console.log("====Profile info updated in About====");
      })
      .catch((error) => {
        console.log(error);
      });
    setEditBio(false);
  };

  useEffect(() => {
    setBio(bioVariable);
    inputRef?.current?.focus();
  }, [bioVariable]);

  return (
    <div>
      <div className="IntroCard card py-4">
        <div className="d-flex justify-content-start offset-1">
          <h4>Intro</h4>
        </div>
        <form onSubmit={(e) => handleBioSubmit(e)}>
          <div className="d-flex justify-content-center">
            {/* <p>{userProfile?.bio}</p> */}
            {editBio ? (
              <>
                <input
                  ref={inputRef}
                  value={bio}
                  onChange={handleBioChange}
                  style={{ width: "500px" }}
                  className="mb-3"
                />
              </>
            ) : (
              <>
                <p>{bio}</p>
              </>
            )}
          </div>
          {editBio && isPrivateProfile ? (
            <div className="d-flex justify-content-center">
              <div
                className="d-flex justify-content-center"
                style={{ width: "500px" }}
              >
                <button type="submit" className="btn btn-secondary mx-1">
                  Submit
                </button>
                <button
                  className="btn btn-secondary "
                  onClick={() => {
                    if (editBio) {
                      setEditBio(!editBio);
                      setBio(bio);
                      setErrorMessage(null);
                    }
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : isPrivateProfile ? (
            <button
              className="btn btn-secondary col-10"
              onClick={() => {
                if (!editBio) {
                  setEditBio(!editBio);
                }
              }}
            >
              Edit bio
            </button>
          ) : null}
        </form>

        <div className="details my-5">
          <div className="d-flex justify-content-start">
            <i className="bi bi-mortarboard-fill icon"></i>
            <p>
              Studied at <a href="/">{userProfile?.school}</a>
            </p>
          </div>

          <div className="d-flex justify-content-start">
            <i className="bi bi-house-heart icon"></i>
            <p className="mx-1">
              Lives in <a href="/">{userProfile?.location}</a>
            </p>
          </div>

          <div className="d-flex justify-content-start ">
            <i className="bi bi-geo-alt-fill icon"></i>
            <p>
              Work at <a href="/">{userProfile?.workplace}</a>
            </p>
          </div>
          {isPrivateProfile ? (
            <div>
              <Link
                to={`/profile/${userId}/about`}
                className="nav-link"
                onClick={() => handleLinkClick(`/profile/${userId}/about`)}
              >
                <button className="btn btn-secondary col-10">
                  Edit details
                </button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProfileIntroCard;
function setRoute(route: string) {
  throw new Error("Function not implemented.");
}
