import React, { useEffect, useState } from 'react';
import Header from '../components/User/Header.jsx';
import Footer from '../components/User/Footer.jsx';
import { quizzes } from '../data.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../contexts/UserContext.jsx';
import { BASE_URL } from '../../services/api.jsx';

const History = () => {
    const navigate = useNavigate();
    const {user} = useUser();
    const [results, setResults] = useState([]);

    const getResultData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/attempts/user-history/${user.id}`);
            console.log(response.data)
            setResults(response.data.attempts);
        } catch (error) {
            console.error('Server Error: ', error);
        }
    }

    useEffect(() => {
        getResultData();
        console.log( 'result: ',results);
    },[]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-CetaceanBlue-dark to-CadetBlue text-white flex flex-col font-roboto">
            <Header />
            <main className="flex-1 container mx-auto px-6 py-16">
                <h1 className="text-5xl font-extrabold mb-12 text-center text-white tracking-tight drop-shadow-md">
                    QUIZ HISTORY
                </h1>
                <div className="max-w-4xl mx-auto space-y-8">
                    {results.length === 0 ? (
                        <div className="text-center text-Grey-light text-xl italic bg-CetaceanBlue/50 rounded-xl p-6 shadow-md">
                            Chưa có lịch sử làm bài.
                        </div>
                    ) : (
                        results.map((result, idx) => (
                                <div
                                    key={result.id}
                                    className="bg-CetaceanBlue/95 rounded-2xl shadow-xl p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-CetaceanBlue animate-fade-in"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <i className="fa-solid fa-file-lines text-Emerald text-xl"></i>
                                            <span className="font-bold text-2xl text-white">
                                                {result.Quiz.title}
                                            </span>
                                        </div>
                                        <span className="text-sm text-Manatee-light bg-Grey-dark/50 px-3 py-1 rounded-full">
                                            {result.end_time
                                                ? new Date(result.end_time).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
                                                : '---'}
                                        </span>
                                    </div>
                                    <div className="flex gap-8 flex-wrap">
                                        {/* <span className="text-Grey-light text-lg">
                                            Điểm: <span className="font-bold text-Emerald">{attempt.score ?? '--'}</span>
                                        </span> */}
                                        <span className="text-Grey-light text-lg">
                                            Đúng: <span className="font-bold text-Emerald">{result.correct}</span>
                                        </span>
                                        <span className="text-Grey-light text-lg">
                                            Sai: <span className="font-bold text-red-400">{result.wrong}</span>
                                        </span>
                                        <span className="text-Grey-light text-lg">
                                            Bỏ qua: <span className="font-bold text-Grey">{result.skipped}</span>
                                        </span>
                                        <span className="text-Grey-light text-lg">
                                            Tổng: <span className="font-bold">{result.correct + result.wrong + result.skipped}</span>
                                        </span>
                                        <span className="text-Grey-light text-lg flex items-center gap-2">
                                            Kết quả:{' '}
                                            <span
                                                className={`font-semibold px-3 py-1 rounded-full ${
                                                    result.correct >= 20
                                                        ? 'bg-Emerald/20 text-Emerald-light'
                                                        : 'bg-red-400/20 text-red-400'
                                                }`}
                                            >
                                                {result.correct >= 20 ? 'Đạt' : 'Chưa đạt'}
                                            </span>
                                        </span>
                                    </div>
                                    <span
                                        className="text-Emerald hover:text-Emerald-light font-medium text-lg cursor-pointer transition duration-200 hover:underline"
                                    onClick={() => navigate(`/history/${result.id}`, {
                                        state: {
                                            correct: result.correct,
                                            wrong: result.wrong,
                                            skipped: result.skipped,
                                        }
                                    })}
                                    >
                                        <i className="fa-solid fa-eye mr-2"></i>Xem chi tiết
                                    </span>
                                </div>
                            )
                        )
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default History;