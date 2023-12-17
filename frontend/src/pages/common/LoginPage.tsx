import React from "react";
import "./LoginPage.css";
import { useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useContext } from "react";

interface Props {}

function LoginPage() {
  return (
    <div>
      <div className="container px-4 py-5 mx-auto">
        <div className="d-flex flex-lg-row flex-column-reverse">
          <div className="card card1">
            <div className="row justify-content-center my-auto">
              <div className="col-md-8 col-10 my-5">
                <div className="row justify-content-center px-3 mb-3">
                  <img
                    id="logo"
                    src={window.location.origin + "/FriendyLogo.png"}
                    alt="logo"
                  />
                </div>
                <h3 className="mb-5 text-center heading">We are Friendy</h3>

                <h6 className="msg-info">Please login to your account</h6>

                <div className="form-group my-4">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Phone no or email id"
                    className="form-control"
                  />
                </div>

                <div className="form-group my-4">
                  <input
                    type="password"
                    id="psw"
                    name="psw"
                    placeholder="Password"
                    className="form-control"
                  />
                </div>

                <div className="row justify-content-center my-3 px-3">
                  <button className="btn-block btn-color">
                    Login to Friendy
                  </button>
                </div>

                <div className="row justify-content-center my-2">
                  <a href="/">
                    <small className="text-muted">Forgot Password?</small>
                  </a>
                </div>
              </div>
            </div>
            <div className="bottom text-center mb-5">
              <a href="/" className="sm-text mx-auto mb-3">
                Don't have an account?
              </a>
              <button className="btn btn-white ml-2 mx-2">Create new</button>
            </div>
          </div>

          <div className="card card2">
            <div className="my-auto mx-md-5 px-md-5 right row">
              <h1 className="text-white ">WHERE FRIENDSHIP GROWS</h1>
              <small className="text-white">
                This is the place where you can connect with your friends freely
                and instantly.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
