import React from 'react';
import Navbar from '../../Component/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Component/Footer/Footer';
import MoneyBG from '../../assets/money-bg.jpg';

const HomeLayout = () => {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background image with blur */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 blur-xs scale-105"
                style={{ backgroundImage: `url(${MoneyBG})` }}
            ></div>

            {/*Dark overlay*/}
            <div className="absolute inset-0 bg-black/30"></div>

            <div className="relative z-10">
                <section>
                    <Navbar />
                </section>
                <section>
                    <Outlet />
                </section>
                <section>
                    <Footer />
                </section>
            </div>
        </div>
    );
};

export default HomeLayout;
