import React from 'react';
import QuizCard from './QuizCard.jsx';

const Quizzes = ({ filteredQuizzes }) => {
    const majors = {};
    filteredQuizzes.forEach(quiz => {
        if (!majors[quiz.major]) {
            majors[quiz.major] = [];
        }
        majors[quiz.major].push(quiz);
    });

    return (
        <div className="container mx-auto p-6">
            {Object.keys(majors).map((major, index) => (
                <div key={index} className="mb-8">
                    <h2 className="text-2xl text-white font-bold mb-4">{major}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {majors[major].map((quiz) => (
                            <QuizCard
                                key={quiz.id}
                                id={quiz.id}
                                title={quiz.title}
                                duration={quiz.duration}
                                difficulty={quiz.difficulty}
                                major={quiz.major}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Quizzes;