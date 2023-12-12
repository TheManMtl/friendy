import  useAuth  from "../../../hooks/useAuth";
import axios from '../../../services/api/axios';
import Button from "./Button";

type LoginProps = {
    username: string;
    password: string;
}

const LoginButton: React.FC<LoginProps> = ({ username, password }) => {

    const { user, setUser } = useAuth();

    const login = async () => {

        try {

            const response = await axios.post('/users/login', {
                username,
                password,
              });
            console.log(response?.data);
            setUser({
                id: response?.data?.id,
                name: response?.data?.name,
                email: response?.data?.email,
                role: response?.data?.role,
                token: response?.data?.token,
                //refreshToken: response?.data?.refreshToken, //TODO
            });

        } catch (err) {
            //TODO
            console.error("Login failed:", err);
        }
      };

  return  <Button label="Login" variant="default" onClick={login} />;
};

export default LoginButton;