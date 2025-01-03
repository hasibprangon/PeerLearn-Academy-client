import React, { useEffect, useState } from 'react';

const Features = () => {
    const [features, setFeatures] = useState([]);
    useEffect(() => {
        fetch('fakeData.json')
        .then(res => res.json())
        .then(data => setFeatures(data))
    },[])

    return (
        <div className="py-20">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className=" p-6 rounded-lg shadow-md hover:shadow-lg"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default Features;