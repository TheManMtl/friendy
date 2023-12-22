import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./CreateAlbum.css";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import useAxiosToken from "../../../hooks/useAxiosToken";
function CreateAlbum(){
    const authContext = useContext(AuthContext);
 const axiosToken = useAxiosToken();
//  const history = useHistory();
return(
    <div className="parent-container d-flex">
    <div className="container leftPanel col-xl-3">
        <div className="row">
            <div className="col-xl-3 mb-4">
             {/* <Link to={`/profile/${id}/album`}> */}
            <i className="bi bi-arrow-left-circle-fill text-secondary fs-3"></i>
            {/* </Link> */}
            </div>
               <h2 className="mb-5">Create Album</h2>
               <Form>
                <Form.Group className="mb-3" controlId="albumTitle">
                    <Form.Control type="text" placeholder="Album Title" />
                </Form.Group>
                <Button variant="secondary" type="submit">
                    Upload Photos
                    </Button>
                <Button variant="primary" className="m-3" type="submit">
                    Create 
                    </Button>
               </Form>
                
            
        </div>
    </div>

    <div className="container col-xl-9">
        <div className="row">
            <div className="">
                Container Right
            </div>
        </div>
    </div>
</div>
)
}
export default CreateAlbum;