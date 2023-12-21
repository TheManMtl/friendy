import React, { useEffect, useState } from "react";

import "./ImagePostDisplay.css";
import useAxiosToken from "../../../hooks/useAxiosToken";
//import { axiosToken } from "../../../services/api/axios";
import { XLg } from "react-bootstrap-icons";

type ImageDisplayProps = {
  src: string;
};

const ImageDisplay: React.FC<ImageDisplayProps> = ({ src }) => {
  const axiosToken = useAxiosToken();
  const exit = () => {
    console.log("exited");
  };

  return (
    <div className="row bg-black full-height">
      <div className="col-12 descended-row text-start">
        <span className="big-x ms-3" onClick={exit}>
          <XLg size={45} />
        </span>
      </div>
      <div className="col-12 mb-5">
        <img src={src} alt="alternate" className="display-src " />
      </div>
    </div>
  );
};

export default ImageDisplay;
