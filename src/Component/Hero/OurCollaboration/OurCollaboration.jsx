import React from "react";
import { motion } from "framer-motion";

// Example company data with logo URLs
const companies = [
    { name: "MasterCard", logo: "https://i.ibb.co.com/hPs2vHH/download.png" },
    { name: "Visa", logo: "https://i.ibb.co.com/7tBBVCz1/download-1.png" },
    { name: "PayPal", logo: "https://i.ibb.co.com/271t3mY4/download-2.png" },
    { name: "Stripe", logo: "https://i.ibb.co.com/LdX5SXcp/download-3.png" },
    { name: "American Express", logo: "https://i.ibb.co.com/ZRKCzWdX/download-4.png" },
    { name: "Revolut", logo: "https://i.ibb.co.com/1YNQspcC/Revolut-Logo.jpg" },
    { name: "Coinbase", logo: "https://i.ibb.co.com/nNPLy3P0/download-5.png" },
];

const OurCollaboration = () => {
    return (
        <section className="relative py-20 bg-transparent overflow-hidden">
            {/* Decorative orbs */}
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl sm:text-4xl font-bold text-white/90 mb-4">
                    Our Collaboration
                </h2>
                <p className="text-white/60 max-w-2xl mx-auto text-lg sm:text-xl">
                    We partner with some of the world’s leading financial companies to
                    bring you the best services.
                </p>
            </motion.div>

            {/* Marquee */}
            <div className="overflow-hidden relative w-full">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="flex space-x-16 w-[200%] items-center"
                >
                    {companies.concat(companies).map((company, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 flex flex-col items-center px-6 py-3 rounded-xl backdrop-blur-2xl border border-white/20 bg-white/5 shadow-md"
                        >
                            <img
                                src={company.logo}
                                alt={company.name}
                                className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-2"
                            />
                            <p className="text-white/80 text-lg sm:text-xl font-semibold">
                                {company.name}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default OurCollaboration;
