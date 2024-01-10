import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type RoleProps = {

    roles?: string[];
}
const LoggedInOnly: React.FC<RoleProps> = ({ roles }) => {

    const { user } = useAuth();
    const location = useLocation();

    return (

        user && !roles ? 
            <Outlet />
            :
            user && roles && roles.includes(user.role) ?
                <Outlet />
                :
                user ?
                    <Navigate to="/404" state={{ from: location }} replace />
                    :
                    <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default LoggedInOnly;