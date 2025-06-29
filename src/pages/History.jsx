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
        <div className="min-h-screen bg-CadetBlue text-white flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-8 text-center text-Emerald">Lịch sử làm bài</h1>
                <div className="space-y-4 max-w-xl mx-auto">
                    {mockAttempts.map((attempt, idx) => {
                        const quiz = quizzes.find(q => q.id === attempt.quizId);
                        return (
                            <div
                                key={attempt.id}
                                className="bg-CetaceanBlue-light rounded-xl shadow p-4 flex flex-col gap-2"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-lg">{quiz ? quiz.title : '---'}</span>
                                    <span className="text-sm text-Manatee-light">
                                        {attempt.completedAt
                                            ? new Date(attempt.completedAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
                                            : '---'}
                                    </span>
                                </div>
                                <div className="flex gap-6 mt-1">
                                    <span>Điểm: <span className="font-bold">{attempt.score ?? '--'}</span></span>
                                    <span>Kết quả: {attempt.passed
                                        ? <span className="text-Emerald font-semibold">Đạt</span>
                                        : <span className="text-red-400 font-semibold">Chưa đạt</span>
                                    }</span>
                                </div>
                                <span
                                    className="text-Emerald hover:underline cursor-pointer"
                                    onClick={() => navigate(`/history/${attempt.id}`)}
                                >
                                    Xem chi tiết
                                </span>
                            </div>
                        );
                    })}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default History;