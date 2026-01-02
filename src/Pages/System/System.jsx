import { FaWallet, FaChartLine, FaBullseye, FaLock } from "react-icons/fa";

const Systems = () => {
    const systems = [
        {
            icon: <FaWallet className="text-5xl text-green-500 mb-4 mx-auto" />,
            title: "Income Tracking",
            description:
                "Easily record and monitor all your sources of income in one place.",
        },
        {
            icon: <FaChartLine className="text-5xl text-blue-500 mb-4 mx-auto" />,
            title: "Expense Management",
            description:
                "Categorize and analyze your spending habits to save more efficiently.",
        },
        {
            icon: <FaBullseye className="text-5xl text-yellow-500 mb-4 mx-auto" />,
            title: "Budget Planning",
            description:
                "Set monthly budgets and get alerts when you are nearing your limits.",
        },
        {
            icon: <FaLock className="text-5xl text-red-500 mb-4 mx-auto" />,
            title: "Secure Data",
            description:
                "Your financial data is stored securely and accessible only to you.",
        },
    ];

    return (
        <section className="my-20 py-20 px-4 rounded">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl text-primary-content font-bold mb-8">Our Systems</h2>
                <p className="text-white mb-12 text-lg md:text-xl leading-relaxed">
                    Money Map operates on a set of robust systems to help you manage your personal finances effectively.
                    Each system is designed to give you clear insights and control over your money.
                </p>

                <div className="grid md:grid-cols-4 gap-10 text-center">
                    {systems.map((system, index) => (
                        <div
                            key={index}
                            className="bg-base-100 shadow-lg rounded-lg p-8 hover:shadow-2xl transition"
                        >
                            {system.icon}
                            <h3 className="text-xl font-bold mb-2">{system.title}</h3>
                            <p className="text-gray-600">{system.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Systems;
