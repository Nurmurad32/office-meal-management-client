import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axios from 'axios';

const useAdmin = () => {
    const { user, loading } = useSelector((state) => state.user);
    // use axios secure with react query
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axios.get(`/users/admin/${user?.email}`);
            // console.log('is admin response', res);
            return res.data.admin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;
