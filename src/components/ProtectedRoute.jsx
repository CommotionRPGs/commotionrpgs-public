import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/context/authStore";

const ProtectedRoute = ({ children, allowedTypes=['admin', 'dm', 'player'] }) => {
    const user = useAuthStore((state) => state.user)
    const location = useLocation()
    //console.log(location)
    if (!user) {
        return <Navigate 
            to="/login"
            state={{ pathname: location.pathname }}
            replace
        />
    }
    if (allowedTypes.indexOf(user.account_type) === -1) {
        return <Navigate 
            to="/"
            state={{ pathname: location.pathname }}
            replace
        />
    }
    return children;
};
export default ProtectedRoute;