import React, { useEffect, useState } from "react";

import "./ImagePostDisplay.css";
import useAxiosToken from "../../../hooks/useAxiosToken";
import ImageDisplay from "./ImageDisplay";
import ImagePostContent from "./ImagePostContent";
//import { axiosToken } from "../../../services/api/axios";

type ImagePostDisplayProps = {};

const ImagePostDisplay: React.FC<ImagePostDisplayProps> = ({}) => {
  const axiosToken = useAxiosToken();

  return (
    <div className="container-fluid wh-100">
      <div className="d-flex flex-lg-row flex-column">
        <div className="flex-grow-1 bg-black full-height">
          <ImageDisplay
            src={
              "https://scontent-ord5-1.xx.fbcdn.net/v/t1.18169-9/28379432_10157297850924552_2972732071966056584_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=be3454&_nc_ohc=VFMsdzCJOV4AX9tq6zf&_nc_ht=scontent-ord5-1.xx&oh=00_AfBaCGD8NMi_ZsAf5pgSWeSGN1hjkshQkJ5-Jf7D-D2e7g&oe=65AADC5A"
            }
          />
        </div>

        <div className=" post-content h-100">
          <ImagePostContent />
        </div>
      </div>
    </div>
  );
};

export default ImagePostDisplay;

{
  /* <div className="container-fluid wh-100">
<div className="row d-flex flex-row">
  <div
    className="
  col-lg-8 col-12  
  
  bg-black full-height"
  >
    <ImageDisplay
      src={
        "https://scontent-ord5-1.xx.fbcdn.net/v/t1.18169-9/28379432_10157297850924552_2972732071966056584_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=be3454&_nc_ohc=VFMsdzCJOV4AX9tq6zf&_nc_ht=scontent-ord5-1.xx&oh=00_AfBaCGD8NMi_ZsAf5pgSWeSGN1hjkshQkJ5-Jf7D-D2e7g&oe=65AADC5A"
      }
    />
  </div>

  <div className="col-lg-4 col-12 ">
    <div className="d-flex flex-column h-100">
      <ImagePostContent />
    </div>
  </div>
</div>
</div> */
}
