import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import base_URL from '../hooks/baseUrl';
import { Link, useNavigate } from 'react-router-dom';
import useAllSetMyMeal from '../hooks/useAllSetMyMeal';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { list } from 'postcss';
import useAllUserMeals from '../hooks/useAllUserMeals';
import useAllSetMeals from '../hooks/useAllSetMeals';
import moment from 'moment-timezone';

const AllSetMyMeal = () => {
    const getCurrentDateInBST = () => {
        return moment().tz('Asia/Dhaka').format('YYYY-MM-DD');
    };

    const searchDate = getCurrentDateInBST();
    // const searchDate = "2024-07-15";
    const [setMenuData, isSetMenuDataLoading] = useAllSetMeals();
    const [todayMenu, setTodayMenu] = useState()

    useEffect(() => {
        const filteredMenu = setMenuData?.find(menu => {
            const mealDate = moment(menu.date).format('YYYY-MM-DD');
            return mealDate === searchDate;
        });
        setTodayMenu(filteredMenu);
    }, [searchDate, setMenuData]);

    const navigate = useNavigate()
    const [setMyMenuData, isSetMyMenuDataLoading, refetch] = useAllSetMyMeal()

    const dayOfWeek = (requestedDate) => {
        const date = new Date(requestedDate);
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return daysOfWeek[date.getDay()];
    }

    // Function to format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const getItemName = (item) => item.split('=')[0];

    const handleDeleteSetMyMeal = async (menu) => {
        try {
            await axios.delete(`${base_URL}/set-my-menu/${menu?._id}`)
                .then((response) => {
                    // console.log(response.data)
                    if (response.data.deletedCount > 0) {
                        toast.success('Meal deleted successfully');
                        refetch()
                        navigate("/all-set-my-meal")
                    } else {
                        toast.error(response.data.error);
                    }
                })

        } catch (error) {
            console.error(error);
            toast.error('Failed to delete meal');
        }
    };

    // console.log(setMenuData, todayMenu, searchDate)


    if (isSetMyMenuDataLoading || isSetMenuDataLoading) return <div><p className="loading loading-infinity loading-lg"></p></div>;

    return (
        <div className='p-5'>
            <div className='w-3/12 mx-auto'>
                <p className='text-xl text-center font-bold'>Meal From Office </p>
                {todayMenu
                    ? <div className='shadow-2xl p-3 rounded-lg'>
                        <div className='flex justify-between items-center mt-4'>
                            <div className='flex flex-col items-center'>
                                <p>{formatDate(todayMenu?.date)}</p>
                                <p>{dayOfWeek(todayMenu?.date)}</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center my-5'>
                            <p><strong>Meal items -</strong> </p>
                            <ul>
                                <li>{todayMenu.riceItem}</li>
                                {todayMenu?.items?.map((item, index) => (
                                    <li key={index}>{getItemName(item)}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    : <p className='text-center'>No meal Selected Yet </p>
                }
            </div>
            <div>
                <p className='text-xl text-center mt-8 font-bold'>My Selected Meal </p>
            </div>
            <div className="grid grid-cols-3 gap-8 mt-5">
                {setMyMenuData.length === 0
                    ? "No set Meal Found"
                    : setMyMenuData?.map((menu, index) => (
                        <div key={index + 1} className='shadow-2xl p-3 rounded-lg'>
                            <div className='flex justify-between items-center mt-4'>
                                <div className='flex flex-col items-center'>
                                    <p>{formatDate(menu?.date)}</p>
                                    <p>{dayOfWeek(menu?.date)}</p>
                                </div>
                                <div>
                                    <p onClick={() => handleDeleteSetMyMeal(menu)}>
                                        <FaRegTrashAlt className='text-red-600 cursor-pointer' />
                                    </p>
                                    <p>
                                        <Link to={`/edit-set-my-meal/${menu._id}`}><FaRegEdit /></Link>
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col items-center my-5'>


                                <ul>
                                    {
                                        menu.mealStatus === "No"
                                            ? <li><strong>Your Meal is Off</strong></li>
                                            : <>
                                                <p><strong>Meal items -</strong> </p>
                                                <li>{menu.riceItem}</li>
                                                {menu?.items?.map((item, index) => (
                                                    <li key={index}>{getItemName(item)}</li>
                                                ))}
                                            </>
                                    }
                                </ul>

                                {/* <p>3. {menu.itemContain_3}</p> */}
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    );
};

export default AllSetMyMeal;