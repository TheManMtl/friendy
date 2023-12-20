import { axiosToken } from "../services/api/axios";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useRefresh from "./useRefresh";
import { AxiosInstance } from "axios";

const useAxiosToken = () => {
  const { user, setUser } = useAuth();
  const refresh = useRefresh();

  useEffect(() => {
    const token = user?.token;

    //attach token to request headers
    const requestIntercept = axiosToken.interceptors.request.use(
      (config) => {
        if (!config.headers["x-access-token"]) {
          config.headers["x-access-token"] = token;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    // intercept response to check for new token
    // intercept response
    const responseIntercept = axiosToken.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        // if 403, try once to refresh token
        if (
          (error?.response?.status === 401 ||
            error?.response?.status === 403) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true; //disallows repeated attempt

          //get new token from refresh hook
          const newToken = await refresh();
          //replace old request with new headers
          prevRequest.headers["x-access-token"] = `Bearer ${newToken}`;

          return axiosToken(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    //eject interceptors when done
    return () => {
      axiosToken.interceptors.request.eject(requestIntercept);
      axiosToken.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, user, setUser]);

  return axiosToken as AxiosInstance;
};

export default useAxiosToken;
export { axiosToken };
