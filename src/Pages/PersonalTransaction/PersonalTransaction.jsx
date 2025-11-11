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
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }, [user, axiosSecure]);

    // 🔹 Transaction delete হলে state update করবে
    const handleDeleteFromState = (id) => {
        setTransactions((prev) => prev.filter((t) => t._id !== id));
    };

    if (loading) {
        return <Loader></Loader>;
    }

    if (!transactions.length) {
        return (
            <p className="text-center my-50 flex justify-center items-center text-4xl text-base-100">
                No transactions found.
            </p>
        );
    }

    return (
        <div className="h-screen">
            <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {transactions.map((transaction) => (
                    <TransactionCard
                        key={transaction._id}
                        transaction={transaction}
                        onDelete={handleDeleteFromState} // 👈 এখানে পাঠানো হলো
                    />
                ))}
            </div>
        </div>
    );
};

export default PersonalTransaction;
