import React from "react";
import { Formik, ErrorMessage } from "formik";
import axios from "../../../services/api/axios";

function EditAbout() {
  return (
    <div className="d-flex justify-content-center row ">
      {/* School panel */}
      <div className="school d-flex justify-content-start row mt-3">
        <div className="col-3 icon d-flex justify-content-end">
          <i className="bi bi-mortarboard-fill icon"></i>
        </div>
        <div className="col-5 d-flex justify-content-start">
          <p>Studied at University of Moratuwa</p>
        </div>
        <div className="col-2 d-flex justify-content-start">
          <button className="btn btn-secondary">edit</button>
        </div>
      </div>
      {/* Work panel */}
      <div className="school d-flex justify-content-start row mt-3">
        <div className="col-3 icon d-flex justify-content-end">
          <i className="bi bi-mortarboard-fill icon"></i>
        </div>
        <div className="col-5 d-flex justify-content-start">
          <p>Studied at University of Moratuwa</p>
        </div>
        <div className="col-2 d-flex justify-content-start">
          <button className="btn btn-secondary">edit</button>
        </div>
      </div>
    </div>
  );
}

export default EditAbout;
