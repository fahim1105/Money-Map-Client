import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaEnvelope, FaCalendarAlt, FaCheckCircle, FaEdit, FaSave, FaTimes, FaCamera } from "react-icons/fa";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { use, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";
import Loader from "../../Component/Loader/Loader";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

const UserProfile = () => {
    const axiosSecure = UseAxiosSecure();
    const { user, UpdatedUser } = use(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [uploading, setUploading] = useState(false);

    const { register, handleSubmit, reset, watch } = useForm();
    const photoFile = watch("photo");

    const { data: profile = {}, isLoading, refetch } = useQuery({
        queryKey: ["user-profile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get("/users/me");
            return res.data;
        }
    });

    const onSubmit = async (data) => {
        setUploading(true);
        const toastId = toast.loading("Updating profile...");
        try {
            let photoURL = profile.photoURL;

            // 1. Handle Image Upload if new file selected
            if (data.photo && data.photo[0]) {
                const formData = new FormData();
                formData.append("image", data.photo[0]);
                const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_Host_Key}`, formData);
                photoURL = imgRes.data.data.url;
            }

            // 2. Update Firebase Auth
            await UpdatedUser({ displayName: data.displayName, photoURL });

            // 3. Update MongoDB
            const updatedInfo = {
                displayName: data.displayName,
                photoURL: photoURL
            };
            await axiosSecure.patch("/users/update-me", updatedInfo);

            toast.success("Profile updated successfully!", { id: toastId });
            setIsEditing(false);
            refetch();
        } catch (error) {
            console.log(error)
            toast.error("Failed to update profile", { id: toastId });
        } finally {
            setUploading(false);
        }
    };

    if (isLoading) return <Loader />;

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-6 lg:p-10">
            <div className="max-w-5xl mx-auto mb-10 flex justify-between items-end">
                <div className="text-left">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-neutral tracking-tight">
                        Account <span className="text-primary">Overview</span>
                    </h2>
                    <p className="text-base-100 mt-2 text-sm md:text-base">Manage your profile information.</p>
                </div>
                {!isEditing ? (
                    <button
                        onClick={() => { setIsEditing(true); reset({ displayName: profile.displayName }); }}
                        className="btn btn-secondary text-primary-content btn-md rounded-2xl shadow-lg gap-2"
                    >
                        <FaEdit /> Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button onClick={() => setIsEditing(false)} className="btn btn-ghost btn-md rounded-2xl">
                            <FaTimes /> Cancel
                        </button>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Side: Profile Card */}
                <div className="lg:col-span-4 bg-base-100 shadow-xl rounded-[2rem] p-6 md:p-8 flex flex-col items-center text-center border border-base-300">
                    <div className="relative group">
                        <div className={`avatar ${profile.status === 'Active' ? 'online' : ''}`}>
                            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 overflow-hidden">
                                <img
                                    src={photoFile?.[0] ? URL.createObjectURL(photoFile[0]) : (profile.photoURL || "https://i.ibb.co/XF0Ym8p/user.png")}
                                    alt="Profile"
                                />
                            </div>
                        </div>
                        {isEditing && (
                            <label htmlFor="photo-upload" className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                <FaCamera className="text-white text-2xl" />
                                <input id="photo-upload" type="file" {...register("photo")} className="hidden" accept="image/*" />
                            </label>
                        )}
                    </div>

                    {isEditing ? (
                        <div className="mt-6 w-full">
                            <label className="label text-xs font-bold text-gray-400">DISPLAY NAME</label>
                            <input
                                {...register("displayName")}
                                className="input input-bordered w-full text-center font-bold"
                                defaultValue={profile.displayName}
                            />
                        </div>
                    ) : (
                        <>
                            <h3 className="mt-6 text-2xl font-bold text-neutral">{profile.displayName}</h3>
                            <div className="mt-2 badge badge-primary badge-outline font-bold uppercase px-4 py-3 text-xs italic">
                                {profile.role}
                            </div>
                        </>
                    )}

                    <div className="divider my-6 w-full"></div>

                    {isEditing && (
                        <button
                            disabled={uploading}
                            type="submit"
                            className="btn btn-primary w-full rounded-2xl shadow-md gap-2"
                        >
                            <FaSave /> {uploading ? "Saving..." : "Save Changes"}
                        </button>
                    )}
                </div>

                {/* Right Side: Details */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-base-100 shadow-xl rounded-[2rem] p-6 md:p-8 border border-base-300">
                        <h4 className="text-xl font-bold mb-8 flex items-center gap-3 text-neutral">
                            <span className="p-2 bg-primary/10 rounded-lg"><FaUserShield className="text-primary" /></span>
                            Account Information
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {/* Email (Read Only) */}
                            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-2xl border border-transparent opacity-80">
                                <div className="hidden sm:flex p-3 bg-white rounded-xl shadow-sm text-primary shrink-0">
                                    <FaEnvelope size={18} />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Email Address</p>
                                    <p className="font-bold text-neutral text-sm md:text-base break-all">{profile.email}</p>
                                </div>
                            </div>

                            {/* Status (Read Only) */}
                            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-2xl border border-transparent">
                                <div className="hidden sm:flex p-3 bg-white rounded-xl shadow-sm text-green-500 shrink-0">
                                    <FaCheckCircle size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Account Status</p>
                                    <p className="font-bold text-neutral text-sm md:text-base uppercase flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        {profile.status || "Active"}
                                    </p>
                                </div>
                            </div>

                            {/* Member Since (Read Only) */}
                            <div className="md:col-span-2 flex items-center gap-4 p-4 bg-base-200 rounded-2xl border border-transparent">
                                <div className="hidden sm:flex p-3 bg-white rounded-xl shadow-sm text-orange-400 shrink-0">
                                    <FaCalendarAlt size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Member Since</p>
                                    <p className="font-bold text-neutral text-sm md:text-base">
                                        {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : "Not Available"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UserProfile;