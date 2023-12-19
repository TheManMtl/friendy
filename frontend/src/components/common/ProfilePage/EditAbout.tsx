import React from "react";
import { Formik, ErrorMessage } from "formik";
import axios from "../../../services/api/axios";

function EditAbout() {
  return (
    <div>
      {" "}
      {/* School panel */}
      <div className="school d-flex justify-content-start row">
        <div className="col-1 icon d-flex justify-content-start">
          <i className="bi bi-mortarboard-fill icon"></i>
        </div>
        <div className="col-6 d-flex justify-content-start">
          <p>Studied at University of Moratuwa</p>
        </div>
        <div className="col-2 d-flex justify-content-end">
          <button className="btn btn-secondary">edit</button>
        </div>
      </div>
      {/* School panel */}
    </div>
  );
}

export default EditAbout;
