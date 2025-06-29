import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../components/User/Header.jsx';
import Footer from '../components/User/Footer.jsx';
import axios from 'axios';
import { BASE_URL } from '../../services/api.jsx';
import FeedBack from '../components/User/Content/FeedBack.jsx';

const QuizDetail = () => {
    const [quiz, setQuiz] = useState({});
    const [favorite, setFavorite] = useState(false); // Thêm state cho favorite
    const { id } = useParams();
    const navigate = useNavigate();

    const getQuizDataById = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/quizzes/${id}`);
            setQuiz(response.data);
        } catch (error) {
            console.error('Không thể lấy data trong trang chi tiết: ', error);
        }
    };

    useEffect(() => {
        getQuizDataById();
    }, [id]);

    if (!quiz) return <div className="text-center text-Grey text-xl mt-20">Quiz not found</div>;

    const formattedDate = quiz.createdAt
        ? new Date(quiz.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
        : '';

    const handleStartQuiz = () => {
        navigate(`/quizzes-questions/${id}`);
    };

    return (
        <div className="min-h-screen bg-CadetBlue text-white flex flex-col font-roboto">
            <Header />
            <main className="flex-grow flex items-center justify-center py-12 px-4">
                <div className="bg-CetaceanBlue-light p-8 rounded-2xl shadow-xl max-w-2xl w-full mx-auto relative transform transition duration-300 hover:shadow-2xl">
                    {/* Rating badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-CadetBlue/80 px-3 py-1 rounded-full shadow-md text-sm z-10">
                        <i className="fa-solid fa-star text-yellow-400"></i>
                        <span className="font-bold">
                            {quiz.comments && quiz.comments.length > 0
                                ? (
                                    quiz.comments.reduce((sum, cmt) => sum + (cmt.rating || 0), 0) /
                                    quiz.comments.filter(cmt => cmt.rating).length
                                ).toFixed(1)
                                : '0.0'}
                        </span>
                        <span className="text-Grey-light">/ 5</span>
                    </div>

                    {/* Quiz Title */}
                    <h1 className="text-4xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
                        <i className="fa-regular fa-file-lines text-Emerald"></i>
                        {quiz.title || 'Quiz Title'}
                    </h1>

                    {/* Quiz Info */}
                    <div className="bg-gradient-to-r from-CadetBlue/50 to-Grey/50 p-6 rounded-xl mb-6 shadow-sm flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <i className="fa-regular fa-clock text-lg text-Emerald-light"></i>
                            <span className="font-medium">
                                Thời gian: <span className="text-Grey-light">{quiz.duration || 0} phút</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="fa-regular fa-gem text-lg text-Emerald-light"></i>
                            <span className="font-medium">
                                Độ khó: <span className="text-Grey-light">{quiz.difficulty || 'N/A'}</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="fa-regular fa-layer-group text-lg text-Emerald-light"></i>
                            <span className="font-medium">
                                Danh mục: <span className="text-Grey-light">{quiz.major || 'N/A'}</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="fa-regular fa-calendar-days text-lg text-Emerald-light"></i>
                            <span className="font-medium">
                                Ngày tạo: <span className="text-Grey-light">{formattedDate}</span>
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4 mt-6">
                        <Link to="/quiz">
                            <button className="bg-Grey-dark hover:bg-Grey text-white font-medium px-6 py-2 rounded-lg shadow-md transition transform hover:scale-105">
                                <i className="fa-solid fa-arrow-left mr-2"></i>Quay lại
                            </button>
                        </Link>
                        <button
                            className="bg-Emerald hover:bg-Emerald-dark text-white font-medium px-6 py-2 rounded-lg shadow-md transition transform hover:scale-105"
                            onClick={handleStartQuiz}
                        >
                            <i className="fa-solid fa-play mr-2"></i>Bắt đầu làm bài
                        </button>
                    </div>

                    {/* Feedback Section */}
                    <div className="mt-10 border-t border-CadetBlue pt-6">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <i className="fa-regular fa-star text-Emerald-light"></i> Phản hồi người dùng
                        </h2>
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                            {(quiz.comments || []).length === 0 ? (
                                <div className="text-Grey italic text-center">Chưa có phản hồi nào.</div>
                            ) : (
                                quiz.comments.map((cmt, idx) => (
                                    <FeedBack
                                        key={idx}
                                        username={cmt.username || "Ẩn danh"}
                                        avatar={cmt.avatar}
                                        date={cmt.date}
                                        rating={cmt.rating}
                                        text={cmt.text}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default QuizDetail;