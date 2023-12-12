import React from 'react';
import "./FriendsPage.css";
import { Button } from '../../../components/common';
import FriendsPageHome from './FriendsPageHome';
import FriendsPageLeftMenu from './FriendsPageLeftMenu';

function FriendsPage() {

    return (
        <div className="d-flex" style={{ height: '91vh' }}>
            <FriendsPageLeftMenu />

            {/* Conditionally display mainPanel contents */}
            <div className="mainPanel">
                <FriendsPageHome />
            </div>
        </div>
    );
}

export default FriendsPage;
