import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { FaArrowLeft, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdCategory, MdDescription } from "react-icons/md";
import { FaRegCalendarDays } from "react-icons/fa6";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";

const TransactionDetails = () => {
    const detailsData = useLoaderData();
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();
    const {
        _id: transactionId,
        type,
        category,
        amount,
        description,
        date,
        email,
        userName,
        created_at,
        status,
    } = detailsData;

    const [totalCategoryAmount, setTotalCategoryAmount] = useState(0);

    // Fetch total amount for this category for the same user
    useEffect(() => {
        if (email) {
            // ✅ If category is not provided, total should be 0
            if (!category) {
                setTotalCategoryAmount(0);
                return;
            }

            axiosSecure
                .get(`/transactions?email=${email}`)
                .then((res) => {
                    const data = res.data;

                    const filtered = data.filter((t) => t.category?.toLowerCase() === category?.toLowerCase() && t.amount != null);

                    const total = filtered.reduce((sum, t) => sum + Number(t.amount), 0);
                    setTotalCategoryAmount(total);
                })
                .catch((err) =>
                    console.error("Error fetching category total:", err)
                );
        }
    }, [category, email, axiosSecure]);

    return (
        <div className="min-h-screen bg-transparent flex items-center justify-center px-4 py-10">
            <div className="relative w-full max-w-5xl bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-10 overflow-hidden animate-fadeIn">
                {/* Gradient lighting effect */}
                <div className="absolute -top-32 -right-32 w-72 h-72 bg-blue-500/25 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-6 top-6 text-gray-300 hover:text-white flex items-center gap-2 text-sm transition-colors"
                >
                    <FaArrowLeft /> Back
                </button>

                {/* Header */}
                <h2 className="text-5xl font-extrabold text-center tracking-tight drop-shadow-lg mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                    Transaction <span className="text-white">Details</span>
                </h2>

                {/* Main Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Side - Transaction Info */}
                    <div className="md:col-span-2 bg-white/10 rounded-2xl p-8 border border-white/20 shadow-lg space-y-6 hover:bg-white/15 transition-all duration-500">
                        <div className="grid sm:grid-cols-2 gap-6">
                            {/* Type */}
                            <div className="bg-gradient-to-r from-emerald-400/10 to-emerald-600/20 rounded-xl p-4 flex flex-col">
                                <span className="text-sm text-neutral flex items-center gap-2">
                                    <FaMoneyBill className="text-emerald-400" /> Type
                                </span>
                                <span
                                    className={`text-xl font-semibold ${type === "Income" ? "text-emerald-400" : "text-rose-400"
                                        }`}
                                >
                                    {type}
                                </span>
                            </div>

                            {/* Category */}
                            <div className="bg-gradient-to-r from-amber-400/10 to-amber-600/20 rounded-xl p-4 flex flex-col">
                                <span className="text-sm text-neutral flex items-center gap-2">
                                    <MdCategory className="text-amber-400" /> Category
                                </span>
                                <span className="text-xl font-semibold text-gray-200">
                                    {category || "Not specified"}
                                </span>
                            </div>

                            {/* Amount */}
                            <div className="bg-gradient-to-r from-blue-400/10 to-blue-600/20 rounded-xl p-4 flex flex-col">
                                <span className="text-sm text-neutral flex items-center gap-2">
                                    <FaMoneyBill className="text-blue-400" /> Amount
                                </span>
                                <span className="text-2xl font-bold text-white">
                                    {amount ? `$${amount}` : "No amount"}
                                </span>
                            </div>

                            {/* Date */}
                            <div className="bg-gradient-to-r from-fuchsia-400/10 to-fuchsia-600/20 rounded-xl p-4 flex flex-col">
                                <span className="text-sm text-neutral flex items-center gap-2">
                                    <FaRegCalendarDays className="text-fuchsia-400" /> Date
                                </span>
                                <span className="text-xl font-semibold text-gray-200">
                                    {date ? new Date(date).toLocaleDateString() : "N/A"}
                                </span>
                            </div>
                        </div>

                        {/* User Info & Status */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            {/* User */}
                            <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                                <p className="text-sm text-neutral flex items-center gap-2">
                                    <FaUser className="text-orange-400" /> User
                                </p>
                                <p className="text-lg text-base-200 font-medium">{userName}</p>
                                <p className="text-sm text-neutral mt-1">{email}</p>
                            </div>

                            {/* Status */}
                            <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-300 flex flex-col justify-center items-center">
                                <p className="text-sm text-neutral mb-1">Status</p>
                                <p
                                    className={`px-4 py-1 rounded-full text-sm font-semibold tracking-wide ${status === "completed"
                                            ? "bg-green-500/10 text-green-400 border border-green-400/30"
                                            : "bg-rose-500/10 text-rose-400 border border-rose-400/30"
                                        }`}
                                >
                                    {status}
                                </p>
                            </div>
                        </div>

                        {/* Description (Full Width) */}
                        <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-300 mt-4 sm:col-span-2">
                            <p className="text-sm text-neutral mb-2 flex items-center gap-2">
                                 <MdDescription className="text-sky-400"/> Description
                            </p>
                            <p className="text-base text-base-300 leading-relaxed">
                                {description || "No description provided"}
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Highlight Card */}
                    <div className="bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-2xl p-8 text-center border border-white/20 shadow-xl flex flex-col justify-center items-center relative overflow-hidden hover:bg-white/10 transition-all duration-500">
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl"></div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-semibold text-base-200 mb-2">
                                Total in this Category
                            </h3>
                            <p className="text-5xl font-extrabold text-blue-400 drop-shadow-sm">
                                ${totalCategoryAmount.toFixed(2)}
                            </p>

                            <div className="mt-6 text-xs text-neutral space-y-1">
                                <p>
                                    Transaction ID:{" "}
                                    <span className="text-base-300">{transactionId}</span>
                                </p>
                                <p>
                                    Created at:{" "}
                                    <span className="text-base-300">
                                        {new Date(created_at).toLocaleString()}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default TransactionDetails;
