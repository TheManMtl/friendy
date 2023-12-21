import React, { useContext } from 'react';
import { AuthContext } from "../../../context/AuthProvider";
import { useFriendsPageContext } from '../../../context/FriendsPageContext';
import "./FriendsPage.css";
import FriendsPageLeftMenu from './FriendsPageLeftMenu';
import FriendsPageHome from './FriendsPageHome';
import FriendsPageRequests from './FriendsPageRequests';
import FriendsPageSuggestions from './FriendsPageSuggestions';
import FriendsPageList from './FriendsPageList';


function FriendsPage() {

    const { selectedRoute } = useFriendsPageContext();
    const authContext = useContext(AuthContext);
    const user = authContext && authContext.user;

    const renderMainPanelContent = () => {
        switch (selectedRoute) {
            case '/friends':
                return <FriendsPageHome userId={user?.id ?? 0}/>;
            case '/friends/requests':
                return <FriendsPageRequests userId={user?.id ?? 0}/>;
            case '/friends/suggestions':
                return  <FriendsPageSuggestions userId={user?.id ?? 0} />;
            case '/friends/list':
                return <FriendsPageList userId={user?.id ?? 0}/>;
            default:
                return <FriendsPageHome userId={user?.id ?? 0}/>;
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
