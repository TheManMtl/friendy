import React from 'react';
import "./FriendsPage.css";
import { useFriendsPageContext } from '../../../context/FriendsPageContext';
import { Link } from 'react-router-dom';

function FriendsPageLeftMenu() {
    const { setRoute } = useFriendsPageContext();

    const handleLinkClick = (route: string) => {
        setRoute(route);
    };

    return (
        <>
            <div className="leftMenu">
                <h3 className="leftMenu-title left m-2">Friends</h3>
                <ul className="navbar-nav flex-column align-items-center">
                    <li className="nav-item leftMenu-option d-flex justify-content-between">
                        <Link to="/friends" className="nav-link" onClick={() => handleLinkClick('/friends')}>
                            <i className="bi bi-people-fill icon"></i> Home
                        </Link>
                    </li>
                    <li className="nav-item leftMenu-option d-flex justify-content-between">
                        <Link to="/friends/requests" className="nav-link" onClick={() => handleLinkClick('/friends/requests')}>
                            <i className="bi bi-person-fill-exclamation icon"></i> Friend Requests
                            <i className="bi bi-chevron-right icon"></i>
                        </Link>
                    </li>
                    <li className="nav-item leftMenu-option d-flex justify-content-between">
                        <Link to="/friends" className="nav-link" onClick={() => handleLinkClick('/friends')}>
                            <i className="bi bi-person-fill-add icon"></i> Suggestions
                            <i className="bi bi-chevron-right icon"></i>
                        </Link>
                    </li>
                    <li className="nav-item leftMenu-option d-flex justify-content-between">
                        <Link to="/friends/list" className="nav-link" onClick={() => handleLinkClick('/friends/list')}>
                            <i className="bi bi-person-hearts icon"></i> All Friends
                            <i className="bi bi-chevron-right icon"></i>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default FriendsPageLeftMenu;
