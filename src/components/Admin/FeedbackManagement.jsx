import React, { useState } from 'react';

const FeedbackManagement = () => {
    const [feedbacks, setFeedbacks] = useState([
        { id: 1, user: 'user1', content: 'Giao diện thân thiện', date: '2025-06-15' },
        { id: 2, user: 'user2', content: 'Cần thêm hướng dẫn', date: '2025-06-16' },
    ]);

    const replyFeedback = (id, reply) => {
        setFeedbacks(feedbacks.map(fb => fb.id === id ? { ...fb, reply } : fb));
    };

    const deleteFeedback = (id) => {
        setFeedbacks(feedbacks.filter(fb => fb.id !== id));
    };

    return (
        <div className="bg-PurpleNavy-light p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl text-CetaceanBlue-dark font-semibold mb-4">Quản lý phản hồi</h2>
            <table className="w-full text-left bg-CetaceanBlue">
                <thead>
                <tr className="border-b border-gray-600">
                    <th className="p-2">Người gửi</th>
                    <th className="p-2">Nội dung</th>
                    <th className="p-2">Ngày</th>
                    <th className="p-2">Phản hồi</th>
                    <th className="p-2">Hành động</th>
                </tr>
                </thead>
                <tbody className='bg-CetaceanBlue-light'>
                {feedbacks.map(fb => (
                    <tr key={fb.id} className="border-b border-gray-700">
                        <td className="p-2">{fb.user}</td>
                        <td className="p-2">{fb.content}</td>
                        <td className="p-2">{fb.date}</td>
                        <td className="p-2">{fb.reply || 'Chưa trả lời'}</td>
                        <td className="p-2">
                            <button
                                className="text-blue-400 hover:underline mr-2"
                                onClick={() => replyFeedback(fb.id, prompt('Nội dung phản hồi:', fb.reply))}
                            >
                                Trả lời
                            </button>
                            <button
                                className="text-red-400 hover:underline"
                                onClick={() => deleteFeedback(fb.id)}
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

export default FeedbackManagement;