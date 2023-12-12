import React from 'react'
import "./FriendsPage.css";

function FriendsPageLeftMenu() {
    return (
        <>
            <div className="leftMenu">
                <h3 className="leftMenu-title left m-2">Friends</h3>
                <ul className="navbar-nav flex-column align-items-center">
                    <li className="nav-item leftMenu-option d-flex justify-content-between">
                        <a className="nav-link" href="/friends">
                            <i className="bi bi-people-fill icon"></i> Home
                        </a>
                    </li>
                    <li className="nav-item leftMenu-option d-flex justify-content-between">
                        <a className="nav-link" href="/friends">
                            <i className="bi bi-person-fill-exclamation icon"></i> Friend Requests
                            <i className="bi bi-chevron-right icon"></i>
                        </a>
                    </li>
                    <li className="nav-item leftMenu-option d-flex justify-content-between">
                        <a className="nav-link" href="/friends">
                            <i className="bi bi-person-fill-add icon"></i> Suggestions
                            <i className="bi bi-chevron-right icon"></i>
                        </a>
                    </li>
                    <li className="nav-item leftMenu-option d-flex justify-content-between">
                        <a className="nav-link" href="/friends">
                            <i className="bi bi-person-hearts icon"></i> All Friends
                            <i className="bi bi-chevron-right icon"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default FriendsPageLeftMenu
