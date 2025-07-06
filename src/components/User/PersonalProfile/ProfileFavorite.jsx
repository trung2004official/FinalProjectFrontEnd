import React, { useEffect, useState } from 'react';
import { quizzes as mockQuizzes } from '../../../data.js';
import Header from '../Header.jsx';
import QuizCard from '../Content/QuizCard.jsx';

const ProfileFavorite = () => {
    const favoriteIds = [2, 5, 7];
    const [favoriteQuizzes, setFavoriteQuizzes] = useState([]);

    useEffect(() => {
        const favs = mockQuizzes.filter(q => favoriteIds.includes(q.id));
        setFavoriteQuizzes(favs);
    }, []);

    return (
        <div>
            <Header />
            <div className="p-6 bg-CadetBlue min-h-screen">
                <h2 className="text-2xl font-bold mb-6 text-Emerald">Quiz đã yêu thích</h2>
                {favoriteQuizzes.length === 0 ? (
                    <div className="text-center text-Grey-light italic">Bạn chưa có quiz yêu thích nào.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favoriteQuizzes.map((quiz) => (
                            <QuizCard 
                            key={quiz.id}
                            quiz={quiz} 
                            isFavorite={true}
                            id={quiz.id}
                            title={quiz.title}
                            duration={quiz.duration}
                            difficulty={quiz.difficulty}
                            category={quiz.category}
                        />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileFavorite;