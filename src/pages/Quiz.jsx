import React, { useEffect, useState } from 'react';
import Header from '../components/User/Header.jsx';
import Footer from '../components/User/Footer.jsx';
import Quizzes from '../components/User/Content/Quizzes.jsx';
import SearchBar from '../components/User/Content/SearchBar.jsx';
import { BASE_URL } from '../../services/api.jsx';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const Quiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const majors = [
        'Thiết Kế Web',
        'Mobile',
        'Mạng Máy Tính',
    ];


    const getQuizData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/quizzes`);
            console.log(response.data);
            setQuizzes(response.data);
            setFilteredQuizzes(response.data);
        } catch (error) {
            console.error('Error during get data: ', error);
        }
    };


    useEffect(() => {
        // Giả lập delay
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    useEffect(() => {
        getQuizData();
    }, []);


    if(loading) {
        return <LoadingSpinner/>
    }

    return (
        <div className="min-h-screen bg-CadetBlue text-white">
            <Header />
            <main className="container mx-auto p-6">
                <SearchBar onFilter={setFilteredQuizzes} quizzes={quizzes} />
                {majors
                    .filter(major => filteredQuizzes.some(q => q.major === major))
                    .map(major => (
                        <div key={major}>
                            <Quizzes filteredQuizzes={filteredQuizzes} major={major} />
                        </div>
                    ))}
            </main>
            <Footer />
        </div>
    );
};

export default Quiz;