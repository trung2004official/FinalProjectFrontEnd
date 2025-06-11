import React, { useState } from 'react';
import Header from '../components/User/Header.jsx';
import Footer from '../components/User/Footer.jsx';
import Quizzes from '../components/User/Content/Quizzes.jsx';
import SearchBar from '../components/User/Content/SearchBar.jsx';
import { quizzes } from '../data.js';

const Quiz = () => {
    const [filteredQuizzes, setFilteredQuizzes] = useState(quizzes);

    return (
        <div className="min-h-screen bg-CadetBlue text-white">
            <Header />
            <main className="container mx-auto p-6">
                <SearchBar onFilter={setFilteredQuizzes} />
                <Quizzes filteredQuizzes={filteredQuizzes} />
            </main>
            <Footer />
        </div>
    );
};

export default Quiz;