import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Default = () => {
    const [theme, setTheme] = useState('light');
    const handleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme])

    return (
        <div>
            <div className={theme === 'dark' ? 'text-white' : 'text-black'}>
                <Header
                    handleTheme={handleTheme}
                ></Header>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Default;