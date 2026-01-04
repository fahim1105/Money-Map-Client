import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthContext/AuthContext';
import UseAxiosSecure from './UseAxiosSecure/UseAxiosSecure';



const UseRole = () => {
    const { user } = use(AuthContext);
    const axiosSecure = UseAxiosSecure();

    const { isLoading: roleLoading, data: role = 'student' } = useQuery({
        queryKey: ['user-role', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`)
            console.log("In the use role", res.data)
            return res.data?.role ;
        }
    })
    return { role, roleLoading };
};

export default UseRole;