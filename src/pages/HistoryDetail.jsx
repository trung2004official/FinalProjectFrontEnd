import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/User/Header.jsx';
import Footer from '../components/User/Footer.jsx';
import { quizzes } from '../data.js';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { BASE_URL } from '../../services/api.jsx';

const PAGE_SIZE = 4;

const HistoryDetail = () => {
    const [resultDetails, setResultDetails] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(resultDetails.length / PAGE_SIZE);
    const startIdx = (page - 1) * PAGE_SIZE;
    const endIdx = startIdx + PAGE_SIZE;
    const currentData = resultDetails.slice(startIdx, endIdx);
    const [activeIndex, setActiveIndex] = useState(null);

    // Thống kê cho PieChart
    const location = useLocation();
    const { correct, wrong, skipped } = location.state || {};
    const total = correct + wrong + skipped;

    const pieData = [
        { name: 'Đúng', value: correct, color: 'var(--color-Emerald)' },
        { name: 'Sai', value: wrong, color: 'var(--color-red-400)' },
        { name: 'Bỏ qua', value: skipped, color: 'var(--color-Grey)' },
    ].filter(item => item.value > 0);

    const handlePieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const handleGetAnswerAttempts = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/answers-attempts/${id}`);
            setResultDetails(response.data.data);
        } catch (error) {
            console.error('Server error: ', error);
        }
    }

    useEffect(() => {
        handleGetAnswerAttempts();
    }, [id])

    return (
        <div className="min-h-screen bg-gradient-to-br from-CetaceanBlue-dark to-CadetBlue text-white flex flex-col font-roboto">
            <Header />
            <main className="flex-1 container mx-auto px-6 py-16">
                <div className="max-w-4xl mx-auto bg-CetaceanBlue/95 rounded-3xl shadow-xl p-10 mt-10 transition-all duration-300 hover:shadow-2xl animate-fade-in">
                    <h1 className="text-4xl font-extrabold mb-8 text-center text-white tracking-tight drop-shadow-md">
                        RESULT DETAILS
                    </h1>
                    {/* Biểu đồ tròn tổng quan */}
                    <div className="flex flex-col items-center justify-center p-8">
                        <PieChart width={340} height={260}>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                paddingAngle={0}
                                labelLine={false}
                                activeIndex={activeIndex}
                                activeOuterRadius={110}       
                                onMouseEnter={handlePieEnter}   
                                label={({ name, value, fill }) => (
                                    <tspan style={{ fill }}>{`${name}: ${value}`}</tspan>
                                )}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--color-CetaceanBlue)',
                                    color: 'var(--color-white)',
                                    borderRadius: '8px',
                                }}
                            />
                            <Legend iconType="circle" align="center" verticalAlign="bottom" />
                        </PieChart>
                        <div className="flex gap-6 mt-4 text-lg">
                            <span className="text-Emerald font-bold">Đúng: {correct}</span>
                            <span className="text-red-400 font-bold">Sai: {wrong}</span>
                            <span className="text-Grey font-bold">Bỏ qua: {skipped}</span>
                            <span className="text-white font-bold">Tổng: {total}</span>
                        </div>
                    </div>
                    {/* Bảng từng câu hỏi */}
                    <div className="mt-10">
                        <h2 className="text-2xl font-bold mb-4 text-white">Chi tiết từng câu hỏi</h2>
                        <div className="space-y-6">
                            {currentData.map((item, idx) => (
                                <div
                                    key={item.id}
                                    className={`p-5 rounded-xl shadow flex flex-col gap-2 ${
                                        item.selected_answer_id
                                            ? 'bg-Grey/30'
                                            : item.selected_answer_id === item.Question.answers[0].id
                                            ? 'bg-Emerald/20'
                                            : 'bg-red-400/20'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-lg">Câu {startIdx + idx + 1}:</span>
                                        <span className="text-white">{item.Question.content}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Đáp án của bạn: </span>
                                        <span className={item.selected_answer_id === item.Question.answers[0].id ? "text-Emerald font-bold" : !item.selected_answer_id ? "text-Grey font-bold italic" : "text-red-400 font-bold"}>
                                            {!item.selected_answer_id ? "Bỏ qua" : item.selected_answer.content}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Đáp án đúng: </span>
                                        <span className="text-Amber font-bold">{item.Question.answers[0].content}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Kết quả: </span>
                                        {!item.selected_answer_id ? (
                                            <span className="text-Grey font-bold">Bỏ qua</span>
                                        ) : item.selected_answer_id === item.Question.answers[0].id ? (
                                            <span className="text-Emerald font-bold">Đúng</span>
                                        ) : (
                                            <span className="text-red-400 font-bold">Sai</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Phân trang */}
                        <div className="flex justify-center gap-2 mt-8">
                            <button
                                className="px-4 py-2 rounded bg-Grey-dark text-white font-bold disabled:opacity-50"
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                            >
                                &lt;
                            </button>
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    className={`px-4 py-2 rounded font-bold ${
                                        page === i + 1
                                            ? 'bg-Emerald text-white'
                                            : 'bg-Grey-dark text-white hover:bg-Emerald/60'
                                    }`}
                                    onClick={() => setPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                className="px-4 py-2 rounded bg-Grey-dark text-white font-bold disabled:opacity-50"
                                onClick={() => setPage(page + 1)}
                                disabled={page === totalPages}
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                    <button
                        className="bg-Grey-dark hover:bg-Grey text-white font-medium px-8 py-3 rounded-lg shadow-md transition transform hover:scale-105 mt-10"
                        onClick={() => navigate(-1)}
                    >
                        <i className="fa-solid fa-arrow-left mr-2"></i>Quay lại
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HistoryDetail;