import React from 'react';
import Header from '../components/User/Header.jsx';
import Footer from '../components/User/Footer.jsx';
import Catalog from '../components/User/Content/Catalog.jsx';
import Hero from '../components/User/Content/Hero.jsx';

const Home = () => {
    return (
        <div className="min-h-screen bg-CadetBlue text-white">
            <Header />
            <main className="container mx-auto p-6 ">
                <Hero />
                <Catalog />
            </main>
            <Footer />
        </div>
    );
};

export default Home;