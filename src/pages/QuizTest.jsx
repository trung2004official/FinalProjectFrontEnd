import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { quizzes } from '../data.js'; // Điều chỉnh đường dẫn

const QuizTest = () => {
    const { id } = useParams();
    const quizId = parseInt(id, 10);

    // Khởi tạo state
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [timeLeft, setTimeLeft] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [isActive, setIsActive] = useState(false); // Điều khiển timer
    const [showResults, setShowResults] = useState(false); // Hiển thị kết quả

    // Tìm quiz và khởi tạo state
    const quiz = quizzes.find(q => q.id === quizId) || quizzes[0];
    useEffect(() => {
        if (quiz) {
            setTimeLeft(quiz.duration * 60);
            setAnswers(Array(quiz.questions.length).fill(''));
            setIsActive(true); // Bắt đầu timer khi quiz hợp lệ
        } else {
            setTimeLeft(0);
            setIsActive(false); // Tắt timer nếu không có quiz
        }
    }, [quizId, quiz]);

    // Kiểm tra nếu không có quiz hợp lệ
    if (!quiz) return <div>Không tìm thấy bài quiz!</div>;

    // Quản lý timer
    useEffect(() => {
        let timer;
        if (isActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false); // Dừng timer khi hết giờ
        }
        return () => clearInterval(timer); // Dọn dẹp timer
    }, [isActive, timeLeft]);

    // Tính số câu đã trả lời
    const answeredCount = answers.filter(answer => answer !== '').length;
    // Kích hoạt kết quả khi đã trả lời tất cả câu hỏi
    useEffect(() => {
        if (answeredCount === quiz.questions.length) {
            setShowResults(true);
        }
    }, [answeredCount, quiz.questions.length]);

    // Tính số câu đúng
    const calculateCorrectAnswers = () => {
        return answers.reduce((count, answer, index) => {
            return answer === quiz.questions[index].correctAnswer ? count + 1 : count;
        }, 0);
    };

    const correctCount = calculateCorrectAnswers();

    // Xử lý chọn đáp án
    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = answer;
        setAnswers(newAnswers);

        if (currentQuestionIndex < quiz.questions.length - 1 && !showResults) {
            setTimeout(() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(answers[currentQuestionIndex + 1] || '');
            }, 300);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0 && !showResults) setCurrentQuestionIndex(currentQuestionIndex - 1);
        setSelectedAnswer(answers[currentQuestionIndex - 1] || '');
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1 && !showResults) setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(answers[currentQuestionIndex + 1] || '');
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="min-h-screen bg-CadetBlue text-white p-6">
            {!showResults ? (
                <>
                    <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
                    <div className="text-red-500 mb-4">Thời gian: {formatTime(timeLeft)} - Câu {currentQuestionIndex + 1}/{quiz.questions.length} (Đã trả lời: {answeredCount}/{quiz.questions.length})</div>
                    <div className="flex flex-row justify-between">
                        <div className="w-2/3 pr-4">
                            <div className="bg-white text-black p-4 rounded-lg mb-4">
                                <h2 className="text-lg mb-2">{quiz.questions[currentQuestionIndex].text}</h2>
                                {quiz.questions[currentQuestionIndex].options.map((option, index) => (
                                    <div key={index} className="mb-2">
                                        <label className="flex items-center p-2 bg-gray-200 rounded">
                                            <input
                                                type="radio"
                                                name="answer"
                                                value={option}
                                                checked={selectedAnswer === option}
                                                onChange={() => handleAnswerSelect(option)}
                                                className="mr-2"
                                                disabled={showResults}
                                            />
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mb-4">
                                <button
                                    onClick={handlePrevious}
                                    className="bg-gray-300 text-black p-2 rounded"
                                    disabled={currentQuestionIndex === 0 || showResults}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="bg-gray-300 text-black p-2 rounded"
                                    disabled={currentQuestionIndex === quiz.questions.length - 1 || showResults}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                        <div className="w-1/3">
                            <div className="grid grid-cols-10 gap-2">
                                {Array.from({ length: quiz.questions.length }, (_, index) => (
                                    <div
                                        key={index}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                            index === currentQuestionIndex ? 'bg-purple-600' : 'bg-gray-300'
                                        } ${answers[index] ? 'border-2 border-green-500' : ''}`}
                                    >
                                        {index + 1}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="bg-white text-black p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Kết quả</h2>
                    <p className="text-lg mb-4">Số câu đúng: {correctCount}/{quiz.questions.length}</p>
                    <div>
                        {quiz.questions.map((question, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="text-md font-semibold">Câu {index + 1}: {question.text}</h3>
                                <p>Đáp án của bạn: {answers[index] || 'Chưa chọn'}</p>
                                <p>Đáp án đúng: {question.correctAnswer}</p>
                                {answers[index] === question.correctAnswer ? (
                                    <span className="text-green-500">Đúng</span>
                                ) : (
                                    <span className="text-red-500">Sai</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizTest;