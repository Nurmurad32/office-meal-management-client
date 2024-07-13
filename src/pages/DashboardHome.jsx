import React, { useState, useEffect } from 'react';
import useAllUserMeals from '../hooks/useAllUserMeals';
import formatDate from '../hooks/useFormatDate';
import useAllUserInfo from '../hooks/useAllUserInfo';
import moment from 'moment-timezone';

const DashboardHome = () => {
    const getCurrentDateInBST = () => {
        return moment().tz('Asia/Dhaka').format('YYYY-MM-DD');
    };
    
    // const [searchDate, setSearchDate] = useState(new Date().toISOString().split('T')[0]);
    const [searchDate, setSearchDate] = useState(getCurrentDateInBST())
    const [usersData, isUserDataLoading] = useAllUserInfo()
    const [userMealData, isUserMealDataLoading, refetch] = useAllUserMeals({ requestedDate: searchDate });

    const handleChange = (e) => {
        setSearchDate(e.target.value); // Set the selected date
    };

    useEffect(() => {
        refetch(); // Refetch data when searchDate changes
    }, [searchDate, refetch]);

    const getItemName = (item) => item.split('=')[0];

    // console.log(userMealData)

    return (
        <div className='p-5'>
            <div className='flex justify-end'>
                <div className="form-control w-full max-w-xs">
                    <span className="label-text text-lg">Search Meal by Date</span>
                    <input
                        type="date"
                        name="date"
                        className="input input-bordered w-auto"
                        required
                        onChange={handleChange}
                        value={searchDate}
                    />
                </div>

            </div>
            <div className='mt-5'>
                <p className='flex justify-center text-xl mb-3'>Meal is for <strong className='ml-2'>{formatDate(searchDate)}</strong></p>
                <div className="overflow-x-auto">
                    <table className="table ">
                        {/* head */}
                        <thead >
                            <tr className='bg-[#032230] text-white'>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Meal Status</th>
                                <th>Meal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isUserMealDataLoading ||  isUserDataLoading
                                ? (<p className="loading loading-infinity loading-lg"></p>)
                                : (
                                    // <p>{userMealData?.length} meals found</p>
                                    <>
                                        {userMealData.length === 0
                                            ? <tr><td>No Meal Found</td></tr>
                                            : userMealData?.map((userMeal, index) => (
                                                <tr key={index + 1}>
                                                    <th>{index + 1}</th>
                                                    <td>{usersData.find(user => user.email === userMeal?.email).name}</td>
                                                    <td>{userMeal?.email}</td>
                                                    <td>{userMeal?.mealStatus}</td>
                                                    <td>{userMeal.riceItem}
                                                        {userMeal?.items?.map((item, index) => (
                                                            <React.Fragment key={index}>,  {getItemName(item)}</React.Fragment>
                                                        ))}</td>
                                                </tr>
                                            ))
                                        }
                                    </>
                                )}
                            {/* row 1 */}
                            {/* {
                                
                            } */}

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default DashboardHome;
