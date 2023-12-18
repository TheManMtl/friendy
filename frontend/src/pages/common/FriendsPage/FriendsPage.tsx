import React from 'react';
import "./FriendsPage.css";
import FriendsPageHome from './FriendsPageHome';
import FriendsPageLeftMenu from './FriendsPageLeftMenu';
import FriendsPageRequests from './FriendsPageRequests';
import FriendsPageSuggestions from './FriendsPageSuggestions';
import { useFriendsPageContext } from '../../../context/FriendsPageContext';
import FriendsPageList from './FriendsPageList';

function FriendsPage() {
    const { selectedRoute } = useFriendsPageContext();

    const renderMainPanelContent = () => {
        switch (selectedRoute) {
            case '/friends':
                return <FriendsPageHome />;
            case '/friends/requests':
                return <FriendsPageRequests />;
            case '/friends/suggestions':
                return <FriendsPageSuggestions />;
            case '/friends/list':
                return <FriendsPageList />;
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
