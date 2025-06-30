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
        <div className="min-h-screen bg-gradient-to-br from-CetaceanBlue-dark to-CadetBlue text-white flex flex-col font-roboto">
            <Header />
            <main className="flex-1 container mx-auto px-6 py-16">
                <h1 className="text-5xl font-extrabold mb-12 text-center text-Emerald tracking-tight drop-shadow-md">
                    Lịch Sử Làm Bài
                </h1>
                <div className="max-w-4xl mx-auto space-y-8">
                    {mockAttempts.length === 0 ? (
                        <div className="text-center text-Grey-light text-xl italic bg-CetaceanBlue/50 rounded-xl p-6 shadow-md">
                            Chưa có lịch sử làm bài.
                        </div>
                    ) : (
                        mockAttempts.map((attempt, idx) => {
                            const quiz = quizzes.find(q => q.id === attempt.quizId);
                            return (
                                <div
                                    key={attempt.id}
                                    className="bg-CetaceanBlue/95 rounded-2xl shadow-xl p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-CetaceanBlue animate-fade-in"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <i className="fa-solid fa-file-lines text-Emerald text-xl"></i>
                                            <span className="font-bold text-2xl text-white">
                                                {quiz ? quiz.title : '---'}
                                            </span>
                                        </div>
                                        <span className="text-sm text-Manatee-light bg-Grey-dark/50 px-3 py-1 rounded-full">
                                            {attempt.completedAt
                                                ? new Date(attempt.completedAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
                                                : '---'}
                                        </span>
                                    </div>
                                    <div className="flex gap-10">
                                        <span className="text-Grey-light text-lg">
                                            Điểm: <span className="font-bold text-Emerald">{attempt.score ?? '--'}</span>
                                        </span>
                                        <span className="text-Grey-light text-lg flex items-center gap-2">
                                            Kết quả:{' '}
                                            <span
                                                className={`font-semibold px-3 py-1 rounded-full ${
                                                    attempt.passed
                                                        ? 'bg-Emerald/20 text-Emerald-light'
                                                        : 'bg-red-400/20 text-red-400'
                                                }`}
                                            >
                                                {attempt.passed ? 'Đạt' : 'Chưa đạt'}
                                            </span>
                                        </span>
                                    </div>
                                    <span
                                        className="text-Emerald hover:text-Emerald-light font-medium text-lg cursor-pointer transition duration-200 hover:underline"
                                        onClick={() => navigate(`/history/${attempt.id}`)}
                                    >
                                        <i className="fa-solid fa-eye mr-2"></i>Xem chi tiết
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