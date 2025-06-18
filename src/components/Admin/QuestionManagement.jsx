import React, { useState } from 'react';

const QuestionManagement = () => {
    const [questions, setQuestions] = useState([
        { id: 1, text: '...', answer: '...' },
        { id: 2, text: '...', answer: '...' },
    ]);

    const addQuestion = () => {
        setQuestions([...questions, { id: questions.length + 1, text: `Câu hỏi mới ${questions.length + 1}`, answer: '' }]);
    };

    const editQuestion = (id, newText, newAnswer) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, text: newText, answer: newAnswer } : q));
    };

    const deleteQuestion = (id) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    return (
        <div className="bg-PurpleNavy-light p-6 rounded-lg shadow-lg">
            <div className='flex justify-between'>
                <h2 className="text-2xl text-CetaceanBlue-dark font-semibold mb-4">Quản lý câu hỏi</h2>
                <button
                    className="bg-CetaceanBlue hover:bg-CetaceanBlue-light text-white px-4 py-2 rounded-lg mb-4"
                    onClick={addQuestion}
                >
                    Thêm câu hỏi
                </button>
            </div>
            <table className="w-full text-left bg-CetaceanBlue rounded-lg">
                <thead>
                <tr className="border-b border-gray-600">
                    <th className="p-2">Nội dung</th>
                    <th className="p-2">Chuyên ngành</th>
                    <th className="p-2">Số điểm</th>
                    <th className="p-2">Hành động</th>
                </tr>
                </thead>
                <tbody className='bg-CetaceanBlue-light'>
                {questions.map(q => (
                    <tr key={q.id} className="border-b border-gray-700">
                        <td className="p-2">{q.text}</td>
                        <td className="p-2">{q.text}</td>
                        <td className="p-2">{q.answer}</td>
                        <td className="p-2">
                            <a href="" className="text-Emerald hover:underline mr-2">
                                Xem chi tiết
                            </a>
                            <button
                                className="text-Amber hover:underline mr-2"
                                onClick={''}
                            >
                                Sửa
                            </button>
                            <button
                                className="text-red-400 hover:underline"
                                onClick={''}
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

export default QuestionManagement;