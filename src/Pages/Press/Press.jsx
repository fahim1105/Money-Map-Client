const Press = () => {
    const pressItems = [
        {
            name: "Prothon Alo",
            logo: "https://i.ibb.co.com/Nd6qQxD8/unnamed.png",
            link: "#",
        },
        {
            name: "Somoy TV",
            logo: "https://i.ibb.co.com/Wv4ptGVp/images.png",
            link: "#",
        },
        {
            name: "71 TV ",
            logo: "https://i.ibb.co.com/BK7MmkZN/download.jpg",
            link: "#",
        },
        {
            name: "Desh 71",
            logo: "https://i.ibb.co.com/W46S1Zxn/images.jpg",
            link: "#",
        },
    ];

    return (
        <section className="my-20 py-16 px-4 rounded">
            <div className="max-w-6xl mx-auto text-center">
                {/* Heading */}
                <h2 className="text-4xl text-primary-content md:text-5xl font-bold mb-8">
                    As Seen In
                </h2>

                <p className="text-white mb-12 text-lg md:text-xl leading-relaxed">
                    Money Map has been featured in various media outlets and online platforms,
                    helping users understand the importance of personal finance management.
                </p>

                {/* Press Logos */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                    {pressItems.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition transform hover:scale-105"
                        >
                            <img
                                src={item.logo}
                                alt={item.name}
                                className="h-16 md:h-20 object-contain"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Press;
