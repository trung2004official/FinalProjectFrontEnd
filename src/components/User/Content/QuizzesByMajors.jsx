import React from 'react'
import QuizCard from './QuizCard';

const QuizzesByMajors = ({ filteredQuizzes, major }) => {
    const quizzesByMajor = major
        ? filteredQuizzes.filter(quiz => quiz.major === major && quiz.status === 'public').slice(0,3)
        : filteredQuizzes.filter(quiz => quiz.status === 'public').slice(0,3);
    return (
        <>
            <h4 className="text-xl text-CetaceanBlue font-semibold mb-4 text-left pl-2 border-l-4 border-Emerald">
                {major}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {quizzesByMajor.map((quiz) => (
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
        </>
    )
}

export default QuizzesByMajors
