import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import { Sun, Moon, Menu, X } from "lucide-react";
import NavImg from "../../assets/IMG_1319.jpeg";
import UserIMG from "../../assets/icons8-user-50.png";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const [mobileMenu, setMobileMenu] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        toast.success("Logout Successful");
        setMobileMenu(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Link styling with better contrast for Light Mode
  const linkClasses = ({ isActive }) =>
    isActive
      ? "text-primary font-bold tracking-wide relative after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-primary after:rounded-full transition-all duration-300"
      : "text-neutral/80 hover:text-primary transition-colors duration-300 font-semibold tracking-wide";

  // Desktop Links
  const DesktopLinks = (
    <>
      <NavLink to="/" className={linkClasses}>Home</NavLink>
      <NavLink to="/add-transition" className={linkClasses}>Add Transaction</NavLink>
      <NavLink to="/reports" className={linkClasses}>Reports</NavLink>
      {user && (
        <NavLink to="/my-transition" className={linkClasses}>My Transactions</NavLink>
      )}
    </>
  );

  return (
    <>
      {/* Navbar Component */}
      <nav
        className="
        sticky top-0 z-40 
        bg-base-100/40 backdrop-blur-md 
        border-b border-base-300
        px-6 md:px-12 py-3
        flex items-center justify-between
        shadow-sm
      "
      >
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden text-neutral hover:text-primary transition p-1"
            onClick={() => setMobileMenu(true)}
          >
            <Menu size={28} />
          </button>

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src={NavImg}
                alt="logo"
                className="w-10 h-10 md:w-11 md:h-11 rounded-xl border border-base-300 shadow-sm group-hover:scale-105 transition-transform duration-300 object-cover"
              />
              <div className="absolute inset-0 rounded-xl shadow-inner pointer-events-none"></div>
            </div>
            <span className="text-neutral font-black text-xl tracking-tight">
              Money <span className="text-primary">Map</span>
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-sm">
          {DesktopLinks}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Theme Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-base-100 border border-base-300 hover:border-primary/50 transition-all shadow-sm"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-neutral" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-600" />
            )}
          </motion.button>

          {/* User Profile */}
          {user && (
            <Link to="/my-profile" className="hidden sm:block">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={user.photoURL || UserIMG}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-primary shadow-sm cursor-pointer object-cover"
              />
            </Link>
          )}

          {/* Auth Button */}
          <div className="hidden lg:block">
            {user ? (
              <button 
                onClick={handleLogout} 
                className="btn btn-primary text-base-100 min-h-0 h-10 px-6 rounded-xl  font-bold border-none shadow-md hover:brightness-95 transition-all"
              >
                Logout
              </button>
            ) : (
              <Link to="/auth/login">
                <button className="btn btn-primary text-base-100 min-h-0 h-10 px-6 rounded-xl  font-bold border-none shadow-md hover:brightness-95 transition-all">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenu && (
          <div className="relative z-[999]">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenu(false)}
              className="fixed inset-0 bg-neutral/60 backdrop-blur-sm z-[998]"
            />

            {/* Side Menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 w-72 h-screen bg-base-100 border-r border-base-300 p-6 z-[999] flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-base-300">
                <div className="flex items-center gap-3">
                   <img src={NavImg} className="w-9 h-9 rounded-lg" alt="logo" />
                   <span className="text-xl font-bold text-neutral">Money <span className="text-primary">Map</span></span>
                </div>
                <button
                  onClick={() => setMobileMenu(false)}
                  className="p-2 hover:bg-base-200 rounded-full transition text-neutral"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col space-y-6">
                {/* Reusing DesktopLinks but they will stack vertically due to flex-col */}
                <NavLink to="/" onClick={() => setMobileMenu(false)} className={linkClasses}>Home</NavLink>
                <NavLink to="/add-transition" onClick={() => setMobileMenu(false)} className={linkClasses}>Add Transaction</NavLink>
                <NavLink to="/reports" onClick={() => setMobileMenu(false)} className={linkClasses}>Reports</NavLink>
                {user && (
                  <NavLink to="/my-transition" onClick={() => setMobileMenu(false)} className={linkClasses}>My Transactions</NavLink>
                )}
              </div>

              <div className="mt-auto border-t border-base-300 pt-6">
                {user ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 p-2 bg-base-200 rounded-lg">
                        <img src={user.photoURL || UserIMG} className="w-10 h-10 rounded-full border border-primary" />
                        <p className="text-sm font-bold text-neutral truncate">{user.displayName || "User"}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="btn btn-primary w-full rounded-xl text-primary-content border-none"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/auth/login" onClick={() => setMobileMenu(false)}>
                    <button className="btn btn-primary w-full rounded-xl text-primary-content border-none">
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;