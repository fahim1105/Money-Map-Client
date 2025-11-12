import React, { useContext, useState } from 'react';
import NavImg from '../../assets/icons8-dollar-bag-96.png';
import UserIMG from '../../assets/icons8-user-50.png';
import { Link, NavLink } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Provider/AuthContext/AuthContext';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [showPopup, setShowPopup] = useState(false);

    const handleLogout = () => {
        signOutUser()
            .then(() => {
                toast.success("Logout Successful");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const Links = (
        <>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive
                        ? "font-bold  text-white  underline  "
                        : "font-semibold text-secondary transition"
                }
            >
                Home
            </NavLink>
            <NavLink
                to="/add-transition"
                className={({ isActive }) =>
                    isActive
                        ? "font-bold  text-white  underline "
                        : "font-semibold text-secondary transition"
                }
            >
                Add Transaction
            </NavLink>
            <NavLink
                to="/reports"
                className={({ isActive }) =>
                    isActive
                        ? "font-bold  text-white  underline "
                        : "font-semibold text-secondary transition"
                }
            >
                Reports
            </NavLink>

            {
                user &&
                <NavLink
                    to="/my-transition"
                    className={({ isActive }) =>
                        isActive
                            ? "font-bold  text-white  underline "
                            : "font-semibold text-secondary transition"
                    }
                >
                    My Transactions
                </NavLink>
            }
        </>
    );

    return (
        <nav className="navbar inset-0 bg-black/40 text-neutral shadow-sm border-b-2 border-black px-4 md:px-8 sticky top-0 z-50">
            {/* dark overlay */}
            {/* Left Section */}
            <div className="navbar-start flex items-center gap-3">
                {/* Mobile Menu */}
                <div className="dropdown lg:hidden">
                    <button tabIndex={0} role="button" className="btn btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-52 text-black space-y-2"
                    >
                        {Links}
                    </ul>
                </div>

                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-2">
                    <img
                        className="w-10 sm:w-12 hover:scale-110 transition-transform duration-300"
                        src={NavImg}
                        alt="Logo"
                    />
                    <span className="hidden sm:block font-bold text-lg text-secondary">
                        Money Map
                    </span>
                </NavLink>
            </div>

            {/* Center Links (Desktop) */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-8 text-sm xl:text-base">
                    {Links}
                </ul>
            </div>

            {/* Right Section */}
            <div className="navbar-end gap-3 relative">
                {/* User image with hover popup */}
                <div
                    className="relative"
                    onMouseEnter={() => setShowPopup(true)}
                    onMouseLeave={() => setShowPopup(false)}
                >
                    {
                        user &&
                        <Link to="/my-profile">
                            <img
                                className="w-8 sm:w-10 border-2 border-base-300 rounded-full hover:scale-105 transition-transform cursor-pointer"
                                src={user?.photoURL || UserIMG}
                                alt="User"
                            />
                        </Link>
                    }

                    {/* Popup */}
                    {showPopup && (
                        <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-white text-black p-3 rounded-xl shadow-lg border w-48 transition-all duration-200">
                            <div className="flex flex-col items-center gap-2">
                                <img
                                    src={user?.photoURL || UserIMG}
                                    alt="User"
                                    className="w-15 h-15 rounded-full border"
                                />
                                <p className="font-semibold text-center">
                                    {user?.displayName || "Guest User"}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                {/* Button section */}
                {user ? (
                    <button
                        onClick={handleLogout}

                        className="btn bg-[#A3B18A] text-black border-none px-5 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-primary hover:text-white transition-all text-sm sm:text-base"
                    >
                        Logout
                    </button>
                ) : (
                    <Link to="/auth/login">
                        <button

                            className="btn bg-[#A3B18A] text-black border-none px-5 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-primary hover:text-white transition-all text-sm sm:text-base">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
