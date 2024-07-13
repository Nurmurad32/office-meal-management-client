import React from 'react';
import useAllUser from '../hooks/useAllUser';
import { Link, useNavigate } from 'react-router-dom';
import useAllItem from '../hooks/useAllItem';
import toast from 'react-hot-toast';
import axios from 'axios';
import base_URL from '../hooks/baseUrl';
import { FaRegTrashAlt } from 'react-icons/fa';

const AllItem = () => {
    const navigate = useNavigate()
    const [itemData, isItemDataLoading, refetch] = useAllItem();

    const handleDelete = async (item) => {
        try {
            await axios.delete(`${base_URL}/items/${item?._id}`)
                .then((response) => {
                    // console.log(response.data)
                    if (response.data.deletedCount > 0) {
                        toast.success('Item deleted successfully');
                        refetch()
                        navigate("/all-item")
                    }
                })

        } catch (error) {
            console.error(error);
            toast.error('Failed to delete item');
        }
    };

    // console.log(itemData);

    return (
        <div className="overflow-x-auto content-center">
            <table className="table">
                {/* head */}
                <thead>
                    <tr className='bg-[#032230] text-white'>
                        <th>#</th>
                        <th>Name</th>
                        <th>Item Contain</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {isItemDataLoading
                        ? (<p className="loading loading-infinity loading-lg"></p>)
                        : itemData.length === 0
                            ? "No item Found"
                            : itemData?.map((item, index) => (
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>{item?.itemName}</td>
                                    <td>{item?.itemContain}</td>
                                    {/* <td ><Link to={`/edit-user/${item._id}`}>Delete</Link></td> */}
                                    <td onClick={() => handleDelete(item)}><FaRegTrashAlt className='text-red-600 cursor-pointer' /></td>
                                </tr>
                            ))

                    }

                </tbody>
            </table>
        </div>
    );
};

export default AllItem;