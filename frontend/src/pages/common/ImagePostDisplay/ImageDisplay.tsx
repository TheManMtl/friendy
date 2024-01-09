import React, { useEffect, useState } from "react";

import "./ImagePostDisplay.css";
import useAxiosToken from "../../../hooks/useAxiosToken";
//import { axiosToken } from "../../../services/api/axios";
import { XLg } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

type ImageDisplayProps = {
  src: string;
};

const ImageDisplay: React.FC<ImageDisplayProps> = ({ src }) => {
  const axiosToken = useAxiosToken();
  const navigate = useNavigate();

  return (
    <div className="row bg-black full-height ">
      <div className="col-12 descended-row text-start">
        <button
          id="btnExit"
          className="big-x ms-3"
          onClick={() => {
            console.log("EXIT");
            // navigate(-1);
          }}
        >
          <XLg size={45} />
        </button>
      </div>
      <div className="col-12 mb-5 post-container">
        <img src={src} alt="alternate" className="display-src " />
      </div>
    </div>
  );
};

export default ImageDisplay;
