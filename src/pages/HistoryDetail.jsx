import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/User/Header.jsx';
import Footer from '../components/User/Footer.jsx';
import { quizzes } from '../data.js';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const mockAttempts = [
    {
        id: 1,
        quizId: 2,
        score: 9,
        passed: true,
        completedAt: '2025-06-28T14:00:00',
        correct: 9,
        wrong: 1,
        skipped: 0,
        total: 10,
    },
    {
        id: 2,
        quizId: 4,
        score: 4,
        passed: false,
        completedAt: '2025-06-25T09:30:00',
        correct: 4,
        wrong: 5,
        skipped: 1,
        total: 10,
    },
    {
        id: 3,
        quizId: 1,
        score: 8,
        passed: true,
        completedAt: '2025-06-20T19:10:00',
        correct: 8,
        wrong: 2,
        skipped: 0,
        total: 10,
    },
];

const HistoryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const attempt = mockAttempts.find(a => a.id === Number(id));
    const quiz = quizzes.find(q => q.id === attempt?.quizId);

    if (!attempt) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-CetaceanBlue to-CadetBlue text-white flex flex-col font-roboto">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-2xl text-center text-Grey-light">Không tìm thấy lịch sử làm bài!</div>
                </main>
                <Footer />
            </div>
        );
    }

    const formattedDate = attempt.completedAt
        ? new Date(attempt.completedAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
        : '---';

    // Dữ liệu cho biểu đồ tròn
    const pieData = [
        { name: 'Đúng', value: attempt.correct, color: 'var(--color-Emerald)' },
        { name: 'Sai', value: attempt.wrong, color: 'var(--color-red-400)' },
        { name: 'Bỏ qua', value: attempt.skipped, color: 'var(--color-Grey)' },
    ].filter(item => item.value > 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-CetaceanBlue to-CadetBlue text-white flex flex-col font-roboto">
            <Header />
            <main className="flex-1 container mx-auto px-6 py-12">
                <div className="max-w-3xl mx-auto bg-CetaceanBlue/90 rounded-2xl shadow-lg p-8 mt-8 transition-all duration-300 hover:shadow-xl animate-fade-in">
                    <h1 className="text-4xl font-extrabold mb-6 text-center text-Emerald tracking-tight">
                        Chi Tiết Lịch Sử Làm Bài
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Thông tin chi tiết */}
                        <div className="flex flex-col gap-4">
                            <div className="font-bold text-xl text-white">{quiz ? quiz.title : '---'}</div>
                            <div className="text-sm text-Manatee-light mb-2">
                                Ngày làm: {formattedDate}
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-6">
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
                                <div className="flex gap-6">
                                    <span className="text-Grey-light">
                                        Số câu đúng: <span className="font-bold text-Emerald">{attempt.correct}</span>
                                    </span>
                                    <span className="text-Grey-light">
                                        Số câu sai: <span className="font-bold text-red-400">{attempt.wrong}</span>
                                    </span>
                                    <span className="text-Grey-light">
                                        Bỏ qua: <span className="font-bold text-Grey">{attempt.skipped}</span>
                                    </span>
                                </div>
                                <div className="text-Grey-light">
                                    Tổng số câu hỏi: <span className="font-bold">{attempt.total}</span>
                                </div>
                            </div>
                            <button
                                className="bg-Grey-dark hover:bg-Grey text-white font-medium px-6 py-2 rounded-lg shadow-md transition transform hover:scale-105 mt-4"
                                onClick={() => navigate(-1)}
                            >
                                <i className="fa-solid fa-arrow-left mr-2"></i>Quay lại
                            </button>
                        </div>
                        {/* Biểu đồ tròn */}
                        <div className="flex justify-center">
                            <PieChart width={300} height={200}>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--color-CetaceanBlue)',
                                        color: 'var(--color-white)',
                                        borderRadius: '8px',
                                    }}
                                />
                                <Legend />
                            </PieChart>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HistoryDetail;