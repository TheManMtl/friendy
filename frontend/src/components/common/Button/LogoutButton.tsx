import useAuth from "../../../hooks/useAuth";
import useAxiosToken from '../../../hooks/useAxiosToken';
import Button from "./Button";


const LogoutButton: React.FC = () => {

    const { user, setUser } = useAuth();
    const axiosToken = useAxiosToken();

    const logout = async () => {

        try {

            const response = await axiosToken.delete('/users/logout');
            console.log(response?.data);
            setUser(null);

        } catch (err) {
            //TODO
            console.error("Logout failed:", err);
        }
    };

    return (
        <>
            {
                user ?
                    <Button label="Logout" variant="default" onClick={logout} />
                    :
                    <></>
            }
        </>
    )
};

export default LogoutButton;