import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useAllItem from "../hooks/useAllItem";
import toast from "react-hot-toast";
import base_URL from "../hooks/baseUrl";
import axios from "axios";

const SetMyMeal = () => {
    const navigate = useNavigate();
    const { mealId } = useParams(); // Get mealId from URL parameters
    const { user } = useSelector((state) => state.user);
    const [itemData, isItemDataLoading, refetch] = useAllItem();
    const [isEditing, setIsEditing] = useState(false); // Track if we are editing

    const [mealData, setMealData] = useState({
        date: '',
        mealStatus: 'Yes',
        riceItem: '',
        items: []
    });

    useEffect(() => {
        if (mealId) {
            setIsEditing(true);
            // Fetch existing meal data for editing
            axios.get(`${base_URL}/set-my-menu/${mealId}`)
                .then((response) => {
                    if (response.data.status === "Success") {
                        const { date, riceItem, items, mealStatus } = response.data.data;
                        setMealData({
                            date: new Date(date).toISOString().split('T')[0], // Format date to yyyy-MM-dd
                            riceItem,
                            items,
                            mealStatus
                        });
                    } else {
                        toast.error('Error fetching meal data');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Error fetching meal data');
                });
        }
    }, [mealId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMealData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setMealData((prevData) => {
            if (checked) {
                return { ...prevData, items: [...prevData.items, value] };
            } else {
                return { ...prevData, items: prevData.items.filter(item => item !== value) };
            }
        });
    };

    const handleSetMyMeal = (e) => {
        e.preventDefault();

        if (mealData.mealStatus === 'No') {
            mealData.riceItem = '';
            mealData.items = [];
        } else {
            const itemCategories = mealData.items.map(item => item.split('=')[1]);
            // console.log(itemCategories);

            if (itemCategories.length < 2) {
                toast.error('A meal must have at least 3 items to be complete includes rice.');
                return;
            }
            const proteinCount = itemCategories.filter(item => item === 'Protein').length;
            if (proteinCount > 1) {
                toast.error('A meal cannot have two protein sources at a time.');
                return;
            }
        }

        const request = isEditing
            ? axios.patch(`${base_URL}/set-my-menu/${mealId}`, { mealData, email: user.email })
            : axios.post(`${base_URL}/create-set-my-menu`, { mealData, email: user.email });

        request
            .then((response) => {
                if (response.data.status === "Success") {
                    toast.success(`Meal ${isEditing ? 'updated' : 'created'} successfully!`);
                    navigate('/all-set-my-meal'); // Redirect to meals page
                } else {
                    toast.error(`${response.data.error}`);
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error(`Error ${isEditing ? 'updating' : 'creating'} meal`);
            });
    }

    const isMealNo = mealData.mealStatus === 'No';

    return (
        <div className="content-center">
            <div className="sm:p-1 md:p-6 w-full max-w-md" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
            <h1 className="text-4xl font-bold text-center">{isEditing ? 'Edit My Meal' : 'Set My Meal'}</h1>

                <form onSubmit={handleSetMyMeal} className="card-body mt-3 mb-0 w-full max-w-md">
                    <div className="form-control">
                        <span className="label-text">Meal Status</span>
                        <select name='mealStatus' className="select select-bordered" onChange={handleChange} value={mealData.mealStatus} >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <span className="label-text">Select Date</span>
                        <input type="date" name="date" className="input input-bordered w-auto" required onChange={handleChange} value={mealData.date} readOnly={isEditing}/>
                    </div>
                    <div className="form-control">
                        <span className="label-text text-xl mt-3">Select at least 3 Items (includes rice) For meals</span>
                    </div>
                    <div className='p-5'>
                        <div className="form-control">
                            <span className="label-text">1. Rice Items</span>
                            <select name='riceItem' className="select select-bordered select-sm" onChange={handleChange} value={mealData.riceItem} disabled={isMealNo}>
                                <option value="">Select Rice Item</option>
                                {itemData?.filter(item => item.itemContain === "Starch").map((itm, index) => (
                                    <option key={index + 1} value={itm.itemName}>{itm.itemName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control mt-3">
                            <span className="label-text mb-2">2. Other Items</span>
                            {/* {itemData?.filter(item => item.itemContain !== "Starch").map((itm, index) => (
                                <label key={index + 1}>
                                    <input type="checkbox" name="items" value={`${itm.itemName}=${itm.itemContain}`} onChange={handleCheckboxChange} disabled={isMealNo} /> {itm.itemName} - ({itm.itemContain})
                                </label>
                            ))} */}
                            {itemData?.filter(item => item.itemContain !== "Starch").map((itm, index) => (
                                <label key={index + 1}>
                                    <input type="checkbox" name="items" value={`${itm.itemName}=${itm.itemContain}`} onChange={handleCheckboxChange} disabled={isMealNo} checked={mealData.items.includes(`${itm.itemName}=${itm.itemContain}`)} /> {itm.itemName} - ({itm.itemContain})
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="form-control w-auto">
                    <input className="btn btn-brand1 w-full mt-5" type="submit" value={isEditing ? "Update Meal" : "Add Meal"} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SetMyMeal;