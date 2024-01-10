import React, { useEffect, useState } from "react";
import "./Navbar.css";
import "./Footer.css";
import { useForm } from "react-hook-form";
import ProfileImage from "../ProfileImage/ProfileImage";
import LogoutButton from "../Button/LogoutButton";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { SearchModel } from "../../../models/SearchModel";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosToken from "../../../hooks/useAxiosToken";
import axios from "../../../services/api/axios";

function Footer() {
    const [refreshTimestamp, setRefreshTimestamp] = useState(Date.now());

    const authContext = useContext(AuthContext);
    const userId = authContext?.user?.id;
    console.log("====userId in Navbar is====" + userId);
    const navigate = useNavigate();
    const [profileThumb, setProfileThumb] = useState<string | null>("");
    const { user, setUser } = useAuth();
    const axiosToken = useAxiosToken();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SearchModel>();

    function onSubmit(input: SearchModel, event: any) {
        event.preventDefault();
        const urlParams = input.searchTerms.trim();
        console.log(urlParams);
        const params = encodeURIComponent(urlParams);
        navigate(`/search?search=${params}`);
    }

    useEffect(() => {
        if (user != null) {
            axiosToken.get(`/profile/view/${user.id}`).then((response) => {
                console.log(
                    "=====navbar profileImageId=====" +
                    response.data.profileInfo.profileImgId
                );
                console.log("====API Response====", response.data);

                if (response.data.profileInfo.profileImgId != null) {
                    const profileImageId = response.data.profileInfo.profileImgId;
                    axios.get(`/posts/userprofile/${profileImageId}`).then((response) => {
                        console.log("====thumbnail URl====" + response.data.thumbnailUrl);
                        if (response.data.length !== 0 && !response.data.isDeleted) {
                            //TODO: fetch the profil pic which has the id associated with the user
                            setProfileThumb((prevProfileThumb) => response.data.thumbnailUrl);
                        } else {
                            setProfileThumb(
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnGZWTF4dIu8uBZzgjwWRKJJ4DisphDHEwT2KhLNxBAA&s"
                            );
                        }
                    });
                } else {
                    setProfileThumb(
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnGZWTF4dIu8uBZzgjwWRKJJ4DisphDHEwT2KhLNxBAA&s"
                    );
                }
            });
        }
    }, [user, refreshTimestamp]);
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
