import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import base_URL from './baseUrl';

const useAllUserInfo = () => {
    // use axios secure with react query
    const { data: usersData, isLoading: isUserDataLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get(`${base_URL}/all-user-info`);
            // console.log('is admin response', res);
            return res.data.data;
        }
    })
    return [usersData, isUserDataLoading, refetch]
};

export default useAllUserInfo;