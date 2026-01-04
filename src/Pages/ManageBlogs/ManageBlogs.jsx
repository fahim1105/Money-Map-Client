import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import {
    FaTrashAlt,
    FaPlusCircle,
    FaLayerGroup,
    FaImage,
    FaHeading,
    FaPenNib,
    FaEdit,
    FaTimesCircle,
    FaCheckCircle
} from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa6';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure/UseAxiosSecure';
import Loader from '../../Component/Loader/Loader';

const ManageBlogs = () => {
    const axiosSecure = UseAxiosSecure();
    const [editingId, setEditingId] = useState(null);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    // --- FETCH BLOGS ---
    const { data: blogs = [], isLoading, refetch } = useQuery({
        queryKey: ['manage-blogs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/blogs');
            return res.data;
        }
    });

    // --- POPULATE FORM FOR EDIT ---
    const handleEditClick = (blog) => {
        setEditingId(blog._id);
        setValue("title", blog.title);
        setValue("category", blog.category);
        setValue("image", blog.image);
        setValue("description", blog.description);

        // Smooth scroll to the top form
        window.scrollTo({ top: 0, behavior: 'smooth' });
        toast("Editing Mode Active", { icon: '📝' });
    };

    // --- CANCEL EDIT MODE ---
    const cancelEdit = () => {
        setEditingId(null);
        reset();
    };

    // --- CREATE OR UPDATE HANDLER ---
    const onSubmit = async (data) => {
        const loadingToast = toast.loading(editingId ? "Updating..." : "Publishing...");
        try {
            if (editingId) {
                // PATCH Request for Update
                const res = await axiosSecure.patch(`/blogs/${editingId}`, data);
                if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                    toast.success("Blog Updated Successfully!", { id: loadingToast });
                    setEditingId(null);
                }
            } else {
                // POST Request for New Blog
                const res = await axiosSecure.post('/blogs', data);
                if (res.data.insertedId) {
                    toast.success("Blog Published Successfully!", { id: loadingToast });
                }
            }
            reset();
            refetch();
        } catch (error) {
            toast.error("Operation failed. Try again.", { id: loadingToast });
        }
    };

    // --- DELETE HANDLER ---
    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete this article?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f87171",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, Delete It",
            background: 'var(--fallback-b1, #fff)',
            color: 'var(--fallback-bc, #000)',
            customClass: { popup: 'rounded-[2rem]' }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/blogs/${id}`);
                    if (res.data.deletedCount > 0) {
                        toast.success("Blog Deleted");
                        refetch();
                    }
                } catch (error) {
                    toast.error("Failed to delete");
                }
            }
        });
    };

    if (isLoading) return <Loader />;

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* --- EDITOR SECTION (CREATE/UPDATE) --- */}
            <section className={`relative overflow-hidden bg-base-100 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border-2 transition-all duration-500 ${editingId ? 'border-primary/40 ring-4 ring-primary/5' : 'border-base-300'}`}>

                {/* Visual Glow for Edit Mode */}
                {editingId && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary animate-pulse"></div>
                )}

                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-neutral">
                                {editingId ? "Refine your" : "Create"} <span className="text-primary italic">{editingId ? "Masterpiece" : "Magic"}</span>
                            </h2>
                            <p className="text-gray-500 font-medium mt-1">
                                {editingId ? "Adjusting the details of your existing article." : "Share your financial wisdom with the world."}
                            </p>
                        </div>
                        <div className="hidden md:block">
                            {editingId ? <FaEdit className="text-6xl text-primary/20 animate-bounce" /> : <FaPlusCircle className="text-6xl text-primary/10 rotate-12" />}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold ml-1 text-gray-400">
                                    <FaHeading className="text-primary" /> BLOG TITLE
                                </label>
                                <input
                                    type="text"
                                    {...register("title", { required: "Title is required" })}
                                    placeholder="Enter a captivating headline..."
                                    className="w-full px-5 py-4 bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/50 transition-all font-semibold text-neutral"
                                />
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold ml-1 text-gray-400">
                                    <FaLayerGroup className="text-primary" /> CATEGORY
                                </label>
                                <div className="relative">
                                    <select
                                        {...register("category", { required: true })}
                                        className="w-full px-5 py-4 bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/50 font-semibold appearance-none pr-12 text-neutral">
                                        <option value="Savings">Savings</option>
                                        <option value="Investment">Investment</option>
                                        <option value="Budgeting">Budgeting</option>
                                        <option value="Crypto">Crypto</option>
                                    </select>
                                    <FaChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-base-100 pointer-events-none" />
                                </div>
                            </div>

                            {/* Cover Image */}
                            <div className="lg:col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold ml-1 text-gray-400">
                                    <FaImage className="text-primary" /> COVER IMAGE URL
                                </label>
                                <input
                                    type="text"
                                    {...register("image", { required: "Image URL is required" })}
                                    placeholder="https://images.unsplash.com/photo..."
                                    className="w-full px-5 py-4 bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/50 transition-all font-medium text-neutral"
                                />
                            </div>

                            {/* Content Textarea */}
                            <div className="lg:col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold ml-1 text-gray-400">
                                    <FaPenNib className="text-primary" /> BLOG CONTENT
                                </label>
                                <textarea
                                    {...register("description", { required: "Content is required" })}
                                    className="w-full px-5 py-4 bg-base-200 border-none rounded-3xl h-44 focus:ring-2 focus:ring-primary/50 transition-all font-medium resize-none text-neutral"
                                    placeholder="Write your detailed financial guide here..."
                                ></textarea>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4">
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="px-8 py-4 bg-base-300 text-neutral font-bold rounded-2xl hover:bg-base-200 transition-all flex items-center gap-2"
                                >
                                    <FaTimesCircle /> Cancel
                                </button>
                            )}
                            <button type="submit" className="group relative px-10 py-4 bg-primary-content text-base-100 font-bold rounded-2xl overflow-hidden transition-all hover:pr-14 active:scale-95 shadow-xl">
                                <span className="relative z-10">
                                    {editingId ? "Update Article" : "Publish Article"}
                                </span>
                                {editingId ? (
                                    <FaCheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
                                ) : (
                                    <FaPlusCircle className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* --- LISTING TABLE SECTION --- */}
            <section className="bg-base-100 rounded-[2.5rem] shadow-2xl border border-base-300 overflow-hidden">
                <div className="px-8 py-6 bg-base-200/50 flex justify-between items-center border-b border-base-300">
                    <h3 className="text-xl font-black tracking-tight uppercase">Live <span className="text-primary">Articles</span></h3>
                    <div className="badge badge-secondary text-primary-content badge-lg font-bold px-4 py-4">{blogs.length} Posts</div>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-3 px-6 pb-6">
                        <thead>
                            <tr className="text-gray-400 uppercase text-[10px] tracking-[0.2em] border-none">
                                <th className="bg-transparent">Article Details</th>
                                <th className="bg-transparent">Category</th>
                                <th className="bg-transparent">Last Modified</th>
                                <th className="bg-transparent text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog._id} className="group hover:bg-primary/5 transition-all duration-300">
                                    <td className="bg-base-100 rounded-l-2xl border-y border-l border-base-300 group-hover:border-primary/20">
                                        <div className="flex items-center gap-4">
                                            <div className="mask mask-squircle w-16 h-16 shadow-md border-2 border-white">
                                                <img src={blog.image} alt="Cover" className="object-cover w-full h-full" />
                                            </div>
                                            <div>
                                                <div className="font-black text-neutral line-clamp-1 max-w-[250px]">{blog.title}</div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="w-2 h-2 rounded-full bg-success"></span>
                                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Active</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="bg-base-100 border-y border-base-300 group-hover:border-primary/20">
                                        <span className="px-3 py-1.5 bg-primary/10 text-primary text-[10px] font-black rounded-lg uppercase border border-primary/10">
                                            {blog.category}
                                        </span>
                                    </td>
                                    <td className="bg-base-100 border-y border-base-300 group-hover:border-primary/20 font-bold text-gray-400 text-xs">
                                        {new Date(blog.updatedAt || blog.createdAt).toLocaleDateString('en-GB')}
                                    </td>
                                    <td className="bg-base-100 rounded-r-2xl border-y border-r border-base-300 group-hover:border-primary/20 text-right">
                                        <div className="flex justify-end gap-2 pr-2">
                                            <button
                                                onClick={() => handleEditClick(blog)}
                                                className="btn btn-ghost btn-circle text-primary hover:bg-primary/20 transition-all"
                                                title="Edit Article"
                                            >
                                                <FaEdit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(blog._id)}
                                                className="btn btn-ghost btn-circle text-error hover:bg-error/20 transition-all"
                                                title="Delete Article"
                                            >
                                                <FaTrashAlt size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {blogs.length === 0 && (
                    <div className="py-24 text-center flex flex-col items-center justify-center opacity-20">
                        <FaLayerGroup size={80} className="mb-4" />
                        <p className="text-2xl font-black uppercase tracking-widest">No Content Found</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ManageBlogs;