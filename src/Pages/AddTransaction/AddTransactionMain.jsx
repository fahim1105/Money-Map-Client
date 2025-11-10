import React, { useContext } from "react";
import Swal from "sweetalert2";

import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";

const AddTransactionMain = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    const form = e.target;

    const type = form.type.value;
    const category = form.category.value;
    const amount = form.amount.value;
    const description = form.description.value;
    const date = form.date.value;
    const email = user?.email;
    const userName = user?.displayName;

    const newTransaction = {
      type,
      category,
      amount: parseFloat(amount),
      description,
      date,
      email,
      userName,
      created_at: new Date().toISOString(),
      status: "completed",
    };
    console.log(newTransaction)

    // try {
    //   const { data } = await axiosSecure.post("/transactions", newTransaction);
    //   if (data?.data?.insertedId) {
    //     Swal.fire({
    //       title: "Transaction Added Successfully!",
    //       icon: "success",
    //       confirmButtonColor: "#FCE252",
    //     });
    //     form.reset();
    //   }
    // } 
    // catch (error) {
    //   console.error(error);
    //   Swal.fire({
    //     title: "Something went wrong!",
    //     text: error.message,
    //     icon: "error",
    //     confirmButtonColor: "#FCE252",
    //   });
    // }
    axiosSecure.post("/transactions", newTransaction)
      .then(data => {
        console.log(data)
        if (data.data.insertedId) {
          Swal.fire({
            title: "Transaction Added Successfully!",
            icon: "success",
            confirmButtonColor: "#FCE252",
          });
        }
        form.reset()
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          title: "Something went wrong!",
          text: err.message,
          icon: "error",
          confirmButtonColor: "#FCE252",
        });
      })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-8">
        <Link to="/dashboard">
          <p className="text-sm text-gray-500 hover:text-black flex items-center mb-4">
            ← Back to Dashboard
          </p>
        </Link>

        <h2 className="text-3xl font-semibold text-center mb-6">
          Add <span className="text-yellow-500">Transaction</span>
        </h2>

        <form onSubmit={handleAddTransaction} className="space-y-5">
          {/* Type + Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Type</label>
              <select
                name="type"
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600">Category</label>
              <select
                name="category"
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Select Category</option>
                <option value="Salary">Salary</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Amount + Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Amount</label>
              <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Date</label>
              <input
                type="date"
                name="date"
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Enter short description"
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
            />
          </div>

          {/* User Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">User Email</label>
              <input
                type="email"
                name="email"
                readOnly
                defaultValue={user?.email}
                className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">User Name</label>
              <input
                type="text"
                name="userName"
                readOnly
                defaultValue={user?.displayName}
                className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-white font-semibold py-2 rounded-lg hover:bg-yellow-500 transition"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionMain;
