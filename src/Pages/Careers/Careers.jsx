const Careers = () => {
    const positions = [
        {
            title: "Frontend Developer",
            description:
                "Work on the UI and user experience of Money Map using React, Tailwind, and modern web technologies.",
        },
        {
            title: "Backend Developer",
            description:
                "Manage databases, APIs, and secure authentication using Node.js, Express, and MongoDB.",
        },
        {
            title: "UI/UX Designer",
            description:
                "Design intuitive and user-friendly interfaces for web and mobile users.",
        },
        {
            title: "Quality Assurance",
            description:
                "Test and ensure the stability, security, and usability of the application.",
        },
    ];

    return (
        <section className="my-20 py-20 px-4 rounded">
            <div className="max-w-6xl mx-auto text-center">
                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                    Careers at Money Map
                </h2>

                <p className="text-primary-content mb-12 text-lg md:text-xl leading-relaxed">
                    Join the Money Map team and help build innovative solutions for personal finance management.
                    We value learning, creativity, and collaboration. Explore the roles below and see where you fit.
                </p>

                {/* Career Positions */}
                <div className="grid md:grid-cols-2 gap-10 text-left">
                    {positions.map((position, index) => (
                        <div
                            key={index}
                            className="bg-base-100 shadow-lg rounded-lg p-8 hover:shadow-2xl transition"
                        >
                            <h3 className="text-2xl text-primary font-bold mb-2">{position.title}</h3>
                            <p className="text-gray-600">{position.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Careers;
