// ReportsPage.jsx
import React, { useEffect, useState, useContext, useMemo } from "react";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    Bar,
    CartesianGrid,
} from "recharts";
import CountUp from "react-countup";
import { toast } from "react-hot-toast";

const Reports = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();

    const [transactions, setTransactions] = useState([]);
    const [filteredMonth, setFilteredMonth] = useState("");

    const COLORS = ["#60A5FA", "#34D399", "#FBBF24", "#F87171", "#C084FC", "#38BDF8", "#F43F5E"];

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    // Fetch transactions
    useEffect(() => {
        if (!user?.email) return;
        axiosSecure
            .get(`/transactions?email=${user.email}`)
            .then(res => setTransactions(res.data))
            .catch(() => toast.error("Failed to fetch transactions"));
    }, [user, axiosSecure]);

    // Filtered transactions by month
    const displayedTransactions = useMemo(() => {
        return transactions.filter(t => t.amount !== null && t.amount !== undefined).filter(t => {
            if (!filteredMonth) return true;
            if (!t.date) return false;
            const month = new Date(t.date).getMonth() + 1;
            return month === parseInt(filteredMonth);
        });
    }, [transactions, filteredMonth]);

    // Totals
    const incomeTotal = useMemo(
        () =>
            displayedTransactions
                .filter(t => t.type === "Income")
                .reduce((acc, t) => acc + Number(t.amount || 0), 0),
        [displayedTransactions]
    );

    const expenseTotal = useMemo(
        () =>
            displayedTransactions
                .filter(t => t.type === "Expense")
                .reduce((acc, t) => acc + Number(t.amount || 0), 0),
        [displayedTransactions]
    );

    // Pie chart data
    const pieData = useMemo(() => {
        const map = {};
        displayedTransactions.forEach(t => {
            const cat = t.category || "Uncategorized";
            if (!map[cat]) map[cat] = 0;
            map[cat] += Number(t.amount || 0);
        });
        return Object.keys(map).map(cat => ({ name: cat, value: map[cat] }));
    }, [displayedTransactions]);

    // Monthly data for bar chart
    const monthlyData = useMemo(() => {
        const data = months.map(m => ({ month: m, Income: 0, Expense: 0 }));
        displayedTransactions.forEach(t => {
            if (!t.date) return;
            const idx = new Date(t.date).getMonth();
            if (t.type === "Income") data[idx].Income += Number(t.amount || 0);
            else if (t.type === "Expense") data[idx].Expense += Number(t.amount || 0);
        });
        return data;
    }, [displayedTransactions, months]);

    return (
        <div className="min-h-screen px-6 py-10 flex flex-col items-center justify-start bg-transparent text-white">
            <div className="w-full max-w-6xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-4xl font-semibold text-center mb-10 tracking-wide">
                    Financial <span className="text-blue-400">Reports</span>
                </h2>

                {/* Month Filter */}
                <div className="mb-8 flex justify-center items-center gap-4">
                    <label className="text-base-300 font-medium">Filter by Month:</label>
                    <select
                        className="bg-transparent border border-white/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-400"
                        value={filteredMonth}
                        onChange={e => setFilteredMonth(e.target.value)}
                    >
                        <option value="">All Months</option>
                        {months.map((m, idx) => (
                            <option key={idx} value={idx + 1} className="text-black">
                                {m}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Summary Cards */}
                <div className="flex flex-col sm:flex-row justify-center gap-10 mb-12">
                    <div className="bg-white/10 border border-white/20 rounded-2xl px-10 py-6 shadow-lg text-center hover:scale-105 transition-transform duration-300">
                        <p className="text-base-300 text-sm mb-2">Total Income</p>
                        <p className="text-3xl font-bold text-green-400">
                            $<CountUp end={incomeTotal} duration={1.2} decimals={2} />
                        </p>
                    </div>
                    <div className="bg-white/10 border border-white/20 rounded-2xl px-10 py-6 shadow-lg text-center hover:scale-105 transition-transform duration-300">
                        <p className="text-base-300 text-sm mb-2">Total Expense</p>
                        <p className="text-3xl font-bold text-red-400">
                            $<CountUp end={expenseTotal} duration={1.2} decimals={2} />
                        </p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Pie Chart */}
                    <div className="bg-white/10 border border-white/20 rounded-2xl p-6 shadow-md backdrop-blur-xl">
                        <h3 className="text-xl font-semibold mb-4 text-center text-blue-500">Category Breakdown</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >
                                    {pieData.map((entry, idx) => (
                                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        background: "rgba(255, 255, 255, 0.5)",
                                        borderRadius: "10px",
                                        color: "#fff",
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-white/10 border border-white/20 rounded-2xl p-6 shadow-md backdrop-blur-xl">
                        <h3 className="text-xl font-semibold mb-4 text-center text-blue-500">Monthly Overview</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                                <XAxis dataKey="month" stroke="#ddd" />
                                <YAxis stroke="#ddd" />
                                <Tooltip
                                    contentStyle={{
                                        background: "rgba(0,0,0,0.7)",
                                        borderRadius: "10px",
                                        color: "#fff",
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="Income" fill="#34D399" />
                                <Bar dataKey="Expense" fill="#F87171" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
