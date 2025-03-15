import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Typewriter } from 'react-simple-typewriter';
import { easeInOut, motion } from "framer-motion";


const Banner = () => {
    const { user } = useAuth();
    return (
        <section className="bg-gradient-to-r from-[#1E3A8A] to-[#4338CA] text-white  py-16">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
                {/* Left Section */}
                <div className="max-w-xl text-center md:text-left">
                    <motion.h1
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 10, delay: 1, ease: easeInOut, repeat: Infinity }}
                        className="text-4xl md:text-6xl font-bold mb-4">
                        Collaborate. Learn. Succeed.
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-2xl mb-8">
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
                    <div className="mt-6 flex gap-4 justify-center md:justify-start">
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

                {/* Right Section */}
                <div className="mt-8 md:mt-0">
                    <motion.img 
                    src="https://i.ibb.co.com/Ngf76F1H/pl-academy-hero.png" alt="Peer Learning" 
                    className="w-full max-w-md rounded-t-3xl rounded-r-3xl border-b-8 border-l-8"
                    animate={{ y: [0, 50, 0] }}
                    transition={{ duration: 10, delay: 1, ease: easeInOut, repeat: Infinity }}
                    >

                    </motion.img>
                </div>
            </div >
        </section >

    );
};

export default Banner;