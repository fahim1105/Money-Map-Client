import React, { useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";

const TransactionCard = ({ transaction, onDelete, onUpdate }) => {
    const axiosSecure = UseAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [currentTransaction, setCurrentTransaction] = useState(transaction);

    const [formData, setFormData] = useState({
        type: transaction.type,
        category: transaction.category,
        amount: transaction.amount,
        description: transaction.description || "",
        date: transaction.date ? new Date(transaction.date).toISOString().split("T")[0] : "",
    });

    // Category lists
    const incomeCategories = ["Salary", "Bonus", "Freelance"];
    const expenseCategories = [
        "Home",
        "Food",
        "Transport",
        "Health",
        "Personal",
        "Education",
        "Entertainment",
        "Shopping",
        "Rent",
        "Other",
    ];

    // Delete handler
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/transactions/${transaction._id}`)
                    .then(() => {
                        Swal.fire("Deleted!", "Transaction deleted successfully.", "success");
                        onDelete(transaction._id);
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",
                        });
                    });
            }
        });
    };

    // Update handler
    const handleUpdate = (e) => {
        e.preventDefault();

        // Normalize type to capitalized before sending
        const formattedData = {
            ...formData,
            type:
                formData.type.charAt(0).toUpperCase() + formData.type.slice(1).toLowerCase(),
        };

        axiosSecure
            .put(`/transactions/update/${transaction._id}`, formattedData)
            .then(() => {
                Swal.fire({
                    title: "Updated",
                    icon: "success",
                    draggable: true
                });
                setIsModalOpen(false);

                const updated = { ...currentTransaction, ...formattedData };
                setCurrentTransaction(updated);
                if (onUpdate) onUpdate(updated);
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            });
    };

    // Get relevant categories dynamically
    const categories =
        formData.type.toLowerCase() === "income"
            ? incomeCategories
            : expenseCategories;

    // Capitalize for display consistency
    const displayType =
        currentTransaction.type.charAt(0).toUpperCase() +
        currentTransaction.type.slice(1).toLowerCase();

    return (
        <>
            {/* Transaction Card */}
            <div className="relative border-2 border-primary rounded-xl bg-black/50 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 w-full max-w-md mx-auto">
                <div className="p-6 text-neutral flex flex-col gap-3">
                    <p className="text-lg">
                        <strong className="text-secondary">Type:</strong>{" "}
                        <span
                            className={
                                displayType === "Income"
                                    ? "text-green-500 font-semibold"
                                    : "text-red-500 font-semibold"
                            }
                        >
                            {displayType}
                        </span>
                    </p>
                    <p className="text-lg text-white">
                        <strong className="text-secondary">Category:</strong>{" "}
                        {currentTransaction.category}
                    </p>
                    <p className="text-lg text-white">
                        <strong className="text-secondary">Amount:</strong> $
                        {currentTransaction.amount}
                    </p>
                    <p className="text-lg text-white">
                        <strong className="text-secondary">Date:</strong>{" "}
                        {currentTransaction.date
                            ? new Date(currentTransaction.date).toLocaleDateString()
                            : "N/A"}
                    </p>

                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-500/90 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition"
                        >
                            Update
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500/90 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
                        >
                            Delete
                        </button>
                        <Link to={`/transaction-details/${transaction._id}`}>
                            <button className="bg-gray-500/90 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition">
                                View Details
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Update Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-lg shadow-2xl relative">
                        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                            Update Transaction
                        </h2>
                        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                            {/* Type */}
                            <div>
                                <label className="text-white block mb-1">Type</label>
                                <select
                                    name="type"
                                    value={formData.type.toLowerCase()}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            type: e.target.value,
                                            category: "",
                                        })
                                    }
                                    className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                                >
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>

                            {/* Category Dropdown */}
                            <div>
                                <label className="text-white block mb-1">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            category: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Amount */}
                            <div>
                                <label className="text-white block mb-1">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            amount: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-white block mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                                    rows="2"
                                ></textarea>
                            </div>

                            {/* Date */}
                            <div>
                                <label className="text-white block mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            date: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default TransactionCard;
