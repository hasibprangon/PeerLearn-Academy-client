import React from 'react';
import Banner from '../Banner/Banner';
import Features from '../Features/Features';
import Faq from '../Faq/Faq';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
           <Banner></Banner>
           <Features></Features>
           <Faq></Faq>
        </div>
    );
};

export default Home;