import React from "react";
import { motion } from "framer-motion";
import { Users, HelpCircle, BookOpen } from "lucide-react";

const Extra = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-16 p-6 sm:p-8 bg-base-100/10 backdrop-blur-2xl w-[95%] max-w-7xl mx-auto rounded-3xl shadow-2xl border border-white/20"
        >
            {/* Wrapper */}
            <div className="flex flex-col lg:flex-row lg:justify-between gap-12">

                {/* Social Proof Section */}
                <div className="flex items-start gap-4 max-w-xl">
                    <div className="p-3 sm:p-4 bg-secondary/20 rounded-2xl border border-primary-content/50">
                        <Users className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-2xl sm:text-3xl text-base-100 font-bold leading-snug">
                            Join 10,000+ Smart Users
                        </h2>
                        <p className="text-primary-content mt-2 text-sm sm:text-base leading-relaxed">
                            People trust FinEase for smarter budgeting and stress-free money management.
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-base-100/20 lg:hidden"></div>

                {/* Quick Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">

                    {/* Tutorials */}
                    <div>
                        <h3 className="text-primary-content font-semibold mb-3 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-blue-300" />
                            Tutorials
                        </h3>
                        <ul className="text-primary-content text-sm space-y-2">
                            {[
                                "How to Set a Budget",
                                "Track Daily Expenses",
                                "Financial Basics",
                            ].map((item) => (
                                <li
                                    key={item}
                                    className="hover:underline cursor-pointer hover:text-base-100 transition"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* FAQs */}
                    <div>
                        <h3 className="text-primary-content font-semibold mb-3 flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-yellow-300" />
                            FAQs
                        </h3>
                        <ul className="text-primary-content text-sm space-y-2">
                            {[
                                "How FinEase Works?",
                                "Is My Data Safe?",
                                "How to Export Reports?",
                            ].map((item) => (
                                <li
                                    key={item}
                                    className="hover:underline cursor-pointer hover:text-base-100 transition"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Blog */}
                    <div>
                        <h3 className="text-primary-content font-semibold mb-3 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-purple-300" />
                            Blog
                        </h3>
                        <ul className="text-primary-content text-sm space-y-2">
                            {[
                                "Saving Tips",
                                "Smart Spending",
                                "Money Mistakes to Avoid",
                            ].map((item) => (
                                <li
                                    key={item}
                                    className="hover:underline cursor-pointer hover:text-base-100 transition"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </motion.footer>
    );
};

export default Extra;
