import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/User/Header.jsx';
import Footer from '../components/User/Footer.jsx';
import axios from 'axios';
import { BASE_URL } from '../../services/api.jsx';

const QuizDetail = () => {
    const [quiz, setQuiz] = useState({});
    const {id} = useParams();
    const getQuizDataById = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/quiz/${id}`);
            setQuiz(response.data);
        } catch (error) {
            console.error('Không thể lấy data trong trang chi tiết: ', error);
        }
    };

    useEffect(() => {
        getQuizDataById();
    }, []);

    if (!quiz) return <div>Quiz not found</div>;

    const formattedDate = new Date(quiz.createdAt).toLocaleDateString();
    return (
        <div className="min-h-screen bg-CadetBlue text-white">
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
                <div className="bg-gray-100 p-4 rounded-lg text-CetaceanBlue">
                    <p><strong>Thời gian:</strong> {Math.floor(quiz.duration/60)} phút</p>
                    <p><strong>Độ khó:</strong> {quiz.difficulty}</p>
                    <p><strong>Danh mục:</strong> {quiz.major}</p>
                    <p><strong>Ngày tạo:</strong> {formattedDate}</p>
                </div>
                <div className="mt-4">
                    <Link to="/quiz">
                        <button className="mr-2 bg-gray-300 px-4 py-2 rounded">Quay lại</button>
                    </Link>
                    <Link to={``}>
                        <button className="bg-black text-white px-4 py-2 rounded">Bắt đầu làm bài</button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default QuizDetail;