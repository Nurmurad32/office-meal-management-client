import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useSelector((state) => state.user);

    if (loading) {
        return <p className="loading loading-infinity loading-lg"></p>
    ;
    }

    if (user) {
        return children;
    }

    return <Navigate state={{ from: location }} to="/login" replace />;
};

export default PrivateRoute;
