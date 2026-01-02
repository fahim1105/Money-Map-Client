import { FaLaptopCode, FaDatabase, FaShieldAlt, FaChartPie } from "react-icons/fa";

const Documentation = () => {
    const docs = [
        {
            icon: <FaLaptopCode className="text-5xl text-blue-500 mb-4 mx-auto" />,
            title: "Getting Started",
            description:
                "Register or log in to your Money Map account to start tracking your income and expenses. Navigate to Add Transaction to record your financial data easily.",
        },
        {
            icon: <FaDatabase className="text-5xl text-green-500 mb-4 mx-auto" />,
            title: "Managing Transactions",
            description:
                "Add, update, or delete your transactions. Categorize your expenses and income for better reporting and analysis.",
        },
        {
            icon: <FaChartPie className="text-5xl text-yellow-500 mb-4 mx-auto" />,
            title: "Reports & Analytics",
            description:
                "View monthly or yearly summaries, visual charts, and financial insights to understand your spending habits and savings trends.",
        },
        {
            icon: <FaShieldAlt className="text-5xl text-red-500 mb-4 mx-auto" />,
            title: "Security & Privacy",
            description:
                "All your financial data is private. Only logged-in users can access personal information, and all transactions are stored securely.",
        },
    ];

    return (
        <section className="my-20 w-11/12 mx-auto rounded-2xl bg-base-100 py-24 px-4">
            <div className="max-w-6xl mx-auto text-center">
                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Documentation</h2>
                <p className="text-gray-600 mb-12 text-lg md:text-xl leading-relaxed">
                    Money Map is designed to make personal finance management simple and effective.
                    Below is the complete guide to using all features of the app.
                </p>

                {/* Documentation Cards */}
                <div className="grid md:grid-cols-4 gap-10 text-center">
                    {docs.map((doc, index) => (
                        <div
                            key={index} 
                            className="bg-white shadow-lg rounded-lg p-8 hover:shadow-2xl transition"
                        >
                            {doc.icon}
                            <h3 className="text-xl text-black font-bold mb-2">{doc.title}</h3>
                            <p className="text-gray-600">{doc.description}</p>
                        </div>
                    ))}
                </div>

                {/* Detailed Sections */}
                <div className="mt-16 text-left space-y-12">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">1. Getting Started</h3>
                        <p className="text-gray-500 mb-2">
                            After signing up, navigate to the dashboard to view your total balance, income, and expenses. Use the navigation bar to access Add Transaction, My Transactions, and Reports.
                        </p>
                        <p className="text-gray-500">
                            Ensure your email and password are valid. You can also log in using Google authentication.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mb-4">2. Adding Transactions</h3>
                        <p className="text-gray-500 mb-2">
                            Go to Add Transaction page to log income or expense. Fill in type, category, amount, description, and date. Your name and email are auto-filled.
                        </p>
                        <p className="text-gray-500">
                            Once submitted, a success message confirms the transaction has been added.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mb-4">3. Managing Transactions</h3>
                        <p className="text-gray-500 mb-2">
                            Navigate to My Transactions to view all your entries. You can update, delete, or view details of any transaction. Updates reflect immediately without page reload.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mb-4">4. Reports & Analytics</h3>
                        <p className="text-gray-500 mb-2">
                            Check the Reports page to see Pie Charts for categories and Bar Charts for monthly totals. Filter by month to track your financial progress.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mb-4">5. Security & Privacy</h3>
                        <p className="text-gray-500 mb-2">
                            All pages are protected with login authentication. Only you can view your data. The system prevents unauthorized access.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Documentation;
