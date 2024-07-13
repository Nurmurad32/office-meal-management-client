import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import base_URL from './baseUrl';

const useAllItem = () => {
    // use axios secure with react query
    const { data: itemData, isLoading: isItemDataLoading, refetch } = useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const res = await axios.get(`${base_URL}/all-item`);
            // console.log('is admin response', res);
            return res.data.data;
        }
    })
    return [itemData, isItemDataLoading, refetch]
};

export default useAllItem;