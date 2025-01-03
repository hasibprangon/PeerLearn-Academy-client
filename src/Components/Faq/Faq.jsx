import React from 'react';

const Faq = () => {
    return (
        <div className="join join-vertical w-full my-10">
             <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">FAQ</h2>
            <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" defaultChecked />
                <div className="collapse-title text-xl font-medium">How do I join the platform?</div>
                <div className="collapse-content">
                    <p>Simply sign up with your email and start collaborating with friends.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-xl font-medium">Is this platform free to use?</div>
                <div className="collapse-content">
                    <p>Yes, our platform is completely free for all users.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-xl font-medium">Can I grade my own assignments?</div>
                <div className="collapse-content">
                    <p>No, only your friends can grade your assignments to ensure fairness.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-xl font-medium">How do I create an assignment?</div>
                <div className="collapse-content">
                    <p>Go to the "Create Assignment" section, fill in the details, and publish it for your friends.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-xl font-medium">Is my data secure on this platform?</div>
                <div className="collapse-content">
                    <p>Yes, we use industry-standard encryption to ensure your data is safe and secure.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-xl font-medium">Do I need to download any software to use this platform?</div>
                <div className="collapse-content">
                    <p>No, our platform is completely web-based and works on any modern browser.</p>
                </div>
            </div>
        </div>
    );
};

export default Faq;