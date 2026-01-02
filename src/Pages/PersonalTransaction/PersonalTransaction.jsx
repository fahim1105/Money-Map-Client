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

    // Pagination & Sorting
    const [totalTransaction, setTotalTransaction] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [sort, setSort] = useState("date");
    const [order, setOrder] = useState("desc");
    const limit = 12;

    // Month Filter
    const [filteredMonth, setFilteredMonth] = useState(""); // "" means all months
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const handleSelect = (e) => {
        const [field, dir] = e.target.value.split("-");
        setSort(field);
        setOrder(dir);
        setCurrentPage(0); // reset page on sort change
    };

    // Fetch transactions from backend
    useEffect(() => {
        if (!user?.email) return;
        setLoading(true);
        setTransactions([]);
        axiosSecure
            .get(
                `/transactions?email=${user.email}&limit=${limit}&skip=${currentPage * limit}&sort=${sort}&order=${order}`
            )
            .then((res) => {
                setTransactions(res.data.transactions);
                setTotalTransaction(res.data.total);
                setTotalPage(Math.ceil(res.data.total / limit));
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [user, axiosSecure, currentPage, sort, order]);

    if (!user) return <Loader />;
    if (loading) return <Loader />;

    if (!totalTransaction) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
                <h2 className="text-3xl font-bold text-base-100">No Transactions Found</h2>
            </div>
        );
    }

    // Filter transactions by month
    const displayedTransactions = filteredMonth
        ? transactions.filter(t => {
            if (!t.date) return false;
            return new Date(t.date).getMonth() + 1 === parseInt(filteredMonth);
        })
        : transactions;

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <div className="py-16">
                <h2 className="text-4xl font-bold text-center text-primary-content">
                    My Transactions
                </h2>
            </div>

            {/* Count + Sort + Month Filter */}
            <div className="w-11/12 mx-auto flex flex-col-reverse lg:flex-row gap-5 items-start justify-between lg:items-end mt-10">
                <div>
                    <h2 className="text-lg font-bold text-primary-content">
                        Total Transaction: {totalTransaction}
                    </h2>
                </div>

                <div className="flex gap-3 flex-wrap">
                    {/* Sort */}
                    <select onChange={handleSelect} className="select bg-primary text-base-100">
                        <option selected disabled>Sort by</option>
                        <option value="amount-desc">Amount: High → Low</option>
                        <option value="amount-asc">Amount: Low → High</option>
                        <option value="date-desc">Date: Newest First</option>
                        <option value="date-asc">Date: Oldest First</option>
                    </select>

                    {/* Month Filter */}
                    <select
                        value={filteredMonth}
                        onChange={(e) => setFilteredMonth(e.target.value)}
                        className="select bg-primary text-base-100"
                    >
                        <option value="">All Months</option>
                        {
                            months.map((m, idx) => (
                                <option key={idx} value={idx + 1}>{m}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

            {/* Transactions Grid */}
            <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-5">
                {displayedTransactions.length === 0 ? (
                    <div className="col-span-full text-center py-10 space-y-10">
                        <h2 className="text-5xl font-semibold opacity-50">
                            No Transactions Found
                        </h2>
                    </div>
                ) : (
                    displayedTransactions.map((transaction) => (
                        <TransactionCard
                            key={transaction._id}
                            transaction={transaction}
                            setTransactions={setTransactions}
                            transactions={transactions}
                            totalTransaction={totalTransaction}
                            setTotalTransaction={setTotalTransaction}
                        />
                    ))
                )}
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-center mb-7 gap-2">
                {currentPage > 0 && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="btn bg-primary border-neutral text-base-100"
                    >
                        <FaArrowLeft /> Prev
                    </button>
                )}

                {Array.from({ length: totalPage }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`btn ${i === currentPage ? "bg-accent" : " bg-base-100"}`}
                    >
                        {i + 1}
                    </button>
                ))}

                {currentPage < totalPage - 1 && (
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="btn bg-primary border-neutral text-base-100"
                    >
                        Next <FaArrowRight />
                    </button>
                )}
            </div>
        </div>
    );
};

export default PersonalTransaction;
