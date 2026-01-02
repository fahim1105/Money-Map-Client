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
import TransactionDetails from '../Pages/TransactionDetails/TransactionDetails';
import AboutUs from '../Pages/AboutUs/AboutUs';
import Careers from '../Pages/Careers/Careers';
import Press from '../Pages/Press/Press';
import Systems from '../Pages/System/System';
import Documentation from '../Pages/Documentation/Documentation';
import DashboardLayout from '../Layout/DashboardLayout/DashboardLayout';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/add-transition",
                element: <PrivetRoute><AddTransaction></AddTransaction></PrivetRoute>
            },
            // {
            //     path: "/my-transition",
            //     element: <PrivetRoute><PersonalTransaction></PersonalTransaction></PrivetRoute>
            // },
            {
                path: "/transaction-details/:id",
                loader: ({ params }) => fetch(`https://money-map-server.vercel.app/transactions/${params.id}`),
                element: <PrivetRoute><TransactionDetails></TransactionDetails></PrivetRoute>
            },
            // {
            //     path: "/reports",
            //     element: <PrivetRoute><Reports></Reports></PrivetRoute>
            // },
            // {
            //     path: "/my-profile",
            //     element: <PrivetRoute><Profile></Profile></PrivetRoute>
            // },
            {
                path: "/about-us",
                Component: AboutUs
            },
            {
                path: "/careers",
                Component: Careers
            },
            {
                path: "/press",
                Component: Press
            },
            {
                path: "/system",
                Component: Systems
            },
            {
                path: "documentation",
                Component: Documentation
            }

        ]
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
    {
        path: 'dashboard',
        element: <PrivetRoute><DashboardLayout></DashboardLayout></PrivetRoute>,
        children: [
            {
                index:true,
                Component:Reports
            },
            {
                path:"my-transitions",
                Component:PersonalTransaction
            },
            {
                path:"my-profile",
                Component:Profile
            }

        ]
    }
]);