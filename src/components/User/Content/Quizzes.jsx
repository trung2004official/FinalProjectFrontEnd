import React from 'react';
import QuizCard from './QuizCard.jsx';
import { quizzes } from '../../../data.js';

const Quizzes = () => {
    // Nhóm các quiz theo category
    const categories = {};
    quizzes.forEach(quiz => {
        if (!categories[quiz.category]) {
            categories[quiz.category] = [];
        }
        categories[quiz.category].push(quiz);
    });

    return (
        <div className="container mx-auto p-6">
            {Object.keys(categories).map((category, index) => (
                <div key={index} className="mb-8">
                    <h2 className="text-2xl text-white font-bold mb-4">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {categories[category].map((quiz, idx) => (
                            <QuizCard
                                key={idx}
                                title={quiz.title}
                                duration={quiz.duration}
                                difficulty={quiz.difficulty}
                                category={quiz.category}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Quizzes;