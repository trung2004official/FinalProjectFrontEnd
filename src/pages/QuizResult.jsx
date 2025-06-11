import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const QuizResult = () => {
    const { id } = useParams();
    const quizId = parseInt(id, 10);
    const [result, setResult] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const storedResult = localStorage.getItem(`quizResult_${quizId}_${userData.username}`);
        if (storedResult) {
            setResult(JSON.parse(storedResult));
        }
    }, [quizId]);

    if (!result) return <div>Không tìm thấy kết quả!</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-CetaceanBlue to-CetaceanBlue-dark text-white p-6">
            <div className="max-w-4xl mx-auto space-y-6">

                <h2 className="text-3xl font-bold">{result.title}</h2>
                <div className="text-lg">
                    <span className="font-semibold">Số câu đúng:</span> {result.correctCount}/{result.totalQuestions}
                    <div className="text-center mt-6">
                        <Link to="/quiz">
                            <button className="bg-CetaceanBlue-dark text-white px-6 py-2 rounded-lg hover:bg-CetaceanBlue transition duration-200">
                                Back
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="text-Manatee text-sm">Hoàn thành lúc: {result.completedAt} (+07)</div>

                <div className="space-y-5">
                    {result.questions.map((question, index) => {
                        const isCorrect = result.answers[index] === question.correctAnswer;
                        return (
                            <div
                                key={index}
                                className={`p-4 rounded-xl shadow-lg ${
                                    isCorrect
                                        ? 'bg-Emerald-light/20 text-Emerald-light border border-Emerald'
                                        : 'bg-Amber-dark/10 text-Amber-light border border-Amber'
                                }`}
                            >
                                <h3 className="font-semibold mb-2">Câu {index + 1}: {question.text}</h3>
                                <div className="text-sm mb-1">
                                    <span className="font-medium">Đáp án của bạn:</span>{' '}
                                    {result.answers[index] || <span className="italic text-Manatee-light">Chưa chọn</span>}
                                </div>
                                <div className="text-sm mb-2">
                                    <span className="font-medium">Đáp án đúng:</span> {question.correctAnswer}
                                </div>
                                <div className={`font-bold ${isCorrect ? 'text-Emerald-light' : 'text-Amber-light'}`}>
                                    {isCorrect ? '✔ ĐÚNG' : '✘ SAI'}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default QuizResult;