import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Typewriter } from 'react-simple-typewriter';
import { easeInOut, motion } from "framer-motion";


const Banner = () => {
    const { user } = useAuth();
    return (
        <section className="bg-gradient-to-r from-[#1E3A8A] to-[#4338CA] text-white py-16">
            <div className="container mx-auto px-6">
                {/* Left Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
                    <div className="max-w-xl text-center md:text-left">
                        <motion.h1
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 10, delay: 1, ease: easeInOut, repeat: Infinity }}
                            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                            Collaborate. Learn. Succeed.
                        </motion.h1>
                        <motion.p
                            className="text-lg sm:text-xl md:text-2xl mb-8">
                            <Typewriter
                                words={['Join your friends to create, complete, and grade assignments in a fun and interactive way.']}
                                loop={true}
                                cursor
                                cursorStyle="|"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            ></Typewriter>
                        </motion.p>
                        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                            <div>
                                {
                                    user && user?.email ? 
                                    <Link to='/assignments' className="bg-purple-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-purple-800">Explore Features Assignments</Link> : 
                                    <div className="space-x-4 flex md:flex-row flex-col gap-5">
                                        <Link to='/register' className="bg-white text-purple-500 font-semibold px-6 py-3 rounded-md hover:bg-gray-100">Sign Up Now</Link>
                                        <Link to='/assignments' className="bg-purple-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-purple-800">Explore Features Assignments</Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="mt-8 md:mt-0 flex justify-center md:justify-end">
                        <motion.img 
                            src="https://i.ibb.co.com/Ngf76F1H/pl-academy-hero.png" 
                            alt="Peer Learning" 
                            className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl rounded-t-3xl rounded-r-3xl border-b-8 border-l-8"
                            animate={{ y: [0, 50, 0] }}
                            transition={{ duration: 10, delay: 1, ease: easeInOut, repeat: Infinity }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
