import React from 'react';

const Faq = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqData.map((item, index) => (
                    <div key={index} className="collapse collapse-arrow bg-white shadow-lg border border-gray-200 rounded-lg">
                        <input type="radio" name="faq-accordion" />
                        <div className="collapse-title text-lg font-semibold text-gray-800 hover:text-blue-600 transition-all">
                            {item.question}
                        </div>
                        <div className="collapse-content text-gray-600">
                            <p className="py-2">{item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// FAQ Data Array
const faqData = [
    {
        question: "How do I join the platform?",
        answer: "Simply sign up with your email and start collaborating with friends.",
    },
    {
        question: "Is this platform free to use?",
        answer: "Yes, our platform is completely free for all users.",
    },
    {
        question: "Can I grade my own assignments?",
        answer: "No, only your friends can grade your assignments to ensure fairness.",
    },
    {
        question: "How do I create an assignment?",
        answer: "Go to the 'Create Assignment' section, fill in the details, and publish it for your friends.",
    },
    {
        question: "Is my data secure on this platform?",
        answer: "Yes, we use industry-standard encryption to ensure your data is safe and secure.",
    },
    {
        question: "Do I need to download any software to use this platform?",
        answer: "No, our platform is completely web-based and works on any modern browser.",
    }
];

export default Faq;
