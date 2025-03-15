import React, { useEffect, useState } from "react";
import 'animate.css'
import { motion } from "framer-motion";

const Features = () => {
    const featureVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        fetch("fakeData.json")
            .then((res) => res.json())
            .then((data) => setFeatures(data))
            .catch((error) => console.error("Error fetching features:", error));
    }, []);

    return (
        <section className="py-20 transition-all duration-300">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-base-content">Why Choose PeerLearn Academy?</h2>
                <p className="my-5 text-lg text-base-content opacity-80">
                    Empowering students with collaborative learning and interactive assignments.
                </p>

                {/* Features Grid */}
                <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
                    {features.map((feature) => (
                        <motion.div
                            key={feature.id}
                            variants={featureVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                            className="p-6 bg-base-100 shadow-md rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 "
                        >
                            <div className="text-5xl">{feature.icon}</div>
                            <h3 className="mt-4 text-xl font-semibold text-base-content">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-base-content opacity-80">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
