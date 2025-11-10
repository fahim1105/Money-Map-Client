import React from 'react';

import { createBrowserRouter } from "react-router";
import HomeLayout from '../Layout/HomeLayout/HomeLayout';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Home from '../Component/Home/Home';
import AuthLayout from '../Layout/AuthLayout/AuthLayout';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import AddTransaction from '../Pages/AddTransaction/AddTransaction';
import Reports from '../Pages/Reports/Reports';
import PrivetRoute from './PrivetRoutes';
import PersonalTransaction from '../Pages/PersonalTransaction/PersonalTransaction';
import Profile from '../Pages/Profile/Profile';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                Component: Home
            }

        ]
    },
    {
        path: "/add-transition",
        element: <PrivetRoute><AddTransaction></AddTransaction></PrivetRoute>
    },
    {
        path: "/my-transition",
        element: <PrivetRoute><PersonalTransaction></PersonalTransaction></PrivetRoute>
    },
    {
        path: "/reports",
        element: <PrivetRoute><Reports></Reports></PrivetRoute>
    },
    {
        path:"/my-profile",
        element:<PrivetRoute><Profile></Profile></PrivetRoute>
    },
    {
        path: "/auth",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "/auth/login",
                Component: Login
            },
            {
                path: "/auth/register",
                Component: Register
            }
        ]
    },
]);