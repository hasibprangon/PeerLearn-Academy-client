import { useContext } from "react"
import { AuthContext } from "../Provider/AuthContextProvider";

const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

export default useAuth;