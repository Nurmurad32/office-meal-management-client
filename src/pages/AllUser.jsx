import React, { useEffect, useState } from 'react';
import useAllUser from '../hooks/useAllUser';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';

const AllUser = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const limit = 5;
    // const [usersData, isUserDataLoading, refetch] = useAllUser();
    const { usersData, isUserDataLoading, refetch, totalPages, currentPage } = useAllUser(page, limit, searchQuery);

    useEffect(() => {
        setPage(1); // Reset to the first page on new search
        refetch();
    }, [searchQuery, refetch]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        refetch();
    };

    // if (isUserDataLoading) return <div><p className="loading loading-infinity loading-lg"></p></div>;

    // console.log(usersData);

    return (
        <div className="p-5">
            <div className='flex justify-end'>
                <div className="form-control w-full max-w-xs">
                <input
                        type="text"
                        name="search"
                        className="input input-bordered w-auto"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by name or email"
                        required
                    />
                </div>

            </div>
            <div className='mt-5'>
                <p className='flex justify-center text-xl mb-3'> <strong className='ml-2'>User Information</strong></p>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='bg-[#032230] text-white'>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isUserDataLoading
                                    ? (<p className="loading loading-infinity loading-lg"></p>)
                                    : (
                                        <>
                                            {
                                                usersData?.map((user, index) => (
                                                    <tr key={user._id}>
                                                        <th>{index + 1}</th>
                                                        <td>{user?.name}</td>
                                                        <td>{user?.email}</td>
                                                        <td>{user?.role}</td>
                                                        <td>{user?.status}</td>
                                                        <td ><Link to={`/edit-user/${user._id}`}><FaRegEdit /></Link></td>
                                                    </tr>
                                                ))
                                            }
                                        </>
                                    )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-center items-center mt-5">
                <button
                    className="btn btn-brand1"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="mx-2">{currentPage} of {totalPages}</span>
                <button
                    className="btn btn-brand1"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>

    );
};

export default AllUser;