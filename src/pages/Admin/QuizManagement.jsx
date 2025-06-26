import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { BASE_URL } from '../../../services/api';
import ReactPaginate from 'react-paginate';
import QuizSetting from '../../components/Admin/Quiz-Management/QuizSetting';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const QuizManagement = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [quizzes, setQuizzes] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [editingQuiz, setEditingQuiz] = useState(null);
    const endOffset = itemOffset + 10;
    const currentQuizzes = quizzes.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(quizzes.length / 10);
    const navigate = useNavigate();

    const handlePageClick = (e) => {
        const newOffset = (e.selected * 10) % quizzes.length;
        setItemOffset(newOffset);
    }

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
            <table className="w-full text-center bg-CetaceanBlue rounded-lg ">
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
                    {currentQuizzes && currentQuizzes.map((quiz, index) => (
                        <tr key={index} className="border-b border-gray-700">
                            <td className="p-2">{itemOffset + index + 1}</td>
                            <td className="p-2">{quiz.title}</td>
                            <td className="p-2">{quiz.difficulty}</td>
                            <td className="p-2">{quiz.major}</td>
                            <td className="p-2">{quiz.duration} phút</td>
                            <td className="p-2">{quiz.status}</td>
                            <td className="p-2">{quiz.question_count}</td>
                            <td className="p-2">{quiz.image ? quiz.image : 'Chưa có ảnh'}</td>
                            <td className="p-2">
                                <FaEye className='inline text-lg m-2 cursor-pointer' onClick={() => navigate(`/admin/quizzes/${quiz.id}`)}/>
                                <FaEdit className='inline text-lg m-2 text-Amber cursor-pointer' onClick={() => {
                                    setShowModal(true);
                                    setEditingQuiz(quiz);
                                }}/>
                                <FaTrash className='inline text-lg m-2 text-red-500 cursor-pointer' />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
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

                        <h3 className="text-xl font-bold mb-4 text-white">{editingQuiz? `${editingQuiz.title}` : 'Thêm đề thi mới'}</h3>
                        <QuizSetting 
                            setShowModal={setShowModal} 
                            quizzes={quizzes} 
                            setQuizzes={setQuizzes}
                            editingQuiz={editingQuiz}
                        />
                        <button
                            className="absolute top-3 right-3 text-white hover:text-red-400 text-xl"
                            onClick={() => {
                                setEditingQuiz(null);
                                setShowModal(false)
                            }}
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