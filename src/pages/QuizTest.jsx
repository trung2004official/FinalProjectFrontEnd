import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { quizzes } from '../data.js';

const QuizTest = () => {
    const { id } = useParams(); // Được gọi ở top-level
    const quizId = parseInt(id, 10);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [answers, setAnswers] = useState([]);
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        console.log('Debug - URL ID:', id);
        console.log('Debug - Parsed Quiz ID:', quizId);
        console.log('Debug - Available Quizzes:', quizzes.map(q => ({ id: q.id, title: q.title })));
        const foundQuiz = quizzes.find(q => q.id === quizId) || (id === undefined ? null : quizzes[0]);
        console.log('Debug - Found Quiz:', foundQuiz);
        setQuiz(foundQuiz);
        if (foundQuiz) {
            setAnswers(Array(foundQuiz.questions.length).fill(''));
        }
    }, [id, quizId]); // Dependencies

    if (!quiz) return <div>Không tìm thấy bài quiz! URL ID: {id} (Parsed ID: {quizId}) - Quizzes IDs: {JSON.stringify(quizzes.map(q => q.id))}</div>;

    const answeredCount = answers.filter(answer => answer !== '').length;

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = answer;
        setAnswers(newAnswers);

        if (currentQuestionIndex < quiz.questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(answers[currentQuestionIndex + 1] || '');
            }, 300);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
        setSelectedAnswer(answers[currentQuestionIndex - 1] || '');
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(answers[currentQuestionIndex + 1] || '');
    };

    const handleSubmit = () => {
        const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const resultData = {
            quizId: quiz.id,
            title: quiz.title,
            questions: quiz.questions,
            answers,
            correctCount: answers.filter((ans, idx) => ans === quiz.questions[idx].correctAnswer).length,
            totalQuestions: quiz.questions.length,
            completedAt: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour12: true }), // 04:46 PM +07
        };
        localStorage.setItem(`quizResult_${quizId}_${userData.username}`, JSON.stringify(resultData));
        window.location.href = `/quiz/result/${quizId}`;
    };

    return (
        <div className="min-h-screen bg-CetaceanBlue text-gray-300 p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="text-lg font-medium">
                    Câu <span className="font-bold text-Emerald">{currentQuestionIndex + 1}</span>/{quiz.questions.length}
                    <span className="ml-2 text-gray-500">(Đã trả lời: {answeredCount}/{quiz.questions.length})</span>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3 space-y-4">
                        <div className="bg-white text-black p-5 rounded-2xl shadow-md border border-gray-300">
                            <h2 className="text-xl font-semibold mb-3">{quiz.questions[currentQuestionIndex].text}</h2>
                            <div className="space-y-2">
                                {quiz.questions[currentQuestionIndex].options.map((option, index) => (
                                    <label
                                        key={index}
                                        className={`flex items-center p-3 rounded-xl border cursor-pointer transition
                                    ${selectedAnswer === option
                                            ? 'bg-emerald-100 border-emerald-400'
                                            : 'bg-gray-100 border-gray-300'}
                                    hover:bg-emerald-50 hover:border-emerald-400`}
                                    >
                                        <input
                                            type="radio"
                                            name="answer"
                                            value={option}
                                            checked={selectedAnswer === option}
                                            onChange={() => handleAnswerSelect(option)}
                                            className="mr-3 accent-emerald-500"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 justify-between">
                            <button
                                onClick={handlePrevious}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-lg transition disabled:opacity-50"
                                disabled={currentQuestionIndex === 0}
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNext}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-lg transition disabled:opacity-50"
                                disabled={currentQuestionIndex === quiz.questions.length - 1}
                            >
                                Next
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition disabled:opacity-50"
                                disabled={answeredCount === 0}
                            >
                                Nộp bài
                            </button>
                        </div>
                    </div>

                    <div className="md:w-1/3">
                        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-5 gap-2">
                            {Array.from({ length: quiz.questions.length }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentQuestionIndex(index)}
                                    className={`w-9 h-9 rounded-full text-sm font-medium flex items-center justify-center transition
                                ${index === currentQuestionIndex
                                        ? 'bg-emerald-400 text-black'
                                        : 'bg-gray-200 text-black'}
                                ${answers[index] ? 'border-2 border-emerald-400' : ''}
                                hover:bg-emerald-500`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizTest;