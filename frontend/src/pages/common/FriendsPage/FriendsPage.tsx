import React, { useContext } from 'react';
import "./FriendsPage.css";

import FriendsPageHome from './FriendsPageHome';
import FriendsPageLeftMenu from './FriendsPageLeftMenu';
import FriendsPageRequests from './FriendsPageRequests';
import FriendsPageSuggestions from './FriendsPageSuggestions';
import FriendsPageList from './FriendsPageList';
import { AuthContext } from "../../../context/AuthProvider";
import { useFriendsPageContext } from '../../../context/FriendsPageContext';

function FriendsPage() {

    // TODO: make sure this isn't royally f'd up.
    const { selectedRoute } = useFriendsPageContext();
    const authContext = useContext(AuthContext);
    const user = authContext && authContext.user;
    console.log('Authenticated User:', user);

    const renderMainPanelContent = () => {
        switch (selectedRoute) {
            case '/friends':
                return <FriendsPageHome />;
            case '/friends/requests':
                return <FriendsPageRequests />;
            case '/friends/suggestions':
                return <FriendsPageSuggestions userId={user?.id} />;
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
