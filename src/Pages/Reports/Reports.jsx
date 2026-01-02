import React, { useEffect, useState, useContext, useMemo } from "react";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    BarChart, XAxis, YAxis, Legend, Bar, CartesianGrid,
} from "recharts";
import CountUp from "react-countup";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import Loader from "../../Component/Loader/Loader";

const Reports = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();

    const [transactions, setTransactions] = useState([]);
    const [filteredMonth, setFilteredMonth] = useState("");
    const [loading, setLoading] = useState(true);

    const COLORS = ["#60A5FA", "#34D399", "#FBBF24", "#F87171", "#C084FC", "#38BDF8", "#F43F5E"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Fetch Data
    useEffect(() => {
        if (!user?.email) return;

        setLoading(true);

        axiosSecure
            .get(`/transactions?email=${user.email}`)
            .then((res) => {
                setTransactions(res.data?.transactions || []);
            })
            .catch(() => toast.error("Failed to fetch transactions"))
            .finally(() => setLoading(false));

    }, [user?.email, axiosSecure]); // axiosSecure not required in deps

    // Filtered transactions
    const displayedTransactions = useMemo(() => {
        if (!Array.isArray(transactions)) return [];

        return transactions
            .filter((t) => t.amount)
            .filter((t) => {
                if (!filteredMonth) return true;
                if (!t.date) return false;
                return new Date(t.date).getMonth() + 1 === parseInt(filteredMonth);
            });
    }, [transactions, filteredMonth]);

    // Income Total
    const incomeTotal = useMemo(
        () => displayedTransactions
            .filter((t) => t.type === "Income")
            .reduce((acc, t) => acc + Number(t.amount || 0), 0),
        [displayedTransactions]
    );

    // Expense Total
    const expenseTotal = useMemo(
        () => displayedTransactions
            .filter((t) => t.type === "Expense")
            .reduce((acc, t) => acc + Number(t.amount || 0), 0),
        [displayedTransactions]
    );

    // Pie Chart Data
    const pieData = useMemo(() => {
        const map = {};

        displayedTransactions.forEach((t) => {
            const cat = t.category || "Uncategorized";
            map[cat] = (map[cat] || 0) + Number(t.amount || 0);
        });

        return Object.entries(map).map(([name, value]) => ({ name, value }));
    }, [displayedTransactions]);

    // Monthly Bar Chart Data
    const monthlyData = useMemo(() => {
        const data = months.map((m) => ({ month: m, Income: 0, Expense: 0 }));

        displayedTransactions.forEach((t) => {
            if (!t.date) return;
            const idx = new Date(t.date).getMonth();

            if (t.type === "Income") data[idx].Income += Number(t.amount || 0);
            else if (t.type === "Expense") data[idx].Expense += Number(t.amount || 0);
        });

        return data;
    }, [displayedTransactions]);

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-transparent px-6 py-10 flex flex-col items-center">
            <div className="relative w-full max-w-7xl bg-base-100/5 backdrop-blur-2xl rounded-3xl border border-base-200/10 shadow-2xl p-10 overflow-hidden">

                <div className="absolute -top-32 -left-32 w-72 h-72 bg-blue-500/25 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

                <h2 className="text-4xl md:text-5xl text-primary-content font-extrabold text-center mb-12 tracking-tight">
                    Financial Reports
                </h2>

                {/* Month Filter */}
                <div className="mb-10 flex flex-wrap justify-center items-center gap-4">
                    <label className="text-primary-content font-medium">Filter by Month:</label>
                    <select
                        className="bg-primary-content/10 border border-primary-content/20 rounded-xl px-4 py-2 text-sm text-primary-content hover:bg-primary-content/20 transition"
                        value={filteredMonth}
                        onChange={(e) => setFilteredMonth(e.target.value)}
                    >
                        <option value="">All Months</option>
                        {months.map((m, idx) => (
                            <option key={idx} value={idx + 1} className="text-base-100">
                                {m}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Summary Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
                    {[
                        { label: "Total Income", value: incomeTotal, color: "text-emerald-400" },
                        { label: "Total Expense", value: expenseTotal, color: "text-rose-400" },
                        { label: "Net Balance", value: incomeTotal - expenseTotal, color: "text-blue-400" },
                        { label: "Active Categories", value: pieData.length, color: "text-amber-400" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="bg-primary-content/10 p-6 rounded-2xl border border-primary-content/20 text-center shadow-lg hover:bg-primary-content/15 transition"
                        >
                            <p className="text-sm text-primary-content mb-2">{item.label}</p>
                            <h2 className={`text-3xl font-bold ${item.color}`}>
                                <CountUp end={item.value || 0} duration={1.5} separator="," decimals={2} />
                            </h2>
                        </motion.div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-10 mb-12">
                    {/* Pie Chart */}
                    <div className="bg-primary-content/10 border border-primary-content/20 rounded-2xl p-6 shadow-md backdrop-blur-xl">
                        <h3 className="text-lg font-semibold mb-4 text-center text-blue-400">
                            Category Breakdown
                        </h3>

                        {pieData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                        {pieData.map((entry, idx) => (
                                            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ background: "rgba(0,0,0,0.6)", borderRadius: "10px", color: "#fff" }} />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-center text-gray-400 mt-12">No category data available</p>
                        )}
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-white/10 border border-primary-content/20 rounded-2xl p-6 shadow-md backdrop-blur-xl">
                        <h3 className="text-lg font-semibold mb-4 text-center text-blue-400">
                            Monthly Overview
                        </h3>

                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                <XAxis dataKey="month" stroke="#ccc" />
                                <YAxis stroke="#ccc" />
                                <Tooltip contentStyle={{ background: "rgba(0,0,0,0.7)", borderRadius: "10px", color: "#fff" }} />
                                <Legend />
                                <Bar dataKey="Income" fill="#34D399" radius={[6, 6, 0, 0]} />
                                <Bar dataKey="Expense" fill="#F87171" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Insights */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-primary-content/20 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold mb-3 text-primary-content">Insights</h3>

                    <ul className="text-primary-content space-y-2 text-sm list-disc list-inside">
                        <li>You {incomeTotal > expenseTotal ? "saved money" : "spent more than you earned"} this period 💰</li>
                        <li>Active categories: {pieData.length} 📊</li>
                        <li>Total transactions analyzed: {displayedTransactions.length} 🧾</li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Reports;
