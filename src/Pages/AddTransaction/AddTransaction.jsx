import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";

const AddTransaction = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();

    const [selectedType, setSelectedType] = useState("Income");

    const handleAddTransaction = async (e) => {
        e.preventDefault();
        const form = e.target;

        const newTransaction = {
            type: form.type.value,
            category: form.category.value,
            amount: parseFloat(form.amount.value),
            description: form.description.value,
            date: form.date.value,
            email: user?.email,
            userName: user?.displayName,
            created_at: new Date().toISOString(),
            status: "completed",
        };

        axiosSecure
            .post("/transactions", newTransaction)
            .then((data) => {
                if (data.data.insertedId) {
                    Swal.fire({
                        title: "Transaction Added Successfully!",
                        icon: "success",
                        confirmButtonColor: "#FCE252",
                    });
                }
                form.reset();
            })
            .catch((err) => {
                Swal.fire({
                    title: "Something went wrong!",
                    text: err.message,
                    icon: "error",
                    confirmButtonColor: "#FCE252",
                });
            });
    };

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

    return (
        <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:py-10 sm:px-6 md:px-8">
            <div className="w-full max-w-3xl bg-base-100 shadow-md rounded-2xl p-6 sm:p-8">
                <Link to="/">
                    <p className="text-sm sm:text-base text-neutral-500 hover:text-neutral-800 flex items-center mb-4">
                        ← Back to Home
                    </p>
                </Link>

                <h2 className="text-2xl sm:text-3xl md:text-3xl text-primary font-semibold text-center mb-6">
                    Add <span className="text-[#708238]">Transaction</span>
                </h2>

                <form onSubmit={handleAddTransaction} className="space-y-5">
                    {/* Type + Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm sm:text-base text-neutral-600">Type</label>
                            <select
                                name="type"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full mt-1 border rounded-lg px-3 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm sm:text-base text-neutral-600">Category</label>
                            <select
                                name="category"
                                className="w-full mt-1 border rounded-lg px-3 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="">Select Category</option>
                                {(selectedType === "Income" ? incomeCategories : expenseCategories).map(
                                    (cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>

                    {/* Amount + Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm sm:text-base text-neutral-600">Amount</label>
                            <input
                                type="number"
                                name="amount"
                                placeholder="Enter amount"
                                className="w-full mt-1 border rounded-lg px-3 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div>
                            <label className="text-sm sm:text-base text-neutral-600">Date</label>
                            <input
                                type="date"
                                name="date"
                                className="w-full mt-1 border rounded-lg px-3 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm sm:text-base text-neutral-600">Description</label>
                        <textarea
                            name="description"
                            rows="3"
                            placeholder="Enter short description"
                            className="w-full mt-1 border rounded-lg px-3 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        />
                    </div>

                    {/* User Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm sm:text-base text-neutral-600">User Email</label>
                            <input
                                type="email"
                                name="email"
                                readOnly
                                defaultValue={user?.email}
                                className="w-full mt-1 border rounded-lg px-3 py-2 sm:py-2.5 bg-base-300 cursor-not-allowed text-neutral-700"
                            />
                        </div>
                        <div>
                            <label className="text-sm sm:text-base text-neutral-600">User Name</label>
                            <input
                                type="text"
                                name="userName"
                                readOnly
                                defaultValue={user?.displayName}
                                className="w-full mt-1 border rounded-lg px-3 py-2 sm:py-2.5 bg-base-300 cursor-not-allowed text-neutral-700"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-semibold py-2.5 sm:py-3 rounded-lg hover:bg-neutral transition"
                    >
                        Add Transaction
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTransaction;
