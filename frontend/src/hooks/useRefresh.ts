import useAuth from "../hooks/useAuth";
import axios from "../services/api/axios";
import { useNavigate } from "react-router-dom";

const useRefresh = () => {

    const { setUser } = useAuth();
    const navigate = useNavigate();

    const refresh = async () => {

        try {
            // use default axios instance
            // append cookies containing refresh token
            const response = await axios.get('/users/refresh', {
              withCredentials: true,
            });
      
            // replace user in auth context
            setUser(response.data);
      
            // return token only for export
            return response.data.token;

          } catch (error) {
            // nullify user and redirect to login
            setUser(null);
            navigate("/login");
          }
    }

    return refresh;
}

export default useRefresh;