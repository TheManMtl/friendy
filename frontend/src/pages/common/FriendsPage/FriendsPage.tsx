import React from 'react';
import "./FriendsPage.css";
import { Button } from '../../../components/common';
import FriendsPageHome from './FriendsPageHome';
import FriendsPageLeftMenu from './FriendsPageLeftMenu';
import FriendsPageRequests from './FriendsPageRequests';
import { useFriendsPageContext } from '../../../context/FriendsPageContext';

function FriendsPage() {
    const { selectedRoute } = useFriendsPageContext();

    const renderMainPanelContent = () => {
        switch (selectedRoute) {
            case '/friends':
                return <FriendsPageHome />;
            case '/friends/requests':
                return <FriendsPageRequests />;
            default:
                return <FriendsPageHome />;
        }
    };

    return (
        <div className="d-flex" style={{ height: '91vh' }}>
            <FriendsPageLeftMenu />

            {/* Conditionally display mainPanel contents */}
            <div className="mainPanel">
                {renderMainPanelContent()}
            </div>
        </div>
    );
}

export default FriendsPage;
