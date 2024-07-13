import axios from 'axios';
import React from 'react';
import base_URL from './baseUrl';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const useAllSetMyMeal = () => {
    const { user, loading } = useSelector((state) => state.user);

    // use axios secure with react query
    const { data: setMyMenuData, isLoading: isSetMyMenuDataLoading, refetch } = useQuery({
        queryKey: ['my-meal'],
        queryFn: async () => {
            const res = await axios.get(`${base_URL}/all-set-my-menu`);
            console.log('Set my meal:', res.data.data);
            const resData = res.data.data;
            const filterByEmail = resData?.filter( data => data.email === user.email );
            return filterByEmail;
        }
    })
    return [setMyMenuData, isSetMyMenuDataLoading, refetch]
};

export default useAllSetMyMeal;