import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { BASE_URL } from '../../services/api';

const QuizResult = () => {
  const location = useLocation();
  const { correct, wrong, skipped, questions, attemptId } = location.state || {};
  const [resultDetails, setResultDetails] = useState(null);

  const getResultDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/answers-attempts/${attemptId}`);
      setResultDetails(response.data);
    } catch (error) {
      console.error('Error fetching result details:', error);
    }
  };

  useEffect(() => {
    if (attemptId) {
      getResultDetails();
    }
  }, [attemptId]);

  // Calculate percentage
  const totalQuestions = questions?.length || 0;
  const correctPercentage = totalQuestions > 0 ? ((correct / totalQuestions) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-CetaceanBlue to-CetaceanBlue-dark text-white flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full bg-PurpleNavy/30 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white">
          Kết quả làm bài
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-CetaceanBlue-light/50 rounded-lg p-4">
            <p className="text-lg font-medium text-Manatee-light">Số câu đúng</p>
            <p className="text-2xl font-bold text-Emerald">{correct}/{totalQuestions}</p>
            <p className="text-sm text-Manatee">{correctPercentage}%</p>
          </div>
          <div className="bg-CetaceanBlue-light/50 rounded-lg p-4">
            <p className="text-lg font-medium text-Manatee-light">Số câu sai</p>
            <p className="text-2xl font-bold text-Amber-dark">{wrong}</p>
          </div>
          <div className="bg-CetaceanBlue-light/50 rounded-lg p-4">
            <p className="text-lg font-medium text-Manatee-light">Số câu bỏ qua</p>
            <p className="text-2xl font-bold text-Manatee">{skipped}</p>
          </div>
        </div>

        <div className="text-center space-y-4">
          <Link to="/quiz">
            <button className="bg-CetaceanBlue text-white px-6 py-3 rounded-lg font-medium hover:bg-CetaceanBlue-dark transition duration-300 shadow-md mb-4">
              Quay lại
            </button>
          </Link>
          <p className="text-sm text-Manatee">
            Hoàn thành lúc: {resultDetails?.completedAt
              ? new Date(resultDetails.completedAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
              : 'Chưa cập nhật'} (+07)
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;