import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import Loader from '../Component/Loader/Loader';
import { AuthContext } from '../Provider/AuthContext/AuthContext';

const PrivetRoute = ({ children }) => {
    const { user, loading } = use(AuthContext)
    const location = useLocation()

    if (loading) {
        return <Loader />
    }

    if (user) {
        return children
    }
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>

}
export default PrivetRoute;