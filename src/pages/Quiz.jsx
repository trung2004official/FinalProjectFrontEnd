import React from 'react';
import Header from '../components/User/Header.jsx';
import Footer from '../components/User/Footer.jsx';
import Quizzes from '../components/User/Content/Quizzes.jsx';

const Quiz = () => {
    return (
        <div className="min-h-screen bg-CadetBlue text-white">
            <Header />
            <main className="container mx-auto p-6">
                <Quizzes/>
            </main>
            <Footer />
        </div>
    );
};

export default Quiz;