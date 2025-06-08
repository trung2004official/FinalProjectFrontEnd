import React from 'react';
import { Link } from 'react-router-dom';
import QuizCard from './QuizCard.jsx';
import { quizzes } from '../../../data.js';

const Catalog = () => {
    const categories = {};
    quizzes.forEach(quiz => {
        if (!categories[quiz.category]) {
            categories[quiz.category] = [];
        }
        categories[quiz.category].push(quiz);
    });

    return (
        <div className="container mx-auto p-6 text-center">
            <h2 className="text-2xl text-CetaceanBlue font-bold mb-2">Rèn luyện kiến thức của bạn</h2>
            <p className="text-gray-600 mb-4">Hãy chọn đề thi và trao dồi thêm kiến thức</p>
            <Link to="/quiz">
                <button className="bg-black text-white px-4 py-2 rounded">View All</button>
            </Link>
            {Object.keys(categories).map((category, index) => (
                <div key={index} className="my-8">
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

export default Catalog;