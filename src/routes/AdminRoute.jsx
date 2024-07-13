import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({children}) => {

    const { user, loading } = useSelector((state) => state.user);
    const isAdmin = user.role === "Admin"
    const location = useLocation();

    if(loading ){
        // return <progress className="progress w-56"></progress>
        return <p className="loading loading-infinity loading-lg"></p>
    }
    if(user && isAdmin){
        return children
    }
    return <Navigate to="/all-set-my-meal" state={{from:location}} replace></Navigate>
};

export default AdminRoute;