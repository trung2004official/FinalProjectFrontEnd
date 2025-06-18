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
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Quản lý câu hỏi</h2>
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
                onClick={addQuestion}
            >
                Thêm câu hỏi
            </button>
            <table className="w-full text-left">
                <thead>
                <tr className="border-b border-gray-600">
                    <th className="p-2">Câu hỏi</th>
                    <th className="p-2">Đáp án</th>
                    <th className="p-2">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {questions.map(q => (
                    <tr key={q.id} className="border-b border-gray-700">
                        <td className="p-2">{q.text}</td>
                        <td className="p-2">{q.answer}</td>
                        <td className="p-2">
                            <button
                                className="text-blue-400 hover:underline mr-2"
                                onClick={() => editQuestion(q.id, prompt('Câu hỏi mới:', q.text), prompt('Đáp án mới:', q.answer))}
                            >
                                Sửa
                            </button>
                            <button
                                className="text-red-400 hover:underline"
                                onClick={() => deleteQuestion(q.id)}
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