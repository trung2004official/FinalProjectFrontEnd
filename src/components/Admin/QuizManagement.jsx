import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../services/api';
import ReactPaginate from 'react-paginate';
import QuizSetting from './Quiz-Management/QuizSetting';

const QuizManagement = (props) => {
    const [showModal, setShowModal] = useState(false);

    const getQuizData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/quizzes`);
            console.log(response.data);
            props.setQuizzes(response.data);
        } catch (error) {
            console.error('Server error: ', error);
        }
    }

    useEffect(() => {
        getQuizData();
    }, []);

    const handleAddQuiz = () => {
        
    }
    // const addQuiz = () => {
    //     setQuizzes([...quizzes, { id: quizzes.length + 1, title: `Đề thi mới ${quizzes.length + 1}`, questions: 0 }]);
    // };

    // const editQuiz = (id, newTitle) => {
    //     setQuizzes(quizzes.map(quiz => quiz.id === id ? { ...quiz, title: newTitle } : quiz));
    // };

    // const deleteQuiz = (id) => {
    //     setQuizzes(quizzes.filter(quiz => quiz.id !== id));
    // };

    return (
        <div className="bg-PurpleNavy-light p-6 rounded-lg shadow-lg">
            <div className='flex justify-between mb-4'>
                <h2 className="text-2xl text-CetaceanBlue-dark font-semibold mb-4">Quản lý đề thi</h2>
                <button
                    className="bg-CetaceanBlue hover:bg-CetaceanBlue-dark text-white font-bold px-4 py-2 rounded-lg mb-4"
                    onClick={() => setShowModal(true)}
                >
                    + Thêm đề thi
                </button>
            </div>
            <table className="w-full text-left bg-CetaceanBlue rounded-lg ">
                <thead className=''>
                    <tr className="border-b border-gray-600">
                        <th className='p-2'>STT</th>
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
                    {props.currentQuizzes && props.currentQuizzes.map((quiz, index) => (
                        <tr key={index} className="border-b border-gray-700">
                            <td className="p-2">{props.itemOffset + index + 1}</td>
                            <td className="p-2">{quiz.title}</td>
                            <td className="p-2">{quiz.difficulty}</td>
                            <td className="p-2">{quiz.major}</td>
                            <td className="p-2">{quiz.duration}</td>
                            <td className="p-2">{quiz.status}</td>
                            <td className="p-2">{quiz.question_count}</td>
                            <td className="p-2">{quiz.image ? quiz.image : 'Chưa có ảnh'}</td>
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
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next >"
                onPageChange={props.onPageChange}
                pageRangeDisplayed={5}
                pageCount={props.pageCount}
                previousLabel="< Prev"
                renderOnZeroPageCount={null}
                containerClassName="flex justify-center items-center space-x-2 mt-4"
                pageClassName="border rounded-md px-3 py-1 hover:bg-CetaceanBlue-light "
                pageLinkClassName="text-white cursor-pointer"
                activeClassName="bg-CetaceanBlue text-white"
                previousClassName="border rounded-md px-3 py-1 hover:bg-CetaceanBlue-light cursor-pointer"
                nextClassName="border rounded-md px-3 py-1 hover:bg-CetaceanBlue-light cursor-pointer"
                breakClassName="px-3 py-1"
            />

            {showModal && (
<div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">

<div className="bg-CetaceanBlue p-6 rounded-lg w-[700px] max-h-[90vh] overflow-y-auto relative z-50">

                        <h3 className="text-xl font-bold mb-4 text-white">Thêm đề thi mới</h3>
                        <QuizSetting onSubmit={handleAddQuiz} />
                        <button
                            className="absolute top-3 right-3 text-white hover:text-red-400 text-xl"
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizManagement;