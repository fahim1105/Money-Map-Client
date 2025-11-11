import React from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";


const TransactionCard = ({ transaction, onDelete }) => {
    const navigate = useNavigate();
    const axiosSecure = UseAxiosSecure();

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
                        toast.error("Failed to delete transaction");
                    });
            }
        });
    };

    return (
        <div className="relative border-2 border-primary rounded-xl bg-black/50 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 w-full max-w-md mx-auto">
            <div className="p-6 text-neutral flex flex-col gap-3">
                <p className="text-lg">
                    <strong className="text-secondary">Type:</strong>{" "}
                    <span
                        className={
                            transaction.type === "income" ? "text-red-500" : "text-green-500"
                        }
                    >
                        {transaction.type}
                    </span>
                </p>
                <p className="text-lg text-white">
                    <strong className="text-secondary">Category:</strong> {transaction.category}
                </p>
                <p className="text-lg text-white">
                    <strong className="text-secondary">Amount:</strong> ${transaction.amount}
                </p>
                <p className="text-lg text-white">
                    <strong className="text-secondary">Date:</strong> {new Date(transaction.date).toLocaleDateString()}
                </p>

                <div className="flex gap-3 mt-4">
                    <button
                        onClick={() => navigate(`/transaction/update/${transaction._id}`)}
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
                        <button
                            // onClick={() => navigate(`/transaction/${transaction._id}`)}
                            className="bg-gray-500/90 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition"
                        >
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TransactionCard;
