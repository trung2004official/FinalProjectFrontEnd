import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../services/api.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const QuizTest = () => {
    const { quizId } = useParams(); // Được gọi ở top-level
    const [searchParams] = useSearchParams();
    const attemptId = searchParams.get('attemptId');
    const [quiz, setQuiz] = useState({});
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [remainingTime, setRemainingTime] = useState(null);
    const [attempt, setAttempt] = useState({});
    const navigate = useNavigate();

    const getQuizzesQuestionsData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/quizzes-questions/${quizId}`);
            const { questions, quiz } = response.data;
            setQuiz(quiz);
            setQuestions(questions);
            setLoading(false);
        } catch (error) {
            console.error('Server error: ', error);
            setLoading(false);
        }
    };


    const getQuizAttemptData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/attempts/${attemptId}`);
            const { quiz_attempt } = response.data;
            setAttempt(quiz_attempt);
        } catch (error) {
            console.error('Server error: ', error);
        }
    }

    useEffect(() => {
        getQuizzesQuestionsData();
        getQuizAttemptData();
    }, [quizId]);
    console.log('quiz: ', quiz);
    console.log('questions: ', questions);
    console.log('quiz_attempt: ', attempt);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');

    const handleAnswerSelect = (answerId) => {
        const questionId = questions[currentQuestionIndex].id;

        setSelectedAnswer(answerId);

        setAnswers(prev => ({
            ...prev,
            [questionId]: answerId,
        }));

        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                const nextIndex = currentQuestionIndex + 1;
                const nextQuestionId = questions[nextIndex].id;
                setCurrentQuestionIndex(nextIndex);
                setSelectedAnswer(answers[nextQuestionId] || null);
            }, 300);
        }
    };

    const handlePrevious = () => {
        const prevIndex = currentQuestionIndex - 1;
        if (prevIndex >= 0) {
            setCurrentQuestionIndex(prevIndex);
            const prevQuestionId = questions[prevIndex].id;
            setSelectedAnswer(answers[prevQuestionId] || null);
        }
    };

    const handleNext = () => {
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
            const nextQuestionId = questions[nextIndex].id;
            setSelectedAnswer(answers[nextQuestionId] || null);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/answers-attempts/${attemptId}`, {
                answers,
            });
            console.log('answer submitting: ', answers);
            console.log('response answer data: ',response.data);
            const { correct, wrong, skipped } = response.data.data;
            alert(`
                🎉 Nộp bài thành công!\n✅ Đúng: ${correct}\n
                ❌ Sai: ${wrong}\n
                ⏭ Bỏ qua: ${skipped}
            `);
            navigate('/home');
        } catch (error) {
            console.error('Lỗi khi nộp bài:', error);
            alert('Nộp bài thất bại. Vui lòng thử lại!');
        }
    };
        
    useEffect(() => {
        if (!quiz.duration || !attempt.start_time) return;

        const totalTime = quiz.duration * 60 * 1000;
        const start = new Date(attempt.start_time).getTime();
        const end = start + totalTime;

        const interval = setInterval(() => {
            const now = Date.now();
            const diff = Math.max(0, end - now);
            setRemainingTime(diff);

            if (diff <= 0) {
                clearInterval(interval);
                // auto-submit nếu muốn
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [quiz, attempt]);

    const formatTime = (ms) => {
        const totalSec = Math.floor(ms / 1000);
        const min = String(Math.floor(totalSec / 60)).padStart(2, '0');
        const sec = String(totalSec % 60).padStart(2, '0');
        return `${min}:${sec}`;
    };

    if (loading) {
        return (
            <LoadingSpinner/>
        );
    }



    return (
        <div className="min-h-screen bg-CetaceanBlue text-gray-300 p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                <div className='flex justify-between'>

                    <div className="text-lg font-medium">
                        Câu <span className="font-bold text-Emerald">{currentQuestionIndex + 1}</span>/{questions.length}
                        <span className="ml-2 text-gray-500">(Đã trả lời: 0/{questions.length})</span>
                    </div>
                    <div>
                        <span className='text-red-500 font-bold'>Thời gian làm bài: {remainingTime !== null ? formatTime(remainingTime) : '...'}</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3 space-y-4">
                        <div className="bg-white text-black p-5 rounded-2xl shadow-md border border-gray-300">
                            <h2 className="text-xl font-semibold mb-3">{questions[currentQuestionIndex].content}</h2>
                            <div className="space-y-2">
                                {questions[currentQuestionIndex].answers.map((answer) => (
                                    <label
                                        key={answer.id}
                                        className={`flex items-center p-3 rounded-xl border cursor-pointer transition
                                    ${selectedAnswer === answer.id
                                                ? 'bg-emerald-100 border-emerald-400'
                                                : 'bg-gray-100 border-gray-300'}
                                    hover:bg-emerald-50 hover:border-emerald-400`}
                                    >
                                        <input
                                            type="radio"
                                            name="answer"
                                            value={answer.id}
                                            checked={selectedAnswer === answer.id}
                                            onChange={() => handleAnswerSelect(answer.id)}
                                            className="mr-3 accent-emerald-500"
                                        />
                                        {answer.content}
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
                                disabled={currentQuestionIndex === questions.length - 1}
                            >
                                Next
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition disabled:opacity-50"
                            // disabled={answeredCount === 0}
                            >
                                Nộp bài
                            </button>
                        </div>
                    </div>

                    <div className="md:w-1/3">
                        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-5 gap-2">
                            {questions.map((question, index) => {
                                const questionId = question.id;
                                const isAnswered = answers[questionId] !== undefined;
                                const isActive = index === currentQuestionIndex;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setCurrentQuestionIndex(index);
                                            setSelectedAnswer(answers[questionId] || null);
                                        }}
                                        className={`w-9 h-9 rounded-full text-sm font-medium flex items-center justify-center transition
                                        ${isActive ? 'bg-emerald-400 text-black' : 'bg-gray-200 text-black'}
                                        ${isAnswered ? 'border-2 border-emerald-400' : ''}
                                        hover:bg-emerald-500`}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizTest;