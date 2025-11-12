import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { FaArrowLeft, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
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

                    const filtered = data.filter(
                        (t) =>
                            t.category?.toLowerCase() === category?.toLowerCase() &&
                            t.amount != null
                    );

                    const total = filtered.reduce((sum, t) => sum + Number(t.amount), 0);
                    setTotalCategoryAmount(total);
                })
                .catch((err) =>
                    console.error("Error fetching category total:", err)
                );
        }
    }, [category, email, axiosSecure]);

    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center py-10 px-4">
            <div className="w-full max-w-3xl bg-base-100 shadow-lg rounded-2xl p-8 relative">
                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-6 top-6 text-sm text-gray-500 hover:text-gray-800 flex items-center gap-2"
                >
                    <FaArrowLeft /> Back
                </button>

                {/* Title */}
                <h2 className="text-3xl font-semibold text-center mb-6 text-neutral-800">
                    Transaction <span className="text-primary">Details</span>
                </h2>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <p className="flex items-center gap-2">
                            <FaMoneyBill className="text-green-600" />
                            <strong>Type:</strong>{" "}
                            <span
                                className={`${type === "Income" ? "text-green-600" : "text-red-500"
                                    } font-medium`}
                            >
                                {type}
                            </span>
                        </p>

                        <p className="flex items-center gap-2">
                            <MdCategory className="text-yellow-600" />
                            <strong>Category:</strong>{" "}
                            {category || <span className="text-gray-400">Not specified</span>}
                        </p>

                        <p className="flex items-center gap-2">
                            <FaMoneyBill className="text-blue-500" />
                            <strong>Amount:</strong>{" "}
                            {amount ? `$${amount}` : "No amount entered"}
                        </p>

                        <p className="flex items-center gap-2">
                            <FaRegCalendarDays className="text-purple-500" />
                            <strong>Date:</strong>{" "}
                            {date
                                ? new Date(date).toLocaleDateString()
                                : "No date provided"}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <p className="flex items-center gap-2">
                            <FaUser className="text-orange-500" />
                            <strong>User:</strong> {userName}
                        </p>

                        <p>
                            <strong>Email:</strong> {email}
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            <span
                                className={
                                    status === "completed"
                                        ? "text-green-600"
                                        : "text-red-600"
                                }
                            >
                                {status}
                            </span>
                        </p>

                        <p>
                            <strong>Description:</strong>{" "}
                            {description || "No description provided"}
                        </p>
                    </div>
                </div>

                {/* ✅ Total Category Amount */}
                <div className="mt-8 bg-base-200 rounded-xl p-4 text-center border border-base-300">
                    <p className="text-lg font-semibold text-neutral-700">
                        Total amount in this category:{" "}
                        <span className="text-primary font-bold">
                            ${totalCategoryAmount.toFixed(2)}
                        </span>
                    </p>
                </div>

                {/* Footer info */}
                <div className="mt-6 border-t pt-4 text-sm text-gray-500 text-center">
                    <p>Transaction ID: {transactionId}</p>
                    <p>
                        Created at: {new Date(created_at).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetails;
