import React from 'react';
import { BsTwitterX } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa6';
import { IoLogoYoutube } from 'react-icons/io5';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-[#1E3A8A] to-[#4338CA] text-white  py-12 px-5 md:px-10">
            <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-8">

                {/* 🔹 Footer Title */}
                <h2 className="text-2xl md:text-3xl font-bold ">Stay Connected with PeerLearn Academy</h2>

                {/* 🔹 Contact Info */}
                <div className="flex flex-col md:flex-row items-center gap-3 text-sm md:text-lg">
                    <a href="mailto:peerLearnAcademy@hotmail.com" className="hover:text-blue-300 transition-colors">
                        ✉ Email: peerLearnAcademy@hotmail.com
                    </a>
                    <span className="hidden md:inline text-gray-400"> | </span>
                    <a href="tel:+8801850010009" className="hover:text-blue-300 transition-colors">
                        📞 Phone: +8801850010009
                    </a>
                </div>

                {/* 🔹 Social Media Links */}
                <div className="flex gap-6">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300 text-black hover:text-blue-300">
                   <span className='text-3xl'><BsTwitterX  /></span>
                    </a>
                    <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300 text-red-600 hover:text-blue-300">
                    <span className='text-3xl'><IoLogoYoutube /></span>
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300 text-blue-600 hover:text-blue-300 text-3xl">
                    <FaFacebookF />
                    </a>
                </div>

                {/* 🔹 Copyright */}
                <p className="text-gray-400 text-xs md:text-sm">
                    © {new Date().getFullYear()} PeerLearn Academy. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
