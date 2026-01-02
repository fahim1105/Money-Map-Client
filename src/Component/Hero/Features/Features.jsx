import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  ShieldCheck, 
  BarChart3, 
  ReceiptText, 
  LineChart, 
  LockKeyhole 
} from 'lucide-react';

const Features = () => {
    const features = [
        {
            title: "Income & Expense Tracking",
            description: "Easily record and manage your daily income and expenses with clear categorization for better financial clarity.",
            icon: <Wallet size={32} className="text-base-100" />,
        },
        {
            title: "Secure User Authentication",
            description: "Sign up and log in securely using email, password, or Google authentication to keep your financial data protected.",
            icon: <ShieldCheck size={32} className="text-base-100" />,
        },
        {
            title: "Personalized Financial Overview",
            description: "View total balance, income, and expenses calculated specifically from your own transactions in real time.",
            icon: <BarChart3 size={32} className="text-base-100" />,
        },
        {
            title: "Detailed Transaction Management",
            description: "Update, delete, and view full details of each transaction without refreshing the page.",
            icon: <ReceiptText size={32} className="text-base-100" />,
        },
        {
            title: "Visual Financial Reports",
            description: "Analyze your spending patterns with interactive charts such as category-wise and monthly financial reports.",
            icon: <LineChart size={32} className="text-base-100" />,
        },
        {
            title: "Private & Protected Routes",
            description: "All sensitive pages are protected so only logged-in users can access their personal financial data.",
            icon: <LockKeyhole size={32} className="text-base-100" />,
        },
    ];

    return (
        <section className="py-20 w-11/12 mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-content mb-4">
                    Powerful Features to Manage Your Money
                </h2>
                <div className="w-20 h-1 bg-primary-content mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-8 bg-base-100 border border-primary-content rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                    >
                        <div className="mb-6 inline-block p-4 bg-primary-content/80 rounded-xl group-hover:bg-primary-content transition-colors">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold text-primary/70 mb-3">
                            {feature.title}
                        </h3>
                        <p className="text-primary-content/70 leading-relaxed">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Features;