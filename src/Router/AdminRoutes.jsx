import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthContext/AuthContext';
import UseRole from '../Hooks/UseRole';
import Loader from '../Component/Loader/Loader';
import ForbiddenPage from '../Pages/Forbidden/Forbidden';

const AdminRoutes = ({ children }) => {
    const { loading } = use(AuthContext);
    const { role, roleLoading } = UseRole();

    if (loading || roleLoading) {
        return <Loader></Loader>
    }
    if (role !== 'admin') {
        return <ForbiddenPage></ForbiddenPage>
    }
    return children;
};

export default AdminRoutes;