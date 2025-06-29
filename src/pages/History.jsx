import React from 'react';
import Header from '../components/User/Header.jsx';
import Footer from '../components/User/Footer.jsx';
import { quizzes } from '../data.js';
import { useNavigate } from 'react-router-dom';

const mockAttempts = [
    {
        id: 1,
        quizId: 2,
        score: 9,
        passed: true,
        completedAt: '2025-06-28T14:00:00',
    },
    {
        id: 2,
        quizId: 4,
        score: 4,
        passed: false,
        completedAt: '2025-06-25T09:30:00',
    },
    {
        id: 3,
        quizId: 1,
        score: 8,
        passed: true,
        completedAt: '2025-06-20T19:10:00',
    },
];

const History = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-CetaceanBlue to-CadetBlue text-white flex flex-col font-roboto">
            <Header />
            <main className="flex-1 container mx-auto px-6 py-12">
                <h1 className="text-4xl font-extrabold mb-10 text-center text-Emerald tracking-tight">
                    Lịch Sử Làm Bài
                </h1>
                <div className="max-w-3xl mx-auto space-y-6">
                    {mockAttempts.length === 0 ? (
                        <div className="text-center text-Grey-light text-lg italic">
                            Chưa có lịch sử làm bài.
                        </div>
                    ) : (
                        mockAttempts.map((attempt, idx) => {
                            const quiz = quizzes.find(q => q.id === attempt.quizId);
                            return (
                                <div
                                    key={attempt.id}
                                    className="bg-CetaceanBlue/90 rounded-2xl shadow-lg p-6 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-CetaceanBlue animate-fade-in"
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-xl text-white">
                                            {quiz ? quiz.title : '---'}
                                        </span>
                                        <span className="text-sm text-Manatee-light">
                                            {attempt.completedAt
                                                ? new Date(attempt.completedAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
                                                : '---'}
                                        </span>
                                    </div>
                                    <div className="flex gap-8">
                                        <span className="text-Grey-light">
                                            Điểm: <span className="font-bold text-Emerald">{attempt.score ?? '--'}</span>
                                        </span>
                                        <span className="text-Grey-light">
                                            Kết quả:{' '}
                                            {attempt.passed ? (
                                                <span className="text-Emerald-light font-semibold">Đạt</span>
                                            ) : (
                                                <span className="text-red-400 font-semibold">Chưa đạt</span>
                                            )}
                                        </span>
                                    </div>
                                    <span
                                        className="text-Emerald hover:text-Emerald-light font-medium cursor-pointer transition duration-200 hover:underline"
                                        onClick={() => navigate(`/history/${attempt.id}`)}
                                    >
                                        Xem chi tiết
                                    </span>
                                </div>
                            );
                        })
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default History;