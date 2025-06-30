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
            <div className="min-h-screen bg-gradient-to-br from-CetaceanBlue-dark to-CadetBlue text-white flex flex-col font-roboto">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-3xl text-center text-Grey-light bg-CetaceanBlue/50 rounded-xl p-6 shadow-md">
                        Không tìm thấy lịch sử làm bài!
                    </div>
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
        <div className="min-h-screen bg-gradient-to-br from-CetaceanBlue-dark to-CadetBlue text-white flex flex-col font-roboto">
            <Header />
            <main className="flex-1 container mx-auto px-6 py-16">
                <div className="max-w-4xl mx-auto bg-CetaceanBlue/95 rounded-3xl shadow-xl p-10 mt-10 transition-all duration-300 hover:shadow-2xl animate-fade-in">
                    <h1 className="text-5xl font-extrabold mb-8 text-center text-Emerald tracking-tight drop-shadow-md">
                        Chi Tiết Lịch Sử
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Thông tin chi tiết */}
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-file-lines text-Emerald text-2xl"></i>
                                <span className="font-bold text-2xl text-white">{quiz ? quiz.title : '---'}</span>
                            </div>
                            <div className="text-base text-Manatee-light bg-Grey-dark/50 px-3 py-1 rounded-full inline-block">
                                Ngày làm: {formattedDate}
                            </div>
                            <div className="flex flex-col gap-4 bg-CetaceanBlue-light/50 p-6 rounded-xl shadow-sm">
                                <div className="flex gap-8">
                                    <span className="text-Grey-light text-lg">
                                        Điểm: <span className="font-bold text-Emerald">{attempt.score ?? '--'}</span>
                                    </span>
                                    <span className="text-Grey-light text-lg">
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
                                <div className="flex gap-8">
                                    <span className="text-Grey-light text-lg">
                                        Số câu đúng:{' '}
                                        <span className="font-bold text-Emerald">{attempt.correct}</span>
                                    </span>
                                    <span className="text-Grey-light text-lg">
                                        Số câu sai:{' '}
                                        <span className="font-bold text-red-400">{attempt.wrong}</span>
                                    </span>
                                    <span className="text-Grey-light text-lg">
                                        Bỏ qua: <span className="font-bold text-Grey">{attempt.skipped}</span>
                                    </span>
                                </div>
                                <div className="text-Grey-light text-lg">
                                    Tổng số câu hỏi: <span className="font-bold">{attempt.total}</span>
                                </div>
                            </div>
                            <button
                                className="bg-Grey-dark hover:bg-Grey text-white font-medium px-8 py-3 rounded-lg shadow-md transition transform hover:scale-105 mt-4"
                                onClick={() => navigate(-1)}
                            >
                                <i className="fa-solid fa-arrow-left mr-2"></i>Quay lại
                            </button>
                        </div>
                        {/* Biểu đồ tròn */}
                        <div className="flex flex-col items-center justify-center p-6 bg-CetaceanBlue/50 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
                            <PieChart width={360} height={280}>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={110}
                                    paddingAngle={0}
                                    labelLine={false}
                                    label={({ name, value }) => `${name}: ${value} (${((value / attempt.total) * 100).toFixed(0)}%)`}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                            className="transition-all duration-300 hover:opacity-80"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--color-CetaceanBlue)',
                                        color: 'var(--color-white)',
                                        borderRadius: '8px',
                                        border: 'none',
                                        padding: '8px',
                                    }}
                                />
                                <Legend
                                    iconType="circle"
                                    align="center"
                                    verticalAlign="bottom"
                                    iconSize={12}
                                    wrapperStyle={{ color: 'var(--color-Grey-light)', paddingTop: '10px' }}
                                />
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