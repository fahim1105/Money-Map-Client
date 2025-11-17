import React from "react";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "John Doe",
        role: "Freelancer",
        message:
            "Money Map helped me track my income and expenses effortlessly. I finally saved enough for my dream vacation!",
        avatar: "https://i.ibb.co.com/XkMFjwGC/syful-islam-s-W1-Yx5b54k-unsplash.jpg",
    },
    {
        name: "Sarah Khan",
        role: "Teacher",
        message:
            "I love the budget feature. Now I know exactly where my money goes every month!",
        avatar: "https://i.ibb.co.com/zhqtvgKB/images.jpg",
    },
    {
        name: "Ali Raza",
        role: "Student",
        message:
            "The reports and charts are amazing! I can see my progress and plan better for the future.",
        avatar: "https://i.ibb.co.com/fVjGhRrz/muhammad-rizwan-Vnydp-Ki-CDa-Y-unsplash.jpg",
    },
];

const Stories = () => {
    return (
        <section className="bg-transparent py-20 px-4 lg:px-12">
            <div className="max-w-7xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-4xl font-bold mb-4 text-white"
                >
                    Success Stories
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-white/60 max-w-2xl mx-auto mb-12"
                >
                    See how Money Map has helped users manage their finances better!
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testi, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
                        >
                            <img
                                src={testi.avatar}
                                alt={testi.name}
                                className="w-20 h-20 mx-auto rounded-full mb-4 object-cover border-4 border-gray-100"
                            />
                            <h3 className="text-xl font-semibold text-gray-800">{testi.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{testi.role}</p>
                            <p className="text-gray-600 leading-relaxed">{testi.message}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stories;
