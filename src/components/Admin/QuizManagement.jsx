import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../services/api';

const QuizManagement = () => {
    const [quizzes, setQuizzes] = useState([]);

    const getQuizData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/quizzes`);
            console.log(response.data);
            setQuizzes(response.data);
        } catch (error) {
            console.error('Server error: ', error);
        }
    }

    useEffect(() => {
        getQuizData();
    }, []);

    const addQuiz = () => {
        setQuizzes([...quizzes, { id: quizzes.length + 1, title: `Đề thi mới ${quizzes.length + 1}`, questions: 0 }]);
    };

    const editQuiz = (id, newTitle) => {
        setQuizzes(quizzes.map(quiz => quiz.id === id ? { ...quiz, title: newTitle } : quiz));
    };

    const deleteQuiz = (id) => {
        setQuizzes(quizzes.filter(quiz => quiz.id !== id));
    };

    return (
        <div className="bg-PurpleNavy-light p-6 rounded-lg shadow-lg">
            <div className='flex justify-between mb-4'>
                <h2 className="text-2xl text-CetaceanBlue-dark font-semibold mb-4">Quản lý đề thi</h2>
                <button
                    className="bg-CetaceanBlue hover:bg-CetaceanBlue-dark text-white font-bold px-4 py-2 rounded-lg mb-4"
                    // onClick={addQuiz}
                >
                    + Thêm đề thi
                </button>
            </div>
            <table className="w-full text-left bg-CetaceanBlue rounded-lg ">
                <thead className=''>
                    <tr className="border-b border-gray-600">
                        <th className="p-2">Tiêu đề</th>
                        <th className='p-2'>Độ khó</th>
                        <th className='p-2'>Chuyên ngành</th>
                        <th className='p-2'>Thời gian làm bài</th>
                        <th className='p-2'>Trạng thái</th>
                        <th className="p-2">Số câu hỏi</th>
                        <th className='p-2'>Ảnh</th>
                        <th className="p-2">Hành động</th>
                    </tr>
                </thead>
                <tbody className='bg-CetaceanBlue-light'>
                    {quizzes.map((quiz, index) => (
                        <tr key={index} className="border-b border-gray-700">
                            <td className="p-2">{quiz.title}</td>
                            <td className="p-2">{quiz.difficulty}</td>
                            <td className="p-2">{quiz.major}</td>
                            <td className="p-2">{quiz.duration}</td>
                            <td className="p-2">{quiz.status}</td>
                            <td className="p-2">{quiz.question_count}</td>
                            <td className="p-2">{quiz.image? quiz.image : 'Chưa có ảnh'}</td>
                            <td className="p-2">
                                <button
                                    className="text-Amber hover:underline mr-2"
                                    // onClick={() => editQuiz(quiz.id, prompt('Tiêu đề mới:', quiz.title))}
                                >
                                    Sửa
                                </button>
                                <button
                                    className="text-red-500 hover:underline"
                                    // onClick={() => deleteQuiz(quiz.id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuizManagement;