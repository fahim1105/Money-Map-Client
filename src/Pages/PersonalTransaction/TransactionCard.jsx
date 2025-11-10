import React from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import CardIMG from '../../assets/isaac-lind-G7tygfMolGk-unsplash.jpg'

const TransactionCard = ({ transaction, onDelete }) => {
    const navigate = useNavigate();

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
                axios
                    .delete(`http://localhost:5000/transactions/${transaction._id}`)
                    .then(() => {
                        Swal.fire("Deleted!", "Transaction deleted successfully.", "success");
                        toast.success("Transaction deleted successfully");
                        // ✅ UI instantly update (no reload)
                        onDelete(transaction._id);
                    })
                    .catch(() => {
                        toast.error("Failed to delete transaction");
                    });
            }
        });
    };

    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <p>
                <strong>Type:</strong>{" "}
                <span
                    className={
                        transaction.type === "income" ? "text-green-600" : "text-red-600"
                    }
                >
                    {transaction.type}
                </span>
            </p>
            <p>
                <strong>Category:</strong> {transaction.category}
            </p>
            <p>
                <strong>Amount:</strong> ${transaction.amount}
            </p>
            <p>
                <strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}
            </p>
            <div className="flex gap-2 mt-3">
                <button
                    onClick={() => navigate(`/transaction/update/${transaction._id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                    Update
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                    Delete
                </button>
                <button
                    onClick={() => navigate(`/transaction/${transaction._id}`)}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default TransactionCard;
