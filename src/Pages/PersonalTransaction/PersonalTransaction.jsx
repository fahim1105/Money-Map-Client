import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import TransactionCard from "./TransactionCard";
import Loader from "../../Component/Loader/Loader";

const PersonalTransaction = () => {
    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = UseAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/transactions?email=${user.email}`)
                .then((res) => {
                    setTransactions(res.data);
                })
                .catch((err) => console.log(err))
                .finally(() => setLoading(false));
        }
    }, [user, axiosSecure]);

    const handleDeleteFromState = (id) => {
        setTransactions((prev) => prev.filter((t) => t._id !== id));
    };

    if (loading) return <Loader />;

    if (!transactions.length) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 dark:text-gray-100 mb-4">
                    My Transactions
                </h2>
                <p className="text-lg md:text-xl text-gray-400">
                    No transactions found yet.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent px-4 sm:px-6 md:px-10 lg:px-16 py-10 flex flex-col items-center">
            {/* Page Title */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-100 mb-10">
                My Transactions
            </h2>

            {/* Grid Section */}
            <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
                {transactions.map((transaction) => (
                    <TransactionCard
                        key={transaction._id}
                        transaction={transaction}
                        onDelete={handleDeleteFromState}
                    />
                ))}
            </div>
        </div>
    );
};

export default PersonalTransaction;
