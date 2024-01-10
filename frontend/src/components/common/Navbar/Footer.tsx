import React, { useEffect, useState } from "react";
import "./Navbar.css";
import "./Footer.css";
import useAuth from "../../../hooks/useAuth";


function Footer() {

    const { user } = useAuth();

    return (
        user ? (
            <div className="mt-5">
                {/* Footer */}

                <footer className="text-center text-lg-start bg-body-tertiary text-muted footer-text">

                    {/* <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    
                       
                       
                    </section> */}
                   
                    <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                        <div className="container text-center text-md-start ">
                            {/* <!-- Grid row --> */}
                            <div className="row mt-3">
                                {/* <!-- Grid column --> */}
                                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <div className="flex-container">
                                    {/* <!-- Content --> */}

                                    <img
                                        src={window.location.origin + "/FriendyLogo.png"}
                                        alt="logo"
                                        className="logo "
                                    ></img>
                                    <h6 className="text-uppercase fw-bold mb-4">
                                        <i className="fas fa-gem me-3"></i>
                                        Friendy
                                    </h6>
                                    </div>
                                    <div className=" p-4" >
                        © 2024
                      
                    </div>
                                </div>
                                {/* <!-- Grid column -->
   
           <!-- Grid column --> */}
                                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-2">
                                    {/* <!-- Links --> */}
                                    <h6 className="text-uppercase fw-bold mb-4">
                                      About us
                                    </h6>
                                    <p>
                                        <a href="#!" className="text-reset">Home</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">About</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">Privacy</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">Terms</a>
                                    </p>
                                </div>
                                {/* <!-- Grid column -->
   
           <!-- Grid column --> */}
                                {/* <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4"> */}
                                    {/* <!-- Links --> */}
                                    {/* <h6 className="text-uppercase fw-bold mb-4">
                                        Useful links
                                    </h6>
                                    <p>
                                        <a href="#!" className="text-reset">Pricing</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">Settings</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">Orders</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-reset">Help</a>
                                    </p> */}
                                {/* </div> */}
                                {/* <!-- Grid column -->
   
           <!-- Grid column --> */}
                                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-2">
                                    {/* <!-- Links --> */}
                                    <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                    <p><i className="fas fa-home me-3"></i> Montreal, QC H9H 6T9, CA</p>
                                    <p>
                                        <i className="fas fa-envelope me-3"></i>
                                        info@friendy.com
                                    </p>
                                    <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
                                 
                                </div>
                                {/* <!-- Grid column --> */}
                            </div>
                            {/* <!-- Grid row --> */}
                        </div>
                    </section>
                    {/* <!-- Section: Links  -->
   
     <!-- Copyright --> */}
                    {/* <div className="text-center p-4" >
                        © 2024 Copyright:
                        <a className="text-reset fw-bold" >Friendy.com</a>
                    </div> */}

                </footer>


            </div>
        ) : (<></>)


    );

}

export default Footer;
