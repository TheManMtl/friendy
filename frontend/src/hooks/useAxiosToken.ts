/*
operations for refresh tokens commented out until implemented in back end
*/

import { axiosToken } from "../services/api/axios";
import axios  from "../services/api/axios";
import { useEffect } from "react";
import  useAuth  from "../hooks/useAuth";


const useAxiosToken = () => {

    const { user, setUser } = useAuth();
    const token = user?.token;
    const refreshToken = user?.refreshToken;

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
        // intercept response
        const responseIntercept = axiosToken.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                // if 403, try once to refresh token
                if ((error?.response?.status === 403) && !prevRequest?.sent && !!refreshToken) {
                    prevRequest.sent = true; //disallows repeated attempt
                    //use default axios instance with refresh token
                    const response = await axios.get('/auth/refresh', 
                    {
                        headers:
                            { authorization: `Bearer ${refreshToken}`}
                    });
                    //replace old request with new headers
                    prevRequest.headers['authorization'] = `Bearer ${response.data.token}`;
                    //replace token in context
                    const refreshedUser = {
                        ...user!,
                        token: response.data.token,
                      };
                      setUser(refreshedUser);

                    return axiosToken(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        
        //eject interceptors when done
        return () => {
            axiosToken.interceptors.request.eject(requestIntercept);
            axiosToken.interceptors.response.eject(responseIntercept);
        }
    })

    return axiosToken;
}

export default useAxiosToken;