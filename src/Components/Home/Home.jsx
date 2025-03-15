import React from 'react';
import Banner from '../Banner/Banner';
import Features from '../Features/Features';
import Faq from '../Faq/Faq';
import { Helmet } from 'react-helmet-async';
import Testimonials from '../Testimonials/Testimonials';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
           <Banner></Banner>
           <Features></Features>
           <Testimonials></Testimonials>
           <Faq></Faq>
        </div>
    );
};

export default Home;