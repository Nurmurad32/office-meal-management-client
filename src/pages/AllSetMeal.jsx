import { Link, useNavigate } from 'react-router-dom';
import useAllSetMeals from '../hooks/useAllSetMeals';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import toast from 'react-hot-toast';
import axios from 'axios';
import base_URL from '../hooks/baseUrl';

const AllSetMeal = () => {
    const navigate = useNavigate()
    const [setMenuData, isSetMenuDataLoading, refetch] = useAllSetMeals()

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

    const handleDeleteSetMeal = async (menu) => {
        try {
            await axios.delete(`${base_URL}/set-menu/${menu?._id}`)
                .then((response) => {
                    // console.log(response.data)
                    if (response.data.deletedCount > 0) {
                        toast.success('Item deleted successfully');
                        refetch()
                        navigate("/all-set-meal")
                    }
                })

        } catch (error) {
            console.error(error);
            toast.error(error);
        }
    };

    if(isSetMenuDataLoading) {
        return <p className="loading loading-infinity loading-lg"></p>
    }

    // console.log(setMenuData)
    return (
        <div className='p-5'>
            <div className="grid grid-cols-3 gap-8">
                {
                    setMenuData.length === 0
                        ? "No Set Meal Found"
                        : setMenuData?.map((menu, index) => (
                            <div key={index + 1} className='shadow-2xl p-3 rounded-lg'>
                                <div className='flex justify-between items-center mt-4'>
                                    <div className='flex flex-col items-center'>
                                        <p>{formatDate(menu?.date)}</p>
                                        <p>{dayOfWeek(menu?.date)}</p>
                                    </div>
                                    <div>
                                        <p onClick={() => handleDeleteSetMeal(menu)}><FaRegTrashAlt className='text-red-600 cursor-pointer' /></p>
                                        <p>
                                            <Link to={`/edit-set-meal/${menu._id}`}><FaRegEdit /></Link>
                                        </p>
                                    </div>
                                </div>
                                <div className='flex flex-col items-center my-5'>
                                    <p><strong>Meal items -</strong> </p>
                                    <ul>
                                        <li>{menu.riceItem}</li>
                                        {menu?.items?.map((item, index) => (
                                            <li key={index}>{getItemName(item)}</li>
                                        ))}
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

export default AllSetMeal;