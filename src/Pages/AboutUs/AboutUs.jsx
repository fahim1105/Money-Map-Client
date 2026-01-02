import { FaUsers, FaChartPie, FaShieldAlt } from "react-icons/fa";

const AboutUs = () => {
    const features = [
        {
            icon: <FaUsers className="text-5xl text-green-500 mx-auto mb-4" />,
            title: "User-Friendly Design",
            description:
                "Intuitive interface to track income, expenses, and savings easily without confusion.",
        },
        {
            icon: <FaChartPie className="text-5xl text-blue-500 mx-auto mb-4" />,
            title: "Data Visualization",
            description:
                "Analyze spending patterns with charts and financial summaries for better planning.",
        },
        {
            icon: <FaShieldAlt className="text-5xl text-red-500 mx-auto mb-4" />,
            title: "Secure & Protected",
            description:
                "All sensitive pages are protected and only logged-in users can access personal financial data.",
        },
    ];

    return (
        <section className="py-20 px-4 rounded">
            <div className="max-w-6xl mx-auto text-center">
                {/* Heading */}
                <h2 className="text-4xl text-primary-content md:text-5xl font-bold mb-8">
                    About Money Map
                </h2>

                {/* Main Description */}
                <p className="text-white mb-6 text-lg md:text-xl leading-relaxed">
                    Money Map is a personal finance management web application designed to help users
                    track their income, manage expenses, and gain clear insights into their financial activities.
                    Our goal is to promote better financial awareness through simple and user-friendly tools.
                </p>

                <p className="text-white mb-12 text-lg md:text-xl leading-relaxed">
                    Users can record daily transactions, categorize spending, and view detailed summaries and reports.
                    By visualizing financial data, Money Map helps users understand their spending habits and make informed
                    financial decisions. This application was developed as a learning-based project, focusing on real-world
                    features like secure authentication, CRUD operations, protected routes, and data visualization.
                </p>

                {/* Features / Highlights */}
                <div className="grid md:grid-cols-3 gap-10 text-center">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-base-100 shadow-lg rounded-lg p-8 hover:shadow-2xl transition">
                            {feature.icon}
                            <h3 className="text-xl text-primary font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
