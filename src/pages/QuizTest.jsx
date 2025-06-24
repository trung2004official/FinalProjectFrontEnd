
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../services/api.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Swal from 'sweetalert2';

const QuizTest = () => {
    const { quizId } = useParams();
    const [searchParams] = useSearchParams();
    const attemptId = searchParams.get('attemptId');
    const [quiz, setQuiz] = useState({});
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [remainingTime, setRemainingTime] = useState(null);
    const [attempt, setAttempt] = useState({});
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');

    const getQuizzesQuestionsData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/quizzes-questions/${quizId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
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
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/api/attempts/${attemptId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const { quiz_attempt } = response.data;
            setAttempt(quiz_attempt);
        } catch (error) {
            console.error('Server error: ', error);
        }
    };

    useEffect(() => {
        getQuizzesQuestionsData();
        getQuizAttemptData();
    }, [quizId]);

    const handleAnswerSelect = (answerId) => {
        const questionId = questions[currentQuestionIndex].id;
        setSelectedAnswer(answerId);
        setAnswers((prev) => ({
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
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${BASE_URL}/api/answers-attempts/${attemptId}`,
                { answers },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const { correct, wrong, skipped } = response.data.data;
            // Swal.fire({
            //     title: 'Nộp bài thành công!',
            //     html: `✅ Đúng: ${correct}<br>❌ Sai: ${wrong}<br>⏭ Bỏ qua: ${skipped}`,
            //     icon: 'success',
            //     confirmButtonColor: '#2E7D32', // Emerald
            // }).then(() => {
                navigate('/quiz/result', {
                    state: { correct, wrong, skipped,questions, quizId, attemptId },
                })
            // });
        } catch (error) {
            console.error('Lỗi khi nộp bài:', error);
            Swal.fire({
                title: 'Nộp bài thất bại',
                text: 'Vui lòng thử lại!',
                icon: 'error',
                confirmButtonColor: '#2E7D32',
            });
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
                handleSubmit();
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
        return <LoadingSpinner />;
    }

    const answeredCount = Object.keys(answers).length;
    const progressPercentage = (answeredCount / questions.length) * 100;

    return (
        <div className="min-h-screen bg-CetaceanBlue flex justify-center items-center p-4 sm:p-6 font-roboto">
            <div className="w-full max-w-6xl space-y-8 animate-fade-in">
                {/* Progress Bar */}
                <div className="w-full bg-PurpleNavy rounded-full h-3">
                    <div
                        className="bg-Emerald h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>

                {/* Header Info */}
                <div className="flex flex-col sm:flex-row justify-between items-center bg-CetaceanBlue-dark p-5 rounded-xl shadow-md">
                    <div className="text-xl font-medium mb-2 sm:mb-0">
                        Câu <span className="font-bold text-Amber">{currentQuestionIndex + 1}</span>/{questions.length}
                        <span className="ml-2 text-Manatee">(Đã trả lời: {answeredCount}/{questions.length})</span>
                    </div>
                    <div className="text-xl font-medium">
                        <span className="text-Emerald font-bold">Thời gian: {remainingTime !== null ? formatTime(remainingTime) : '...'}</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3 space-y-6">
                        <div className="bg-PurpleNavy p-8 rounded-2xl shadow-xl border border-PurpleNavy-dark transform transition-all duration-300 animate-slide-up min-h-[400px]">
                            <h2 className="text-2xl font-semibold mb-6 text-white">{questions[currentQuestionIndex].content}</h2>
                            <div className="space-y-4">
                                {questions[currentQuestionIndex].answers.map((answer) => (
                                    <label
                                        key={answer.id}
                                        className={`flex items-center p-5 rounded-xl border cursor-pointer transition-all duration-200
                      ${selectedAnswer === answer.id ? 'bg-Emerald border-Emerald-dark' : 'bg-PurpleNavy-light border-PurpleNavy-dark'}
                      hover:bg-Emerald-light hover:border-Emerald-dark`}
                                    >
                                        <input
                                            type="radio"
                                            name="answer"
                                            value={answer.id}
                                            checked={selectedAnswer === answer.id}
                                            onChange={() => handleAnswerSelect(answer.id)}
                                            className="mr-4 accent-Emerald w-6 h-6"
                                        />
                                        <span className="text-white text-lg">{answer.content}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-between">
                            <button
                                onClick={handlePrevious}
                                className="px-6 py-3 bg-PurpleNavy hover:bg-PurpleNavy-light text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                                disabled={currentQuestionIndex === 0}
                            >
                                Trước
                            </button>
                            <button
                                onClick={handleNext}
                                className="px-6 py-3 bg-PurpleNavy hover:bg-PurpleNavy-light text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                                disabled={currentQuestionIndex === questions.length - 1}
                            >
                                Tiếp
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-3 bg-Emerald hover:bg-Emerald-dark text-white rounded-lg transition-all duration-200 transform hover:scale-105 text-lg"
                            >
                                Nộp bài
                            </button>
                        </div>
                    </div>

                    <div className="lg:w-1/3">
                        <div className="bg-PurpleNavy p-6 rounded-2xl shadow-xl border border-PurpleNavy-dark">
                            <h3 className="text-xl font-semibold mb-4 text-white">Danh sách câu hỏi</h3>
                            <div className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-5 gap-3">
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
                                            className={`w-12 h-12 rounded-full text-base font-medium flex items-center justify-center transition-all duration-200
                        ${isActive ? 'bg-Manatee-light text-black' : isAnswered ? 'bg-Emerald text-white' : 'bg-PurpleNavy-light text-white'}
                        hover:${isAnswered ? 'bg-Emerald-light' : 'bg-Amber-light'} hover:text-black`}
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
        </div>
    );
};

export default QuizTest;