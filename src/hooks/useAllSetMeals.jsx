import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import base_URL from './baseUrl';

const useAllSetMeals = () => {
    // use axios secure with react query
    const { data: setMenuData, isLoading: isSetMenuDataLoading, refetch } = useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const res = await axios.get(`${base_URL}/all-set-menu`);
            // console.log('is admin response', res);
            return res.data.data;
        }
    })
    return [setMenuData, isSetMenuDataLoading, refetch]
};

export default useAllSetMeals;