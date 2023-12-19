import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import useRefresh from "../hooks/useRefresh";
import SpinnerComp from "./common/Spinner/SpinnerComp";

const PersistAuth = () => {
  const [isLoading, setLoading] = useState(true);
  const refresh = useRefresh();
  const { user } = useAuth();

  useEffect(() => {
    const retrieveUser = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    !user ? retrieveUser() : setLoading(false);
  }, []);

  return <>{isLoading ? <SpinnerComp /> : <Outlet />}</>;
};

export default PersistAuth;
