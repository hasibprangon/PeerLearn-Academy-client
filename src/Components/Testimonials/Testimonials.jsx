import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthContextProvider";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import 'swiper/css/navigation';

import "../../Styles/css/styles.css";

// Import required modules
import { EffectCoverflow ,Autoplay, Pagination, Navigation } from 'swiper/modules';

const Testimonials = () => {
    const { user } = useContext(AuthContext);
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        fetch("testimonials.json")
            .then((res) => res.json())
            .then((data) => setTestimonials(data));
    }, []);

    return (
        <section className="my-16 px-5 md:px-10 min-h-screen">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                What Our Learners Say
            </h2>
            <p className="text-center text-gray-400 mb-5">
                See how PeerLearn Academy is transforming the way students collaborate and learn together!
            </p>

            {/* Swiper Container */}
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 30,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                // pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
                className="mySwiper"
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index} className="w-[300px] mx-auto">
                        <div className="bg-[#9333EA] shadow-lg rounded-lg p-6 text-center">
                            <img
                                src={testimonial.avatar}  // Fallback image
                                alt={testimonial.name}
                                className="h-32 object-contain mx-auto  mb-4"
                            />
                            <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                            <p className="text-sm ">{testimonial.role}</p>
                            <p className="mt-3 ">{testimonial.feedback}</p>
                            <div className="mt-3 text-yellow-500">
                                {"⭐".repeat(testimonial.rating)}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Sign-in Prompt */}
            {!user?.email && (
                <div className="text-center mt-10">
                    <p className="text-lg font-medium">Want to enhance your learning experience?</p>
                    <Link to="/signIn" className="btn bg-purple-600 hover:bg-purple-700 text-white mt-3">
                        Join Now
                    </Link>
                </div>
            )}
        </section>
    );
};

export default Testimonials;
