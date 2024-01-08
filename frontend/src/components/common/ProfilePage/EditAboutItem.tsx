import React, { useEffect } from "react";
import { useRef, useState } from "react";
import useAxiosToken from "../../../hooks/useAxiosToken";

interface EditAboutItemProps {
  contentName: string;
  contentVariable: string | undefined;
  isPrivateProfile: boolean;
}

const EditAboutItem: React.FC<EditAboutItemProps> = ({
  contentName,
  contentVariable,
  isPrivateProfile,
}) => {
  const axiosToken = useAxiosToken();

  const inputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState<string | undefined>(contentVariable);
  const [editContent, setEditContent] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setContent(newValue);

    if (!isNaN(Number(newValue))) {
      setErrorMessage("Input must be a string");
    } else {
      setErrorMessage(null);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    if (errorMessage) {
      return;
    }
    const data = { [contentName]: content };
    console.log("=====entered into handle Submit====");
    axiosToken
      .put("/profile/update", data)
      .then((response) => {
        console.log("====Profile info updated in About====");
      })
      .catch((error) => {
        console.log(error);
      });
    setEditContent(false);
  };

  //switch for icon
  let iconClassName;

  switch (contentName) {
    case "school":
      iconClassName = "bi bi-mortarboard-fill icon";
      break;
    case "location":
      iconClassName = "bi bi-house-heart-fill icon";
      break;
    case "workplace":
      iconClassName = "bi bi-briefcase-fill icon";
      break;
    case "email":
      iconClassName = "bi bi-envelope-fill icon";
      break;
    default:
      iconClassName = "";
  }
  //switch for starting phrase
  let startingPhrase;
  switch (contentName) {
    case "school":
      startingPhrase = "Studied at ";
      break;
    case "location":
      startingPhrase = "Lives in ";
      break;
    case "workplace":
      startingPhrase = "Works at ";
      break;
    case "position":
      startingPhrase = "Position as  ";
      break;
    case "email":
      startingPhrase = "Email  ";
      break;
    default:
      startingPhrase = "Default ";
  }
  useEffect(() => {
    inputRef?.current?.focus();
  }, [editContent]);

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className=" d-flex justify-content-start row mt-3">
          <div className="col-2 icon d-flex justify-content-end">
            <i className={iconClassName}></i>
          </div>

          <div className="col-6 d-flex justify-content-start">
            <p>{startingPhrase} &nbsp;</p>
            {editContent ? (
              <>
                <input
                  ref={inputRef}
                  value={content}
                  style={{ width: "500px" }}
                  onChange={handleChange}
                />
              </>
            ) : (
              <p> {content}</p>
            )}
          </div>
          <div className="col-3 d-flex justify-content-start">
            {editContent && isPrivateProfile ? (
              <div className="d-flex">
                <button type="submit" className="btn btn-secondary mx-1">
                  Submit
                </button>
                <button
                  className="btn btn-secondary "
                  onClick={() => {
                    if (editContent) {
                      setEditContent(!editContent);
                      setContent(contentVariable);
                      setErrorMessage(null);
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
                  if (!editContent) {
                    setEditContent(!editContent);
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
        {/* school error message */}
        <div>
          {" "}
          <div className=" d-flex justify-content-start row mt-3">
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </div>
        </div>
      </form>
    </>
  );
};

export default EditAboutItem;
