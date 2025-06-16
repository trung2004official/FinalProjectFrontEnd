import React, { useState } from 'react';

const QuizManagement = () => {
    const [quizzes, setQuizzes] = useState([
        { id: 1, title: 'Đề thi Toán', questions: 10 },
        { id: 2, title: 'Đề thi Khoa học', questions: 15 },
    ]);

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
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Quản lý đề thi</h2>
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
                onClick={addQuiz}
            >
                Thêm đề thi
            </button>
            <table className="w-full text-left">
                <thead>
                <tr className="border-b border-gray-600">
                    <th className="p-2">Tiêu đề</th>
                    <th className="p-2">Số câu hỏi</th>
                    <th className="p-2">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {quizzes.map(quiz => (
                    <tr key={quiz.id} className="border-b border-gray-700">
                        <td className="p-2">{quiz.title}</td>
                        <td className="p-2">{quiz.questions}</td>
                        <td className="p-2">
                            <button
                                className="text-blue-400 hover:underline mr-2"
                                onClick={() => editQuiz(quiz.id, prompt('Tiêu đề mới:', quiz.title))}
                            >
                                Sửa
                            </button>
                            <button
                                className="text-red-400 hover:underline"
                                onClick={() => deleteQuiz(quiz.id)}
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