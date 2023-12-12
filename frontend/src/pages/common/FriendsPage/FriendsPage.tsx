import React from 'react';
import "./FriendsPage.css";
import { Button } from '../../../components/common';

function FriendsPage() {

    // TODO: Will move this into component later!  This will iterate over some "get" request
    const dummyPanels = Array.from({ length: 50 }, (_, index) => (
        <div key={index} className="panel justify-content-center align-items-center" style={{ backgroundImage: `url('https://picsum.photos/200/200?random=${index}')` }}>
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <div className="friendName">
                <h5 className="mb-4">Friend {index + 1}</h5>
                <Button
                    label="Add Friend"
                    variant="blue"
                    onClick={() => console.log(`Add Friend ${index + 1}`)}
                />
            </div>
        </div>
    ));


    return (
        <div className="d-flex" style={{ height: '91vh' }}>
            <div className="leftMenu">
                <h3 className="leftMenu-title left m-2">Friends</h3>
                {/* TODO: Create component from this */}
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

            {/* This will display content depending on selection in left */}
            <div className="mainPanel">
                <div className="d-flex justify-content-between align-items-center p-2">
                    <h4>People you may know</h4>
                </div>

                <div className="panel-grid">
                    {dummyPanels}
                </div>

            </div>
        </div>
    );
}

export default FriendsPage;
