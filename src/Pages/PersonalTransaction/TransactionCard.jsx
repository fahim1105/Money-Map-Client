import React, { useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { CiViewList } from "react-icons/ci";

const TransactionCard = ({ transaction, onUpdate, transactions, setTransactions, setTotalTransaction, totalTransaction }) => {
    const axiosSecure = UseAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState(transaction);

    const [formData, setFormData] = useState({
        type: transaction.type,
        category: transaction.category,
        amount: transaction.amount,
        description: transaction.description || "",
        date: transaction.date
            ? new Date(transaction.date).toISOString().split("T")[0]
            : "",
    });

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

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4f6900",
            cancelButtonColor: "#000000",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/transactions/${transaction._id}`)
                    .then(() => {
                        Swal.fire("Deleted!", "Transaction deleted successfully.", "success");
                        // onDelete(transaction._id);
                        const remainingTransaction = transactions.filter(trans => trans._id != transaction._id)
                        setTransactions(remainingTransaction)
                        setTotalTransaction(totalTransaction - 1)
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

    const handleUpdate = (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            type:
                formData.type.charAt(0).toUpperCase() +
                formData.type.slice(1).toLowerCase(),
        };

        axiosSecure
            .put(`/transactions/update/${transaction._id}`, formattedData)
            .then(() => {
                Swal.fire({
                    title: "Updated",
                    icon: "success",
                    draggable: true,
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

    const categories =
        formData.type.toLowerCase() === "income"
            ? incomeCategories
            : expenseCategories;

    const displayType =
        currentTransaction.type.charAt(0).toUpperCase() +
        currentTransaction.type.slice(1).toLowerCase();

    return (
        <>
            {/* Transaction Card */}
            <div className="relative border border-primary/50 rounded-2xl bg-base-300/20 backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-sm mx-auto">
                <div className="p-6 flex flex-col gap-3 text-primary-content">
                    <p className="text-lg flex flex-col sm:flex-row gap-1">
                        <strong className="text-primary w-24">Type:</strong>
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

                    <p className="text-lg flex flex-col sm:flex-row gap-1">
                        <strong className="text-primary w-24">Category:</strong>
                        <span className="truncate">{currentTransaction.category}</span>
                    </p>

                    <p className="text-lg flex flex-col sm:flex-row gap-1">
                        <strong className="text-primary w-24">Amount:</strong>
                        <span>${currentTransaction.amount}</span>
                    </p>

                    <p className="text-lg flex flex-col sm:flex-row gap-1">
                        <strong className="text-primary w-24">Date:</strong>
                        <span>
                            {currentTransaction.date
                                ? new Date(currentTransaction.date).toLocaleDateString()
                                : "N/A"}
                        </span>
                    </p>

                    {/* Buttons Section */}
                    <div className="flex gap-3 mt-5">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            data-tip="Edit"
                            className="bg-secondary/70 hover:bg-secondary text-primary-content text-xl rounded-lg transition btn btn-square tooltip before:bg-primary before:text-base-100"
                        >
                            <MdOutlineModeEdit />
                        </button>

                        <button
                            onClick={handleDelete}
                            data-tip="Delete"
                            className="bg-secondary/70 hover:bg-secondary text-primary-content text-xl rounded-lg transition btn btn-square tooltip before:bg-primary before:text-base-100"
                        >
                            <RiDeleteBin5Line />
                        </button>

                        <Link to={`/transaction-details/${transaction._id}`} className="flex-1 min-w-[100px]">
                            <button data-tip="View Details" className="bg-secondary/70 hover:bg-secondary text-primary-content text-xl rounded-lg transition btn btn-square tooltip before:bg-primary before:text-base-100">
                                <CiViewList />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Update Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-primary/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="bg-base-200 border border-secondary rounded-2xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative overflow-y-auto max-h-[90vh]">
                        <h2 className="text-2xl font-semibold text-base-100 mb-6 text-center">
                            Update Transaction
                        </h2>

                        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                            {/* Type */}
                            <div>
                                <label className="text-base-100 block mb-1">Type</label>
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
                                    className="w-full p-2 rounded-lg bg-secondary text-base-100 border border-neutral"
                                >
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="text-base-100 block mb-1">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData({ ...formData, category: e.target.value })
                                    }
                                    className="w-full p-2 rounded-lg bg-secondary text-base-100 border border-neutral"
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
                                <label className="text-base-100 block mb-1">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={(e) =>
                                        setFormData({ ...formData, amount: e.target.value })
                                    }
                                    className="w-full p-2 rounded-lg bg-secondary text-base-100 border border-neutral"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-base-100 block mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    className="w-full p-2 rounded-lg bg-secondary text-base-100 border border-neutral"
                                    rows="2"
                                ></textarea>
                            </div>

                            {/* Date */}
                            <div>
                                <label className="text-base-100 block mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={(e) =>
                                        setFormData({ ...formData, date: e.target.value })
                                    }
                                    className="w-full p-2 rounded-lg bg-secondary text-base-100 border border-neutral"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-neutral/70 hover:bg-neutral text-base-100 px-4 py-2 rounded-lg w-full sm:w-auto"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-secondary/70 hover:bg-secondary text-primary-content px-4 py-2 rounded-lg w-full sm:w-auto"
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
