import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { BASE_URL } from '../../../services/api';
import QuestionSetting from '../../components/Admin/Question-Management/QuestionSetting';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';;

const QuestionManagement = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [answers, setAnswers] = useState([])
    const endOffset = itemOffset + 10;
    const currentQuestions = questions.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(questions.length / 10);

    const handlePageClick = (e) => {
        const newOffset = (e.selected * 10) % questions.length;
        setItemOffset(newOffset);
    }

const handleGetAnswersData = async (id) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/answers/${id}`);
        console.log('API trả về:', res.data.answers);
        return res.data.answers;
    } catch (error) {
        console.error('Error fetching answers: ', error);   
        return [];
    }
}

    const getQuestionData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/questions`);
            console.log(response.data);
            const { questions } = response.data;
            console.log('api response: ', questions);
            setQuestions(questions);
        } catch (error) {
            console.error('Server error: ', error);
        }
    }

    const handleDeleteButton = (question) => {
        Swal.fire({
            title: `Chắc chắn muốn xóa câu hỏi "${question.content}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteQuestion(question.id);
            }
        });
    }

    const handleDeleteQuestion = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/api/questions/delete-question/${id}`);
            if (response.status === 200) {
                Swal.fire(
                    'Successful',
                    'Xóa câu hỏi thành công',
                    'success'
                );
                setQuestions(questions.filter(q => q.id !== id));
            } else {
                Swal.fire(
                    "Error",
                    "Câu hỏi này không thể bị xóa",
                    "error"
                );
            }
        } catch (error) {
            console.error('Lỗi server khi xóa câu hỏi: ', error);
            Swal.fire(
                "Error",
                "Câu hỏi này không thể bị xóa",
                "error"
            );
        }
    }

    // const editQuestion = (id, newText, newAnswer) => {
    //     setQuestions(questions.map(q => q.id === id ? { ...q, text: newText, answer: newAnswer } : q));
    // };

    // const deleteQuestion = (id) => {
    //     setQuestions(questions.filter(q => q.id !== id));
    // };

    useEffect(() => {
        getQuestionData();
    }, []);

    return (
        <div className="bg-PurpleNavy-light p-6 rounded-lg shadow-lg">
            <div className='flex justify-between'>
                <h2 className="text-2xl text-CetaceanBlue-dark font-semibold mb-4">Quản lý câu hỏi</h2>
                <button
                    className="bg-CetaceanBlue hover:bg-CetaceanBlue-light text-white px-4 py-2 rounded-lg mb-4"
                    onClick={() => setShowModal(true)}
                >
                    Thêm câu hỏi
                </button>
            </div>
            <table className="w-full text-center bg-CetaceanBlue rounded-lg">
                <thead>
                    <tr className="border-b border-gray-600">
                        <th className='p-2 text-center w-5'>STT</th>
                        <th className="p-2 text-center w-24">Nội dung</th>
                        <th className="p-2 text-center w-24">Chuyên ngành</th>
                        <th className="p-2 text-center w-24">Độ khó</th>
                        <th className="p-2 text-center w-24">Hành động</th>
                    </tr>
                </thead>
                <tbody className='bg-CetaceanBlue-light'>
                    {currentQuestions && currentQuestions.map((q, index) => (
                        <tr key={index} className="border-b border-gray-700">
                            <td className='p-2 text-center'>{itemOffset + index + 1}</td>
                            <td className="p-2 text-center">{q.content}</td>
                            <td className="p-2 text-center">{q.major}</td>
                            <td className="p-2 text-center">{q.difficulty}</td>
                            <td className="p-2 text-center">
                                <button className="text-white hover:scale-110 mr-2 cursor-pointer">
                                    <FaEye className="inline-block mr-1" />
                                </button>
                                <button
                                    className="text-Amber hover:scale-110 mr-2 cursor-pointer"
                                    onClick={async () => {
                                        setEditingQuestion(q);
                                        const response = await handleGetAnswersData(q.id);
                                        console.log('answers: ',response);
                                        setAnswers(response);
                                        setShowModal(true);
                                    }}
                                >
                                    <FaEdit className="inline-block mr-1" />
                                </button>
                                <button
                                    className="text-red-400 hover:scale-110 cursor-pointer"
                                >
                                    <FaTrash 
                                        className="inline-block mr-1" 
                                        onClick={() => handleDeleteButton(q)}
                                    />
                                </button>
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

                        <h3 className="text-xl font-bold mb-4 text-white">Thêm câu hỏi mới</h3>
                        <QuestionSetting questions={questions} setQuestions={setQuestions} setShowModal={setShowModal} editingQuestion={editingQuestion} answersData={answers} />
                        <button
                            className="absolute top-3 right-3 text-white hover:text-red-400 text-xl"
                            onClick={() => {
                                setEditingQuestion(null);
                                setAnswers([]);
                                setShowModal(false);
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

export default QuestionManagement;