import React from "react";
import "./LoginPage.css";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState, useContext } from "react";
import axios from "../../services/api/axios";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

interface loginInfo {
  email: string;
  password: string;
}

function LoginPage() {
  //Access authentication context
  const authContext = useContext(AuthContext);

  let navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().max(55).email().required(),
    password: Yup.string().min(6).required(),
  });

  const onSubmit = (data: loginInfo) => {
    console.log("====onSubmit=====");
    try {
      axios
        .post(`/users/login`, data)
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error + "error");
            alert(response.data.error);
          } else {
            localStorage.setItem("accessToken", response.data.token);

            authContext?.setUser({
              id: response.data.id,
              name: response.data.name,
              email: response.data.email,
              role: response.data.role,
              token: response.data.token,
            });
            if (response.data.role !== "Admin") {
              navigate(`/profile/${response.data.id}`);
            } else {
              navigate("/admin");
            }
          }
        })
        .catch((error: any) => {
          console.log(error + "ERRRRROR");
          console.log(error.code + "ERRRRROR");
          // handle error
        });
    } catch (error: any) {
      console.error("Error during login:", error.message);
      console.log(error.status + "login status code");
      alert("An error occurred during login. Please try again.");
    }
  };

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

                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={validationSchema}
                >
                  {(formikProps) => (
                    <Form className="formContainer">
                      {/* form fields */}
                      <div className="form-group my-4">
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email"
                        />
                        <ErrorMessage name="email" component="div" />
                      </div>

                      <div className="form-group my-4">
                        <Field
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Password"
                        />
                        <ErrorMessage name="password" component="div" />
                      </div>

                      <div className="row justify-content-center my-3 px-3">
                        <button className="btn-block btn-color">
                          Login to Friendy
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>

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
