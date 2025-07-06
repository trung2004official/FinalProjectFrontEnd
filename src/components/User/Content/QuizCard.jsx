import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../services/api';

const QuizCard = ({ id, title, duration, difficulty, major, rating, isFavorite = false }) => {
    const navigate = useNavigate();
    const [favorite, setFavorite] = useState(isFavorite); 

    const handleStartQuiz = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
        }

        try {
            const decoded = jwtDecode(token);
            const user_id = decoded.id;

            const response = await axios.post(`${BASE_URL}/api/attempts/start`, {
                user_id: user_id,
                quiz_id: id,
            });

            const attemptId = response.data.attempt_id;

            navigate(`/quizzes-questions/${id}?attemptId=${attemptId}`);
        } catch (error) {
            console.error('Lỗi khi bắt đầu làm bài: ', error);
        }
    };

    const handleFavorite = () => {
        setFavorite(prev => !prev);
    };

    return (
        <div className="relative bg-PurpleNavy p-6 rounded-lg shadow-md flex flex-col justify-between h-64 group">
            <button
                className="absolute top-3 right-3 z-10 bg-white/10 rounded-full p-2 hover:bg-white/80 transition"
                title="Yêu thích"
                onClick={handleFavorite}
            >
                <i className={`fa-solid fa-heart text-lg transition ${favorite ? 'text-red-500' : 'text-white'}`}></i>
            </button>
            <div className="flex-grow flex items-center justify-center">
                <h3 className="text-xl text-Manatee-light text-center">{title}</h3>
            </div>
            <div className="flex items-center justify-between mt-4">
                <div className="text-Grey-dark text-sm">{major}</div>
                <div className="flex items-center gap-1 ml-2">
                    <i className="fa-solid fa-star text-yellow-400 text-sm"></i>
                    <span className="text-white text-xs font-semibold">
                        {typeof rating !== 'undefined' ? rating.toFixed(1) : '4.5'}
                    </span>
                    <span className="text-Grey-light text-xs">/5</span>
                </div>
            </div>
            <div className="absolute inset-0 bg-CetaceanBlue bg-opacity-90 p-6 rounded-lg flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg text-white font-bold mb-2">{title}</h3>
                <p className="text-white text-sm mb-2">Thời gian quy định: {duration} phút</p>
                <p className="text-Manatee text-sm mb-4">Độ khó: {difficulty}</p>
                <div className="flex space-x-4">
                    <button className="bg-Emerald cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-Emerald-dark transition duration-200" onClick={handleStartQuiz}>
                        Làm bài thi
                    </button>
                    <Link to={`/quiz/${id}`}>
                        <button className="bg-CetaceanBlue-light cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-CetaceanBlue-dark transition duration-200">
                            Xem chi tiết
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default QuizCard;