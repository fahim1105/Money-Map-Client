import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import TransactionCard from "./TransactionCard";
import { FaArrowLeft, FaArrowRight, FaMagnifyingGlass } from "react-icons/fa6";
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

    // Filters
    const [searchType, setSearchType] = useState("");
    const [filteredMonth, setFilteredMonth] = useState("");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const handleSelect = (e) => {
        const [field, dir] = e.target.value.split("-");
        setSort(field);
        setOrder(dir);
        setCurrentPage(0);
    };

    useEffect(() => {
        if (!user?.email) return;
        setLoading(true);
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
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [user, axiosSecure, currentPage, sort, order]);

    // Filtering logic
    const displayedTransactions = transactions.filter(t => {
        const matchesMonth = filteredMonth
            ? new Date(t.date).getMonth() + 1 === parseInt(filteredMonth)
            : true;

        const matchesType = searchType
            ? t.type.toLowerCase().includes(searchType.toLowerCase())
            : true;

        return matchesMonth && matchesType;
    });

    if (!user) return <Loader />;
    if (loading) return <Loader />;

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <div className="py-16">
                <h2 className="text-4xl font-bold text-center text-primary-content">
                    My Transactions
                </h2>
            </div>

            {/* Controls Layout */}
            <div className="w-11/12 mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-10">

                {/* Left Side: Count and Search Bar */}
                <div className="flex flex-col gap-3 w-full md:w-1/3">
                    <h2 className="text-lg font-bold text-primary-content">
                        Total Records: {totalTransaction}
                    </h2>
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="🔎  Search by Type (e.g. Expense)"
                            className="input input-bordered pl-10 bg-primary text-base-100 placeholder:text-base-100 w-full"
                            value={searchType}
                            onChange={(e) => {
                                setSearchType(e.target.value);
                                setCurrentPage(0);
                            }}
                        />
                    </div>
                </div>

                {/* Right Side: Sorting and Month Filter */}
                <div className="flex gap-3 flex-wrap w-full md:w-auto justify-start md:justify-end">
                    <select onChange={handleSelect} className="select bg-primary text-base-100 border-none">
                        <option value="date-desc">Newest First</option>
                        <option value="date-asc">Oldest First</option>
                        <option value="amount-desc">Amount: High → Low</option>
                        <option value="amount-asc">Amount: Low → High</option>
                    </select>

                    <select
                        value={filteredMonth}
                        onChange={(e) => {
                            setFilteredMonth(e.target.value);
                            setCurrentPage(0);
                        }}
                        className="select bg-primary text-base-100 border-none"
                    >
                        <option value="">All Months</option>
                        {months.map((m, idx) => (
                            <option key={idx} value={idx + 1}>{m}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Transactions Grid */}
            <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-10 gap-5">
                {displayedTransactions.length === 0 ? (
                    <div className="col-span-full text-center py-20">
                        <h2 className="text-3xl font-semibold opacity-30">
                            No matching transactions found
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
            {totalPage > 1 && (
                <div className="flex flex-wrap justify-center mb-7 gap-2">
                    <button
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="btn bg-primary border-none text-base-100 disabled:bg-gray-600"
                    >
                        <FaArrowLeft /> Prev
                    </button>

                    {Array.from({ length: totalPage }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={`btn border-none ${i === currentPage ? "bg-accent text-white" : "bg-primary text-base-100"}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage >= totalPage - 1}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="btn bg-primary border-none text-base-100 disabled:bg-gray-600"
                    >
                        Next <FaArrowRight />
                    </button>
                </div>
            )}
        </div>
    );
};

export default PersonalTransaction;