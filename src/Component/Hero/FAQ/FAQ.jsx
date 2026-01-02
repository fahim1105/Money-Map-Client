const FAQ = () => {
    const faqs = [
        {
            question: "What is Money Map?",
            answer:
                "Money Map is a personal finance management web application that helps users track income, expenses, and analyze their financial activities through reports and summaries.",
        },
        {
            question: "Is my financial data secure?",
            answer:
                "Yes. Money Map uses secure authentication and protected routes to ensure that only logged-in users can access their personal financial data.",
        },
        {
            question: "Can I update or delete a transaction?",
            answer:
                "Yes. Users can update, delete, and view details of any transaction they have added, with changes reflected instantly.",
        },
        {
            question: "Does Money Map support financial reports?",
            answer:
                "Yes. The application provides visual financial reports such as category-wise and monthly summaries to help users understand spending patterns.",
        },
        {
            question: "Can I access Money Map on mobile devices?",
            answer:
                "Yes. Money Map is fully responsive and works smoothly on mobile, tablet, and desktop devices.",
        },
        {
            question: "Do I need to pay to use Money Map?",
            answer:
                "No. Money Map is a free personal finance management application developed for learning and demonstration purposes.",
        },
    ];

    return (

        <section className="my-20">
            <h2 className="text-3xl font-bold text-primary-content text-center mb-10">
                Frequently Asked Questions
            </h2>

            <div className="max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="collapse collapse-arrow bg-base-100/80 shadow mb-4"
                    >
                        <input type="checkbox" />
                        <div className="collapse-title text-primary-content text-lg font-medium">
                            {faq.question}
                        </div>
                        <div className="collapse-content">
                            <p className="text-gray-600">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>


    );
};

export default FAQ;
