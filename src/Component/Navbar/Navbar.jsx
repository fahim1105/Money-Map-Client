import React, { useContext, useState, useEffect } from 'react';
import NavImg from '../../assets/icons8-dollar-bag-96.png';
import UserIMG from '../../assets/icons8-user-50.png';
import { Link, NavLink } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Provider/AuthContext/AuthContext';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [showPopup, setShowPopup] = useState(false);

    // Theme toggle
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    );

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeToggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

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
                        ? "font-bold text-[#A3B18A] underline"
                        : "font-semibold text-[#A3B18A] transition"
                }
            >
                Home
            </NavLink>
            <NavLink
                to="/add-transition"
                className={({ isActive }) =>
                    isActive
                        ? "font-bold text-[#A3B18A] underline"
                        : "font-semibold text-[#A3B18A] transition"
                }
            >
                Add Transaction
            </NavLink>
            <NavLink
                to="/reports"
                className={({ isActive }) =>
                    isActive
                        ? "font-bold text-[#A3B18A] underline"
                        : "font-semibold text-[#A3B18A] transition"
                }
            >
                Reports
            </NavLink>
            {user && (
                <NavLink
                    to="/my-transition"
                    className={({ isActive }) =>
                        isActive
                            ? "font-bold text-[#A3B18A] underline"
                            : "font-semibold text-[#A3B18A] transition"
                    }
                >
                    My Transactions
                </NavLink>
            )}
        </>
    );

    return (
        <nav className="navbar inset-0 bg-black/40 text-neutral shadow-sm border-b-2 border-black px-4 md:px-8 ">
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
                    <span className="hidden sm:block font-bold text-lg text-[#A3B18A]">
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
            <div className="navbar-end gap-3 flex items-center">
                {/* Theme Toggle */}
                <label className="swap swap-rotate mr-2">
                    <input
                        type="checkbox"
                        checked={theme === 'dark'}
                        onChange={handleThemeToggle}
                    />
                    {/* Sun Icon */}
                    <svg
                        className="swap-off h-10 w-10 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>

                    {/* Moon Icon */}
                    <svg
                        className="swap-on h-10 w-10 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                </label>

                {/* User image with hover popup */}
                <div
                    className="relative"
                    onMouseEnter={() => setShowPopup(true)}
                    onMouseLeave={() => setShowPopup(false)}
                >
                    {user && (
                        <Link to="/my-profile">
                            <img
                                className="w-8 sm:w-10 border-2 border-[#A3B18A] rounded-full hover:scale-105 transition-transform cursor-pointer"
                                src={user?.photoURL || UserIMG}
                                alt="User"
                            />
                        </Link>
                    )}

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

                {/* Login/Logout Button */}
                {user ? (
                    <button
                        onClick={handleLogout}
                        className="btn bg-[#A3B18A] text-black border-none px-5 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-[#708238] hover:text-white transition-all text-sm sm:text-base"
                    >
                        Logout
                    </button>
                ) : (
                    <Link to="/auth/login">
                        <button className="btn bg-[#A3B18A] text-black border-none px-5 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-[#708238] hover:text-white transition-all text-sm sm:text-base">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
