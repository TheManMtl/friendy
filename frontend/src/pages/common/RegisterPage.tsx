import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import axios from '../../services/api/axios';
import * as Yup from 'yup';
import { useFormik, ErrorMessage, Formik, Form, Field, FormikProps } from "formik";
import "./LoginPage.css";
import { useNavigate } from 'react-router-dom';


function RegistrationPage() {

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMessage('');
  }, [])

  type inputs = {
    name: string,
    email: string,
    password: string,
    passwordCopy: string
  }

  type apiErr = {
    message: string
  }
  const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordCopy: ''
  };


  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required.'),
    email: Yup.string().max(55).email('Valid email is required.').required('Valid email is required.'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Password must contain 8 characters and at least one uppercase, one lowercase, one number and one special character"
      )
      .required('Password is required.'),
    passwordCopy: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match.')
      .required('Please retype password.')
  });

  const handleSignup = async (data: inputs) => {
    
    try {

      await axios.post("/users/signup", data);
      setSuccess(true);

    } catch (error) {

      const err = error as AxiosError<apiErr>;

      if (!err?.response) {

        setErrorMessage("Failed to connect to server.");

      } else if (err.response.data?.message) {

        console.log(err);
        console.log(err.response.data.message);
        setErrorMessage(err.response.data.message);

      } else {
        console.log(err);
        setErrorMessage("Something went wrong.");
      }
    }
  }

  return (
    <>

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
                  {success ?

                    <>
                      <h6 className="msg-info">Success! You may now proceed to login.</h6>

                    </>
                    :
                    <>
                      <h6 className="msg-info">Create a new account</h6>
                      <Formik
                        initialValues={initialValues}
                        onSubmit={handleSignup}
                        validationSchema={validationSchema}
                        validateOnChange={true}
                      >
                        {(formikProps) => (
                          <Form className="formContainer">

                            <div className="form-group my-4">
                              <Field
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                className="form-control"
                                required
                              />
                              <ErrorMessage name="name" component="div" />
                            </div>

                            <div className="form-group my-4">
                              <Field
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Email address"
                                className="form-control"
                                required
                              />
                              <ErrorMessage name="email" component="div" />
                            </div>

                            <div className="form-group my-4">
                              <Field
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                className="form-control"
                                required
                              />
                              <ErrorMessage name="password" component="div" />
                            </div>

                            <div className="form-group my-4">
                              <Field
                                type="password"
                                id="passwordCopy"
                                name="passwordCopy"
                                placeholder="Confirm password"
                                className="form-control"
                                required
                              />
                              <ErrorMessage name="passwordCopy" component="div" />
                            </div>
                            <span className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</span>

                            <div className="row justify-content-center my-3 px-3">
                              <button className="btn-block btn-color">Register</button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </>
                  }
                </div>
              </div>
              <div className="bottom text-center mb-5">
                {success ?

                  <>
                  </>
                  :
                  <>
                    <a href="/" className="sm-text mx-auto mb-3">
                      Already have an account?
                    </a>
                  </>
                }
                <button className="btn btn-white ml-2 mx-2" onClick={()=> navigate("/login")}>Login</button>
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

    </>
  );
}

export default RegistrationPage;
