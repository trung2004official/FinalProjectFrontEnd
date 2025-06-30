import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../services/api';

const FeedbackManagement = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const getAllFeedbacks = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/ratings`);
            setFeedbacks(response.data.ratings);
        } catch (error) {
            console.error(`Server error: `, error);
        }
    }
    const replyFeedback = (id, reply) => {
        setFeedbacks(feedbacks.map(fb => fb.id === id ? { ...fb, reply } : fb));
    };

    const deleteFeedback = (id) => {
        setFeedbacks(feedbacks.filter(fb => fb.id !== id));
    };

    useEffect(() => {
        getAllFeedbacks();
    },[]);

    return (
        <div className="bg-PurpleNavy-light p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl text-CetaceanBlue-dark font-semibold mb-4">Quản lý phản hồi</h2>
            <table className="w-full text-left bg-CetaceanBlue">
                <thead>
                <tr className="border-b border-gray-600">
                    <th className="p-2">Người gửi</th>
                    <th className="p-2">Mức đánh giá</th>
                    <th className="p-2">Nội dung</th>
                    {/* <th className="p-2">Phản hồi</th>
                    <th className="p-2">Hành động</th> */}
                </tr>
                </thead>
                <tbody className='bg-CetaceanBlue-light'>
                {feedbacks.map(fb => (
                    <tr key={fb.id} className="border-b border-gray-700">
                        <td className="p-2">{fb.user_id}</td>
                        <td className="p-2">{fb.star_rating}</td>
                        <td className="p-2">{fb.comment}</td>
                        {/* <td className="p-2">{fb.reply || 'Chưa trả lời'}</td> */}
                        {/* <td className="p-2">
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
                        </td> */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeedbackManagement;