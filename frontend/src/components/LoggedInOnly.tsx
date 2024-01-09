import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LoggedInOnly = () => {

    const { user } = useAuth();
    const location = useLocation();

    return (
        user ?
        <Outlet />
        :
        <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default LoggedInOnly;