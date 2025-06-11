import React, { useEffect, useState } from 'react';
import Header from '../components/User/Header.jsx';
import Footer from '../components/User/Footer.jsx';
import Quizzes from '../components/User/Content/Quizzes.jsx';
import SearchBar from '../components/User/Content/SearchBar.jsx';
import { BASE_URL } from '../../services/api.jsx';
import axios from 'axios';

const Quiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);

        const getQuizData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/quiz`);
            console.log(response.data);
            setQuizzes(response.data);
            setFilteredQuizzes(response.data);
        } catch (error) {
            console.error('Error during get data: ', error);
        }
    };

    useEffect(() => {
        getQuizData();
    }, []);

    return (
        <div className="min-h-screen bg-CadetBlue text-white">
            <Header />
            <main className="container mx-auto p-6">
                <SearchBar onFilter={setFilteredQuizzes} quizzes={quizzes}/>
                <Quizzes filteredQuizzes={filteredQuizzes} />
            </main>
            <Footer />
        </div>
    );
};

export default Quiz;