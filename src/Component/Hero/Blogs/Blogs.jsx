import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const Blogs = () => {
    const blogs = [
        {
            title: "10 Simple Ways to Save Money Daily",
            excerpt: "Small changes in your daily routine can lead to significant long-term savings. Learn how to optimize your spending...",
            date: "Oct 24, 2023",
            readTime: "5 min read",
            category: "Savings",
        },
        {
            title: "Understanding Your Cash Flow",
            excerpt: "Mastering the art of tracking income versus expenses is the first step toward true financial independence.",
            date: "Oct 20, 2023",
            readTime: "7 min read",
            category: "Financial Literacy",
        },
        {
            title: "The Power of Budgeting Apps",
            excerpt: "Why digital tracking is superior to traditional pen-and-paper methods for modern expense management.",
            date: "Oct 15, 2023",
            readTime: "4 min read",
            category: "Technology",
        },
    ];

    return (
        <section className="my-20 w-11/12 mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Financial Insights & News
                    </h2>
                    <p className="text-gray-500 mt-2">Expert advice to help you manage your wealth better.</p>
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:gap-3 transition-all">
                    View All Articles <ArrowRight size={18} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                    <article
                        key={index}
                        className="flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        {/* Placeholder for Blog Image - Keeps the theme neutral */}
                        <div className="h-48 bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400 font-medium">Article Preview</span>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center gap-4 mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <span className="px-2 py-1 bg-gray-100 rounded text-gray-700">{blog.category}</span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug hover:text-gray-700 cursor-pointer">
                                {blog.title}
                            </h3>

                            <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                                {blog.excerpt}
                            </p>

                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-gray-500 text-xs">
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    <span>{blog.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock size={14} />
                                    <span>{blog.readTime}</span>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Blogs;