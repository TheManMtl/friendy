import React from 'react';
import "../AdminStyle.css";
import useAuth from '../../../../hooks/useAuth';

const AdminNavbarTop = () => {

    const {user} = useAuth();
    return (
        <nav className="navbar navbar-expand-lg bg-blue">
            <div className="container-fluid ">
                {/* Left side with links */}
                <a href='/admin/#' className="navbar-brand mx-3 text-light">Users</a>
                
                {/* Right side with admin name + image */}
                <div className="navbar-text d-flex align-items-center ms-auto">
                    <span className="me-5 text-light">Welcome, {user?.name}</span>
                    {/* <img
                        src="path-to-your-image.jpg"
                        alt="User Avatar"
                        width="30"
                        height="30"
                        className="rounded-circle me-3"
                    /> */}
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbarTop;
