import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import base_URL from './baseUrl';

const useAllUserMeals = ({ requestedDate }) => {
    const { data: userMealData, isLoading: isUserMealDataLoading, refetch } = useQuery({
        queryKey: ['user-meal', requestedDate],
        queryFn: async () => {
            const res = await axios.get(`${base_URL}/all-set-my-menu`);
            // console.log('Set my meal:', res.data.data);
            const resData = res.data.data;
            // Ensure both dates are in the same format (yyyy-MM-dd)
            const filterByDate = resData?.filter(meal => {
                const mealDate = new Date(meal.date).toISOString().split('T')[0];
                return mealDate === requestedDate;
            });
            return filterByDate;
        }
    });
    return [userMealData, isUserMealDataLoading, refetch];
};

export default useAllUserMeals;
