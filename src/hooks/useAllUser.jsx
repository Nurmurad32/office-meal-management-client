import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import base_URL from './baseUrl';

const useAllUser = (page, limit, searchQuery) => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['users', page, searchQuery],
        queryFn: async () => {
            const res = await axios.get(`${base_URL}/all-user`, {
                params: { page, limit, search: searchQuery }
            });
            return res.data;
        }
    });

    return {
        usersData: data?.data,
        isUserDataLoading: isLoading,
        refetch,
        totalPages: data?.totalPages,
        currentPage: data?.currentPage
    };
};

export default useAllUser;



