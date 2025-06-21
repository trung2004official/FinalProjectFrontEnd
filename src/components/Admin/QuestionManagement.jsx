import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { BASE_URL } from '../../../services/api';

const QuestionManagement = (props) => {

    const getQuestionData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/questions`);
            console.log(response.data);
            const { questions } = response.data;
            console.log('api response: ', questions);
            props.setQuestions(questions);
        } catch (error) {
            console.error('Server error: ', error);
        }
    }


    // const addQuestion = () => {
    //     setQuestions([...questions, { id: questions.length + 1, text: `Câu hỏi mới ${questions.length + 1}`, answer: '' }]);
    // };

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
                >
                    Thêm câu hỏi
                </button>
            </div>
            <table className="w-full text-left bg-CetaceanBlue rounded-lg">
                <thead>
                    <tr className="border-b border-gray-600">
                        <th className='p-2'>STT</th>
                        <th className="p-2">Nội dung</th>
                        <th className="p-2">Chuyên ngành</th>
                        <th className="p-2">Số điểm</th>
                        <th className="p-2">Hành động</th>
                    </tr>
                </thead>
                <tbody className='bg-CetaceanBlue-light'>
                    {props.currentQuestions && props.currentQuestions.map((q, index) => (
                        <tr key={index} className="border-b border-gray-700">
                            <td className='p-2'>{props.itemOffset + index + 1}</td>
                            <td className="p-2">{q.content}</td>
                            <td className="p-2">{q.major}</td>
                            <td className="p-2">{q.score}</td>
                            <td className="p-2">
                                <a href="" className="text-Emerald hover:underline mr-2">
                                    Xem chi tiết
                                </a>
                                <button
                                    className="text-Amber hover:underline mr-2"
                                >
                                    Sửa
                                </button>
                                <button
                                    className="text-red-400 hover:underline"
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
        </div>
    );
};

export default QuestionManagement;