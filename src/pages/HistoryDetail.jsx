import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/User/Header.jsx';
import Footer from '../components/User/Footer.jsx';
import { quizzes } from '../data.js';

// Dữ liệu tạm, bạn có thể truyền qua props hoặc lấy từ API nếu cần
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
            <div className="min-h-screen bg-CadetBlue text-white flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-2xl text-center">Không tìm thấy lịch sử làm bài!</div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-CadetBlue text-white flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto p-6">
                <div className="max-w-xl mx-auto bg-CetaceanBlue-light rounded-xl shadow-lg p-8 mt-8">
                    <h1 className="text-3xl font-bold mb-4 text-center text-Emerald">Chi tiết lịch sử làm bài</h1>
                    <div className="mb-4">
                        <div className="font-semibold text-lg">{quiz ? quiz.title : '---'}</div>
                        <div className="text-sm text-Manatee-light mb-2">
                            Ngày làm: {attempt.completedAt
                                ? new Date(attempt.completedAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
                                : '---'}
                        </div>
                        <div className="flex gap-4 mb-2">
                            <span>Điểm: <span className="font-bold">{attempt.score ?? '--'}</span></span>
                            <span>Kết quả: {attempt.passed
                                ? <span className="text-Emerald font-semibold">Đạt</span>
                                : <span className="text-red-400 font-semibold">Chưa đạt</span>
                            }</span>
                        </div>
                        <div className="flex gap-4 mb-2">
                            <span>Số câu đúng: <span className="font-bold">{attempt.correct}</span></span>
                            <span>Số câu sai: <span className="font-bold">{attempt.wrong}</span></span>
                            <span>Bỏ qua: <span className="font-bold">{attempt.skipped}</span></span>
                        </div>
                        <div className="mb-4">
                            Tổng số câu hỏi: <span className="font-bold">{attempt.total}</span>
                        </div>
                    </div>
                    <button
                        className="bg-Grey-dark hover:bg-Grey text-white font-medium px-6 py-2 rounded-lg shadow-md transition"
                        onClick={() => navigate(-1)}
                    >
                        Quay lại
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HistoryDetail;