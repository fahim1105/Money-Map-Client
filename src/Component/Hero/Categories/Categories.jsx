import React from 'react';
import {
    Utensils,
    Car,
    Home,
    ShoppingBag,
    Stethoscope,
    Briefcase
} from 'lucide-react';

const Categories = () => {
    const categories = [
        {
            name: "Food & Dining",
            description: "Track daily food, restaurant, and grocery expenses.",
            icon: <Utensils size={32} strokeWidth={1.5} />,
        },
        {
            name: "Transportation",
            description: "Manage travel costs such as bus, rickshaw, fuel, or ride sharing.",
            icon: <Car size={32} strokeWidth={1.5} />,
        },
        {
            name: "Home & Utilities",
            description: "Record house rent, electricity, gas, water, and internet bills.",
            icon: <Home size={32} strokeWidth={1.5} />,
        },
        {
            name: "Shopping",
            description: "Monitor clothing, gadgets, and personal shopping expenses.",
            icon: <ShoppingBag size={32} strokeWidth={1.5} />,
        },
        {
            name: "Health & Medical",
            description: "Keep track of medical bills, medicines, and healthcare costs.",
            icon: <Stethoscope size={32} strokeWidth={1.5} />,
        },
        {
            name: "Income Sources",
            description: "Track salary, freelance income, business profit, or bonuses.",
            icon: <Briefcase size={32} strokeWidth={1.5} />,
        },
    ];

    return (
        <section className="my-20 w-11/12 mx-auto">
            <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold text-primary-content tracking-tight">
                    Expense & Income Categories
                </h2>
                <p className="text-primary-content/80 mt-2">Organize your finances with precision</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="group flex flex-col items-center text-center p-8 bg-base-100 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        <div className="mb-5 p-4 bg-gray-50 rounded-full text-gray-700 group-hover:bg-gray-100 transition-colors duration-300">
                            {category.icon}
                        </div>

                        <h3 className="text-xl font-semibold text-primary mb-2">
                            {category.name}
                        </h3>

                        <p className="text-primary-content/80 text-sm leading-relaxed">
                            {category.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;