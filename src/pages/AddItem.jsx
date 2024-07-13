import axios from 'axios';
import React from 'react';
import base_URL from '../hooks/baseUrl';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
    const { user, loading } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleAddItem = (e) => {
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const itemName = form.itemName.value;
        const itemContain = form.itemContain.value;

        const formData = { email, itemName, itemContain }
        // console.log(formData)
        // form.reset()

        axios.post(`${base_URL}/create-item`, { formData })
            .then((response) => {
                if (response.data.status === "Success") {
                    toast.success('Item added Successfully!');
                    navigate('/all-item');
                } else {
                    toast.error(`${response.data.error}`);
                }
            })
            .catch((error) => {
                // console.log(error);
                toast.error(error);
            });

    }
    return (
        <div className="content-center">
            <div className="sm:p-1 md:p-6 w-full max-w-md" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                <h1 className="text-4xl font-bold text-center">Add a Item</h1>

                <form onSubmit={handleAddItem} className="card-body mt-3 mb-0 w-full max-w-md">
                    <div className="form-control">
                        <span className="label-text">Email</span>
                        <input type="email" name="email" placeholder="Logged email" className=" input input-bordered w-auto" required defaultValue={user.email} readOnly />
                    </div>
                    <div className="form-control">
                        <span className="label-text">Item Name</span>
                        <input type="text" name="itemName" placeholder="Your Name" className=" input input-bordered w-auto" required />
                    </div>
                    <div className="form-control">
                        <span className="label-text">Item Contains</span>
                        <select name='itemContain' className="select select-bordered">
                            <option value="Starch">Starch</option>
                            <option value="Protein">Protein</option>
                            <option value="Veg">Veg</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div className="form-control w-auto">
                        <input className="btn btn-brand1 w-full mt-5" type="submit" value="Add Item" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItem;