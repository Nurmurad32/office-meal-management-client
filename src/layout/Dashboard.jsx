import { Outlet, useNavigate } from 'react-router-dom';
import ActiveLink from '../components/ActiveLink/ActiveLink';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/features/userSlice';
import { CiMenuFries } from 'react-icons/ci';

const Dashboard = () => {
    const { user, loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log("From Dashboard User:", user);

    const handleLogout = () => {
        dispatch(logoutUser()).then(() => {
            navigate('/login');
        });
    };

    if (loading) {
        return <p className="loading loading-infinity loading-lg"></p>;
    }

    return (
        <div className="drawer sm:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-[#F6F9FC]">
                {/* Page content here */}

                <label htmlFor="my-drawer-2" className="btn btn-brand1 drawer-button md:hidden"><CiMenuFries /></label>
                <Outlet></Outlet>

            </div>
            <div className="drawer-side bg-[#0089c9] text-center">

                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay text-center text-black font-bold">

                </label>
                <ul className="menu px-4 w-72 min-h-screen text-base-content text-center ul-dashboard">
                    <li className="text-center my-4 hover:bg-none">Welcome, {user.name}</li>
                    <li onClick={handleLogout} className="border-b-2 cursor-pointer hover:bg-none"> <strong className='mx-auto'>Logout</strong> </li>
                    {
                        user && user?.role === "Admin"
                            ? <>
                                <li className='mt-5'><ActiveLink to="/">Dashboard</ActiveLink></li>
                                <div className='sm:hidden md:block font-semibold my-5 border-y-2 p-2'>User Management</div>
                                <div className='ml-5 activeBtn'>
                                    <li><ActiveLink to="/all-user">All User</ActiveLink></li>
                                    <li><ActiveLink to="/add-user">Add User</ActiveLink></li>
                                </div>
                                <div className='sm:hidden md:block font-semibold my-5 border-y-2 p-2'>Item Management</div>
                                <div className='ml-5 activeBtn'>
                                    <li><ActiveLink to="/all-item">All Item</ActiveLink></li>
                                    <li><ActiveLink to="/add-item">Add Item</ActiveLink></li>
                                </div>
                                <div className='sm:hidden md:block font-semibold my-5 border-y-2 p-2'>Meal Management</div>
                                <div className='ml-5 activeBtn mb-5'>
                                    <li><ActiveLink to="/all-set-meal">All Set Meals</ActiveLink></li>
                                    <li><ActiveLink to="/set-meal">Set Daily Meals</ActiveLink></li>
                                </div>
                            </>
                            : <>
                                <li><ActiveLink to="/all-set-my-meal">All My Daily Meals</ActiveLink></li>
                                <li><ActiveLink to="/set-my-meal">Set My Daily Meals</ActiveLink></li>
                            </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;