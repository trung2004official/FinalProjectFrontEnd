import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../services/api';

const QuizCard = ({ id, title, duration, difficulty, major }) => {
    const navigate = useNavigate();

    const handleStartQuiz = async () => {
        const token = localStorage.getItem('token');

        if(!token) {
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
    }

    return (
        <div className="relative bg-PurpleNavy p-6 rounded-lg shadow-md flex flex-col justify-between h-64 group">
            <div className="flex-grow flex items-center justify-center">
                <h3 className="text-xl text-Manatee-light text-center">{title}</h3>
            </div>
            <div className="text-Grey-dark text-sm mt-4">{major}</div>
            {/* Overlay khi hover */}
            <div className="absolute inset-0 bg-CetaceanBlue bg-opacity-90 p-6 rounded-lg flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg text-white font-bold mb-2">{title}</h3>
                <p className="text-white text-sm mb-2">Thời gian quy định: {duration} phút</p>
                <p className="text-Manatee text-sm mb-4">Độ khó: {difficulty}</p>
                <div className="flex space-x-4">
                    <button className="bg-Emerald text-white py-2 px-4 rounded-lg hover:bg-Emerald-dark transition duration-200" onClick={handleStartQuiz}>
                        Làm bài thi
                    </button>
                    <Link to={`/quiz/${id}`}>
                        <button className="bg-CetaceanBlue-light text-white py-2 px-4 rounded-lg hover:bg-CetaceanBlue-dark transition duration-200">
                            Xem chi tiết
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default QuizCard;