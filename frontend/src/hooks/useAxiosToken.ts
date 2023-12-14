import { axiosToken } from "../services/api/axios";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";


const useAxiosToken = () => {

    const { user, setUser } = useAuth();
    const token = user?.token;


    useEffect(() => {

        //attach token to request headers
        const requestIntercept = axiosToken.interceptors.request.use(
            config => {
                if (!config.headers['authorization']) {
                    config.headers['authorization'] = `Bearer ${token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );
        // intercept response to check for new token
        const responseIntercept = axiosToken.interceptors.response.use(
            async (response) => {
                //update if token was refreshed
                if (response?.data?.accessToken) {
                    const refreshedUser = {
                        ...user!,
                        token: response.data.accessToken,
                    };
                    setUser(refreshedUser);
                }
                return response;
            }, (error) => Promise.reject(error)
        );

        //eject interceptors when done
        return () => {
            axiosToken.interceptors.request.eject(requestIntercept);
            axiosToken.interceptors.response.eject(responseIntercept);
        }
    }, [token, user, setUser]);

    return axiosToken;
}

export default useAxiosToken;