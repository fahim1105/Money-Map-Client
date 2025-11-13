import React, { useEffect, useState, useContext } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { AuthContext } from "../../../Provider/AuthContext/AuthContext";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import OverviewLoader from "../../OverviewLoader/OverviewLoader";

const OverviewSection = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const [overview, setOverview] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/overview?email=${user.email}`)
                .then((res) => {
                    setOverview(res.data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [user, axiosSecure]);

    if (loading) {
        return <OverviewLoader></OverviewLoader>;
    }

    const { totalIncome, totalExpense, balance } = overview;

    const cardMotion = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="relative overflow-hidden px-4 py-10 pb-15 bg-transparent">
            {/* Glowing background orbs */}
            <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-green-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-56 h-56 sm:w-72 sm:h-72 bg-blue-500/10 rounded-full blur-3xl"></div>

            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white/90 mb-8 text-center tracking-wide"
            >
                Financial Overview
            </motion.h2>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">

                {/* 1️⃣ Income */}
                <motion.div
                    variants={cardMotion}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-2xl border border-green-400/30 bg-green-400/10 shadow-xl flex flex-col items-center"
                >
                    <p className="text-green-300 text-base sm:text-lg mb-1">Total Income</p>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-green-400">
                        $
                        <CountUp end={totalIncome} duration={2} separator="," decimals={2} />
                    </h3>
                </motion.div>

                {/* 2️⃣ Expenses */}
                <motion.div
                    variants={cardMotion}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-2xl border border-red-400/30 bg-red-400/10 shadow-xl flex flex-col items-center"
                >
                    <p className="text-red-300 text-base sm:text-lg mb-1">Total Expenses</p>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-red-400">
                        $
                        <CountUp end={totalExpense} duration={2} separator="," decimals={2} />
                    </h3>
                </motion.div>

                {/* 3️⃣ Total Balance */}
                <motion.div
                    variants={cardMotion}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-2xl border border-gray-400/30 bg-gray-400/10 shadow-xl flex flex-col items-center"
                >
                    <p className="text-gray-300 text-base sm:text-lg mb-1">Total Balance</p>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                        $
                        <CountUp end={balance} duration={2} separator="," decimals={2} />
                    </h3>
                </motion.div>

            </div>
        </div>
    );
};

export default OverviewSection;
