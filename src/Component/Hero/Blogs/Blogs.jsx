import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaCalendarAlt, FaUser, FaTimes } from 'react-icons/fa';
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic';
import Loader from '../../Loader/Loader';

const Blogs = () => {
    const axiosPublic = UseAxiosPublic();
    
    // মোডালের জন্য স্টেট ডিক্লেয়ার করা হয়েছে
    const [selectedBlog, setSelectedBlog] = useState(null);

    const { data: blogs = [], isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blogs');
            return res.data;
        }
    });

    if (isLoading) return <Loader />;

    return (
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
            {/* header section*/}
            <div className="mb-10 text-center">
                <h2 className="text-4xl font-bold text-neutral">Financial <span className="text-secondary">Insights</span></h2>
                <p className="text-white mt-2">Master your money with our expert financial tips.</p>
            </div>

            {/* Blog section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <div key={blog._id} className="group bg-base-100 rounded-[2.5rem] overflow-hidden shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                        <figure className="relative h-52 overflow-hidden">
                            <img
                                src={blog.image}
                                alt="Blog"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="badge badge-primary font-bold px-4 py-3">{blog.category || "Finance"}</span>
                            </div>
                        </figure>

                        <div className="p-6">
                            <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-1"><FaCalendarAlt className="text-primary" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                                <span className="flex items-center gap-1"><FaUser className="text-primary" /> Admin</span>
                            </div>
                            <h3 className="text-xl font-bold text-neutral mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                {blog.title}
                            </h3>
                            <p className="text-gray-500 text-sm line-clamp-3 mb-6">
                                {blog.description}
                            </p>
                            
                            {/* বাটন ক্লিক করলে selectedBlog স্টেট আপডেট হবে */}
                            <button 
                                onClick={() => setSelectedBlog(blog)}
                                className="btn btn-secondary text-base-100 btn-sm rounded-lg"
                            >
                                Read More
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- DaisyUI MODAL Section --- */}
            {selectedBlog && (
                <div className="modal modal-open modal-bottom sm:modal-middle transition-all duration-300">
                    <div className="modal-box max-w-3xl rounded-[2.5rem] p-0 overflow-hidden bg-base-100 border border-base-300 shadow-2xl relative">
                        
                        {/* modal close button */}
                        <button 
                            onClick={() => setSelectedBlog(null)}
                            className="btn btn-circle btn-sm absolute top-4 right-4 z-50 bg-black/50 border-none text-white hover:bg-black"
                        >
                            <FaTimes />
                        </button>

                        <div className="h-64 md:h-80 w-full">
                            <img 
                                src={selectedBlog.image} 
                                className="w-full h-full object-cover" 
                                alt="blog view" 
                            />
                        </div>

                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="badge badge-primary font-bold">{selectedBlog.category}</span>
                                <span className="text-sm text-gray-400 font-medium italic">
                                    Date: {new Date(selectedBlog.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            
                            <h3 className="text-3xl font-black text-neutral leading-tight mb-6">
                                {selectedBlog.title}
                            </h3>
                            
                            <div className="divider"></div>
                            
                            <div className="max-h-64 overflow-y-auto pr-2 text-gray-600 leading-relaxed whitespace-pre-line">
                                {selectedBlog.description}
                            </div>

                            <div className="modal-action mt-8">
                                <button 
                                    onClick={() => setSelectedBlog(null)}
                                    className="btn btn-neutral rounded-xl px-8"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* close modal if click out side of modal */}
                    <div className="modal-backdrop bg-black/60" onClick={() => setSelectedBlog(null)}></div>
                </div>
            )}
        </div>
    );
};

export default Blogs;