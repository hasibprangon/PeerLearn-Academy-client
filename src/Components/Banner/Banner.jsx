import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Banner = () => {
    const { user } = useAuth();
    return (
        <div className="bg-purple-500 text-white py-20 px-6 my-5">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Collaborate, Learn, and Succeed with Friends!
                </h1>
                <p className="text-lg md:text-2xl mb-8">
                    Join your friends to create, complete, and grade assignments in a fun and interactive way.
                </p>
                <div>
                    {
                        user && user?.email ? <Link to='/assignments' className="bg-purple-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-purple-800"> Explore Features Assignments</Link> : <div className="space-x-4">
                            <Link to='/register' className="bg-white text-purple-500 font-semibold px-6 py-3 rounded-md hover:bg-gray-100"> Sign Up Now</Link>
                            <Link to='/assignments' className="bg-purple-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-purple-800"> Explore Features Assignments</Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Banner;