import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {
        
             throw new Error('useAuth hook requires AuthProvider');
        }
   return context;
}

export default useAuth;
