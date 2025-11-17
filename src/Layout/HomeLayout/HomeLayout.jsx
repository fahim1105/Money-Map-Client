import React from 'react';
import Navbar from '../../Component/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Component/Footer/Footer';
import MoneyBG from '../../assets/money-bg.jpg';

const HomeLayout = () => {
    return (
        <div className="relative min-h-screen">

            {/* Background Layer */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat opacity-80 blur-[2px] scale-105"
                    style={{ backgroundImage: `url(${MoneyBG})` }}
                ></div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10">

                {/* Sticky Navbar */}
                <div className="sticky top-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
                    <Navbar />
                </div>

                {/* Page Content */}
                <div className="">
                    <Outlet />
                </div>

                {/* Footer */}
                <Footer />
            </div>

        </div>
    );
};

export default HomeLayout;
