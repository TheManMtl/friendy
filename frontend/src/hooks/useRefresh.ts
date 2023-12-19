import useAuth from "../hooks/useAuth";
import axios from "../services/api/axios";

const useRefresh = () => {

    const { setUser } = useAuth();

    const refresh = async () => {

        //use default axios instance
        //append cookies containing refresh token
        const response = await axios.get('/users/refresh',
            {
                withCredentials: true,
            });

        //replace user in auth context
        setUser(response.data);

        //return token only for export
        return response.data.token;
    }

    return refresh;
}

export default useRefresh;