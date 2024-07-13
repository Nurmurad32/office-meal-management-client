import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import base_URL from "../hooks/baseUrl";

const AddUser = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get user id from URL parameters
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        role: 'User',
        status: 'Active',
        password: ''
    });

    useEffect(() => {
        if (id) {
            // Fetch user data for editing
            axios.get(`${base_URL}/user/${id}`)
                .then((response) => {
                    const user = response.data.data;
                    setFormData({
                        name: user.name,
                        email: user.email,
                        contact: user.contact,
                        role: user.role,
                        status: user.status,
                        password: '' // Password should be handled separately
                    });
                })
                .catch((error) => {
                    // console.log(error);
                    toast.error('Failed to fetch user data');
                });
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        
        // Only include the password in the form data if it is provided
        const formDataToSend = { ...formData };
        if (!formDataToSend.password) {
            delete formDataToSend.password;
        }

        if (id) {
            // Edit user
            axios.patch(`${base_URL}/edit-user/${id}`, formDataToSend)
                .then((response) => {
                    if (response.data.status === "Success") {
                        toast.success('User Updated Successfully!');
                        navigate('/all-user'); // Navigate to user list or any other page
                    } else {
                        toast.error(`${response.data.error}`);
                    }
                })
                .catch((error) => {
                    // console.log(error);
                    toast.error('Failed to update user');
                });
        } else {
            // Add user
            axios.post(`${base_URL}/register`, { formData: formDataToSend })
                .then((response) => {
                    if (response.data.status === "Success") {
                        toast.success('User Registered Successfully!');
                        navigate('/all-user'); // Navigate to user list or any other page
                    } else {
                        toast.error(`${response.data.error}`);
                    }
                })
                .catch((error) => {
                    // console.log(error);
                    toast.error('Failed to register user');
                });
        }
    };

    return (
        <div className="content-center">
            <div className="sm:p-1 md:p-6 w-full max-w-md" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                <h1 className="text-4xl font-bold text-center">{id ? 'Edit User' : 'Add a User'}</h1>

                <form onSubmit={handleAddUser} className="card-body mt-3 mb-0 w-full max-w-md">
                    <div className="form-control">
                        <span className="label-text">Name</span>
                        <input type="text" name="name" placeholder="Your Name" className="input input-bordered w-auto" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="form-control">
                        <span className="label-text">Email</span>
                        <input type="email" name="email" placeholder="email" className="input input-bordered w-auto" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div className="form-control">
                        <span className="label-text">Contact (Optional)</span>
                        <input type="text" name="contact" placeholder="Contact" className="input input-bordered w-auto" value={formData.contact} onChange={handleInputChange} />
                    </div>
                    <div className="form-control">
                        <span className="label-text">Role</span>
                        <select name='role' className="select select-bordered" value={formData.role} onChange={handleInputChange}>
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <span className="label-text">Status</span>
                        <select name='status' className="select select-bordered" value={formData.status} onChange={handleInputChange}>
                            <option value="Active">Active</option>
                            <option value="Banned">Banned</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <span className="label-text">Password</span>
                        <input type="password" name="password" placeholder="password" className="input input-bordered w-auto" value={formData.password} onChange={handleInputChange} required={!id} />
                    </div>
                    <div className="form-control w-auto">
                        <input className="btn btn-brand1 w-full mt-5" type="submit" value={id ? 'Update User' : 'Add User'} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
