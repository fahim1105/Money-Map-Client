import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import TransactionCard from "./TransactionCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Loader from "../../Component/Loader/Loader";

const PersonalTransaction = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);


    // New
    const [totalTransaction, setTotalTransaction] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const [sort, setSort] = useState("date");
    const [order, setOrder] = useState("desc");

    const limit = 12;

    const handleSelect = (e) => {
        const [field, dir] = e.target.value.split("-");
        setSort(field);
        setOrder(dir);
        setCurrentPage(0); // reset page on sort change
    };

    useEffect(() => {
        if (!user?.email) return;
        setLoading(true)
        setTransactions([]);
        axiosSecure
            .get(
                `/transactions?email=${user.email}&limit=${limit}&skip=${currentPage * limit}&sort=${sort}&order=${order}`
            )
            .then((res) => {
                // assuming res.data has { transactions: [], total: number } >>> from DB
                setTransactions(res.data.transactions);
                setTotalTransaction(res.data.total);
                setTotalPage(Math.ceil(res.data.total / limit));
                setLoading(false)
            })
            .catch((err) => console.log(err));
    }, [user, axiosSecure, currentPage, sort, order]);

    if (!user) return <Loader />;

    if (loading) {
        return <Loader></Loader>
    }

    if (!totalTransaction) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
                <h2 className="text-3xl font-bold text-gray-300">No Transactions Found</h2>
            </div>
        );
    }


    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <div className="py-16">
                <h2 className="text-4xl font-bold text-center text-gray-100">
                    My Transactions
                </h2>
            </div>

            {/* Count + Sort */}
            <div className="w-11/12 mx-auto flex flex-col-reverse lg:flex-row gap-5 items-start justify-between lg:items-end mt-10">
                <div>
                    <h2 className="text-lg font-bold text-gray-300">
                        Total Transaction: {totalTransaction}
                    </h2>
                </div>

                <div>
                    <select onChange={handleSelect} className="select bg-[#708238] text-neutral">
                        <option selected disabled>
                            Sort by
                        </option>
                        <option value="amount-desc">Amount: High → Low</option>
                        <option value="amount-asc">Amount: Low → High</option>
                        <option value="date-desc">Date: Newest First</option>
                        <option value="date-asc">Date: Oldest First</option>
                    </select>
                </div>
            </div>

            {/* Transactions Grid */}
            <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-5">
                {transactions.length === 0 ? (
                    <div className="col-span-full text-center py-10 space-y-10">
                        <h2 className="text-5xl font-semibold opacity-50">
                            No Transactions Found
                        </h2>
                    </div>
                ) : (
                    transactions.map((transaction) => (
                        <TransactionCard
                            key={transaction._id}
                            transaction={transaction}
                            setTransactions={setTransactions}
                            transactions={transactions}
                            totalTransaction={totalTransaction}
                            setTotalTransaction={setTotalTransaction} />
                    ))
                )}
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-center mb-7 gap-2">
                {currentPage > 0 && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="btn bg-[#A3B18A] border-neutral"
                    >
                        <FaArrowLeft /> Prev
                    </button>
                )}

                {Array.from({ length: totalPage }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`btn ${i === currentPage ? "bg-[#D4A373]" : ""}`}
                    >
                        {i + 1}
                    </button>
                ))}

                {currentPage < totalPage - 1 && (
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="btn bg-[#A3B18A] border-neutral"
                    >
                        Next <FaArrowRight />
                    </button>
                )}
            </div>
        </div>
    );
};

export default PersonalTransaction;
