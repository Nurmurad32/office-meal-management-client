import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/features/userSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;

        const formData = { email, password }
        // console.log(formData)
        // form.reset()

        try {
            const response = await dispatch(loginUser(formData)).unwrap();
            if (response._id) {
                toast.success('Successfully Logged In!');
                navigate('/');
            } else {
                toast.error(response.error);
            }
        } catch (error) {
            console.log(error);
            // toast.error('Login failed. Please try again.');
            toast.error(error);
        }
    }

    return (
        <div className="content-center">
            <div className="sm:p-1 md:p-6 w-full max-w-md" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                <h1 className="text-4xl font-bold text-center">Login</h1>

                <form onSubmit={handleLogin} className="card-body mt-3 mb-0 w-full max-w-md">
                    <div className="form-control">
                        <span className="label-text">Email</span>
                        <input type="email" name="email" placeholder="email" className="input input-bordered w-auto" required />
                    </div>
                    <div className="form-control">
                        <span className="label-text">Password</span>
                        <input type="password" name="password" placeholder="password" className="input input-bordered w-auto" />
                    </div>
                    <div className="form-control w-auto">
                        <input className="btn btn-brand1 w-full mt-5" type="submit" value="Login" />
                    </div>
                </form>
                <div className="flex flex-col justify-center items-center">
                    <p>Admin User Info:</p>
                    <p>nur@gmail.com</p>
                    <p>Pass:1234567</p>
                    <p className="mt-5">General User Info:</p>
                    <p>a@gmail.com</p>
                    <p>Pass:1234567</p>
                    <p className="mt-5">Banned User Info:</p>
                    <p>test@gmail.com</p>
                    <p>Pass:1234567</p>
                </div>
            </div>
        </div>
    );
};

export default Login;