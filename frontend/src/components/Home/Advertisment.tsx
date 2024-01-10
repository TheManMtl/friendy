import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import "./Advertisment.css";
type AdvertismentProps = {
  businessName: String;
  description: String;
  renderNum: number;
};

const Advertisment: React.FC<AdvertismentProps> = ({
  businessName,
  description,
  renderNum,
}) => {
  return (
    <div className=" row mt-4 ad-description mx-auto">
      <div className="col-12 fs-3">{businessName}</div>
      <div className="col-12">
        <img
          src={`https://picsum.photos/400/265?random=${renderNum}`}
          alt="good logo"
          className="mx-auto"
        />
      </div>
      <div className="col-12  text-center mx-auto">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Advertisment;
