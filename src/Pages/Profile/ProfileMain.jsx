import React, { useContext, useEffect, useState } from "react";
import { FaUserCircle, FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const ProfileMain = () => {
    const { user, UpdatedUser, setUser } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(user?.displayName || "");
    const [newPhoto, setNewPhoto] = useState(user?.photoURL || "");

    useEffect(() => {
        AOS.init({ duration: 700, once: true, easing: "ease-out-cubic" });
    }, []);

    // Close modal on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setIsEditing(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        UpdatedUser({ displayName: newName, photoURL: newPhoto })
            .then(() => {
                setUser({ ...user, displayName: newName, photoURL: newPhoto });
                toast.success("Profile updated successfully!");
                setIsEditing(false);
            })
            .catch((error) => {
                toast.error("Failed to update profile!");
                console.error(error);
            });
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Unavailable";
        const date = new Date(dateString);
        return date.toLocaleString("en-BD", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const copyEmail = () => {
        try {
            navigator.clipboard.writeText(user?.email || "");
            toast.success("Email copied!");
        } catch {
            toast.error("Failed to copy email");
        }
    };

    return (
        <div className="min-h-screen w-full bg-neutral/20 text-white px-6 md:px-16 py-16 flex flex-col gap-10">
            {/* Back Button */}
            <div className="flex justify-between items-center">
                <button
                    onClick={() => window.history.back()}
                    className="w-fit text-sm text-black hover:text-white px-6 py-2 rounded-full bg-secondary hover:bg-primary transition-all"
                >
                    ← Back
                </button>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                {/* LEFT: Profile Image */}
                <motion.div
                    data-aos="fade-right"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="col-span-12 md:col-span-5 flex justify-center md:justify-start"
                >
                    <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_80px_-30px_rgba(179,0,255,0.25)]">
                        {/* Decorative gradient overlay */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute -left-16 -top-16 w-[180px] h-[180px] rounded-full bg-gradient-to-tr from-purple-600/30 to-pink-400/20 blur-3xl transform rotate-12" />
                        </div>

                        {/* Profile Image */}
                        <img
                            src={user?.photoURL || "https://i.ibb.co/Fz9v0Zr/default.jpg"}
                            alt={user?.displayName || "profile"}
                            className="w-full h-[420px] object-cover"
                        />

                        {/* Overlay info */}
                        <div className="absolute left-4 bottom-4 bg-black/20 backdrop-blur rounded-lg p-3 flex flex-col gap-2 border border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                    <FaUserCircle className="text-2xl opacity-80" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{user?.displayName || "User Name"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-xs opacity-80">
                                <motion.span
                                    className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-green-500/20 text-green-300"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    ● Active
                                </motion.span>
                                <span className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-blue-400/10">
                                    <FaCheckCircle /> Verified
                                </span>
                            </div>
                        </div>

                        {/* Floating actions */}
                        <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 rounded-full bg-neutral hover:bg-primary text-sm shadow-md"
                                aria-label="Edit profile"
                            >
                                Edit
                            </button>
                            <button
                                onClick={copyEmail}
                                className="px-3 py-1 rounded-full bg-neutral hover:bg-primary text-xs"
                                title="Copy email"
                            >
                                Copy Email
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* RIGHT: Info Sections */}
                <motion.div
                    data-aos="fade-left"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="col-span-12 md:col-span-7"
                >
                    <div className="space-y-6 md:px-6">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                                    {user?.displayName || "User Name"}
                                </h1>
                                
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Contact */}
                            <div className="p-6 rounded-2xl bg-black/30 border border-white/6">
                                <h3 className="text-lg font-medium mb-3">Contact</h3>
                                <div className="flex items-center gap-3 text-sm opacity-80">
                                    <FaUserCircle />
                                    <div>
                                        <div className="font-medium">{user?.email || "No email"}</div>
                                        <div className="text-xs opacity-70">Primary contact</div>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center gap-3 text-sm opacity-80">
                                    <FaMapMarkerAlt />
                                    <div>
                                        <div className="font-medium">Dhaka, Bangladesh</div>
                                        <div className="text-xs opacity-70">Timezone: GMT+6</div>
                                    </div>
                                </div>
                            </div>

                            {/* Account */}
                            <div className="p-6 rounded-2xl bg-black/30 border border-white/6">
                                <h3 className="text-lg font-medium mb-3">Account</h3>
                                <p className="text-sm opacity-80">
                                    Last Login: <span className="font-medium">{formatDate(user?.metadata?.lastSignInTime)}</span>
                                </p>
                                <p className="text-sm opacity-80 mt-2">
                                    Created: <span className="font-medium">{formatDate(user?.metadata?.creationTime)}</span>
                                </p>

                                <div className="mt-4 flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-white/6 flex items-center justify-center">A</div>
                                    <div>
                                        <div className="text-sm font-medium">Account health</div>
                                        <div className="text-xs opacity-70">Good — no issues found</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About / Bio */}
                        <div className="p-6 rounded-2xl bg-black/30 border border-white/8">
                            <h3 className="text-lg font-medium mb-3">About</h3>
                            <p className="text-sm opacity-80 leading-relaxed">
                                {user?.displayName
                                    ? `I’m ${user.displayName}, passionate about finance and money management. I enjoy tracking expenses, analyzing budgets, and finding smart ways to grow and manage money..`
                                    : "No bio provided yet. Add a short bio to tell people about yourself."}
                            </p>
                        </div>

                        {/* Membership info */}
                        <div className="text-lg font-bold opacity-70">
                            Member since <span className="font-medium">{formatDate(user?.metadata?.creationTime)}</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
                    <form
                        onSubmit={handleUpdate}
                        className="bg-[#0f1724] p-8 rounded-2xl w-full max-w-md space-y-6 border border-white/10"
                    >
                        <h2 className="text-xl font-semibold">Edit Profile</h2>

                        <input
                            type="text"
                            placeholder="New Name"
                            className="w-full px-4 py-3 rounded-lg bg-white/6 border border-white/20"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="New Photo URL"
                            className="w-full px-4 py-3 rounded-lg bg-white/6 border border-white/20"
                            value={newPhoto}
                            onChange={(e) => setNewPhoto(e.target.value)}
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-5 py-2 bg-white/10 rounded-lg hover:bg-white/20"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:opacity-90"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProfileMain;
