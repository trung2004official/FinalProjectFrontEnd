import React from 'react';
import Login from '../../pages/Login';
import Header from '../../components/User/Header.jsx';
import Footer from '../../components/User/Footer.jsx';
import Courses from '../../components/User/Main/Courses.jsx';

const HomeLayout = () => {
    return (
        <div className="min-h-screen bg-CetaceanBlue text-white">
            <Header />
            <main className="container mx-auto p-6">
                <Courses />
            </main>
            <Footer />
        </div>
    );
};

export default HomeLayout;