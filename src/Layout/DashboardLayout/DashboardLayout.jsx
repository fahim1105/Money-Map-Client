import React, { useState, useEffect, use } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import {
    Users,
    BookOpen,
    UserCircle,
    CreditCard,
    Home,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Sun,
    Moon,
    Menu,
    Settings
} from 'lucide-react';
import UseRole from '../../Hooks/UseRole';
import DashboardIMG from '../../assets/IMG_1319.jpeg'
import { AuthContext } from '../../Provider/AuthContext/AuthContext';
import toast from 'react-hot-toast';

const DashboardLayout = () => {
    const { signOutUser } = use(AuthContext)
    const { role } = UseRole();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const handleLogout = () => {
        signOutUser()
            .then(() => {
                toast.success("Logout Successful", {
                    iconTheme: {
                        primary: '#4f6900',
                        secondary: '#000',
                    }
                });
            })
            .catch((err) => console.log(err));
    };

    // Group 1: User Routes
    const userLinks = [
        { to: "/", icon: <Home size={20} />, label: "Home Page" },
        { to: "/dashboard/my-transitions", icon: <CreditCard size={20} />, label: "Transactions" },
        { to: "/dashboard/my-profile", icon: <UserCircle size={20} />, label: "My Profile" },
    ];

    // Group 2: Admin Routes
    const adminLinks = [
        { to: "/dashboard/manage-users", icon: <Users size={20} />, label: "Manage Users" },
        { to: "/dashboard/manage-blogs", icon: <BookOpen size={20} />, label: "Manage Blogs" },
    ];

    return (
        <div className="drawer lg:drawer-open min-h-screen bg-base-100">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col bg-base-200/40">
                {/* Navbar */}
                <header className="navbar sticky top-0 z-30 bg-base-100 border-b border-base-300 px-6">
                    <div className="flex-1">
                        <label htmlFor="my-drawer-4" className="lg:hidden btn btn-ghost btn-square mr-2">
                            <Menu size={24} />
                        </label>
                        <span className="text-xl font-bold tracking-tight">Money <span className="text-primary">Map</span></span>
                    </div>

                    <button onClick={toggleTheme} className="btn btn-ghost btn-circle bg-base-200">
                        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </header>

                <main className="p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>

            <div className="drawer-side z-40">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

                <aside className={`flex flex-col h-full bg-base-100 border-r border-base-300 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'}`}>

                    {/* Sidebar Brand */}
                    <div className="h-16 flex items-center px-6 border-b border-base-300">
                        <div
                            className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <img src={DashboardIMG} className='rounded border-2 border-primary-content' alt="" />
                        </div>
                        {!isCollapsed && <span className="ml-3 font-bold text-lg uppercase tracking-widest">Dashboard</span>}
                    </div>

                    <div className="flex-1 overflow-y-auto py-4 px-3 space-y-8">
                        {/* Section 1: General */}
                        <div>
                            {!isCollapsed && <p className="px-4 text-xs font-semibold text-base-content/50 uppercase mb-4 tracking-wider">General</p>}
                            <ul className="space-y-1">
                                {userLinks.map((link) => (
                                    <li key={link.to}>
                                        <NavLink to={link.to} className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-primary text-base-100 font-semibold' : 'hover:bg-base-200 text-base-content/80'}`}>
                                            <span className="shrink-0">{link.icon}</span>
                                            {!isCollapsed && <span>{link.label}</span>}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Section 2: Admin Only */}
                        {role === "admin" && (
                            <div>
                                {!isCollapsed && <p className="px-4 text-xs font-semibold text-base-content/50 uppercase mb-4 tracking-wider">Management</p>}
                                <ul className="space-y-1">
                                    {adminLinks.map((link) => (
                                        <li key={link.to}>
                                            <NavLink to={link.to} className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-secondary text-base-100 font-semibold' : 'hover:bg-base-200 text-base-content/80'}`}>
                                                <span className="shrink-0">{link.icon}</span>
                                                {!isCollapsed && <span>{link.label}</span>}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Bottom Footer Section */}
                    <div className="p-3 border-t border-base-300 space-y-1 bg-base-200/20">
                        {/* Collapse Button */}
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="hidden lg:flex w-full items-center gap-4 px-4 py-3 rounded-xl hover:bg-base-300 transition-colors text-base-content/60"
                        >
                            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                            {!isCollapsed && <span className="text-sm font-medium">Collapse Sidebar</span>}
                        </button>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-error hover:bg-error/10 transition-colors"
                        >
                            <LogOut size={20} />
                            {!isCollapsed && <span className="text-sm font-bold">Sign Out</span>}
                        </button>
                    </div>

                </aside>
            </div>
        </div>
    );
};

export default DashboardLayout;