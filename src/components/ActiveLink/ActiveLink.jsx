import { NavLink } from 'react-router-dom';

const ActiveLink = ({children, to}) => {
    return (
        <NavLink to={to} className={({ isActive }) => isActive ? "bg-white text-black" : ""} >
            {children}
        </NavLink >
    );
};

export default ActiveLink;