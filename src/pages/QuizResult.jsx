import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { BASE_URL } from '../../services/api';
import FeedBack from '../components/User/Content/FeedBack.jsx';
import { Formik, Form, Field } from 'formik';
import { useUser } from '../contexts/UserContext.jsx';
import Swal from 'sweetalert2';

const QuizResult = () => {
  const location = useLocation();
  const { correct, wrong, skipped, questions, attemptId } = location.state || {};
  const [resultDetails, setResultDetails] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const {quizId} = useParams();
  const {user} = useUser();

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

  const totalQuestions = questions?.length || 0;
  const correctPercentage = totalQuestions > 0 ? ((correct / totalQuestions) * 100).toFixed(1) : 0;

  const handleSubmitRating = async (values) => {
    try {
      await axios.post(`${BASE_URL}/api/ratings/quiz/${quizId}`, {
        user_id: user.id,
        star: values.rating,
        comment: values.comment,
      });
      Swal.fire(
        'Successful',
        'Bạn đã gửi đánh giá.',
        'success'
      )
    } catch(error) {
      console.error('Server error: ', error);
      Swal.fire(
        'Server error',
        'Gửi đánh giá thất bại',
        'error'
      );
    }
  }
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

        {/* Đánh giá và phản hồi */}
        <Formik
          initialValues={{rating: 0, comment: ''}}
          onSubmit={handleSubmitRating}
        >
          {({ values, setFieldValue }) => (
              <Form className="flex flex-col items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Đánh giá:</span>
                  {[1, 2, 3, 4, 5].map(star => (
                    <i
                      key={star}
                      className={`fa-star ${star <= (values.rating || 0) ? 'fa-solid text-Amber-light' : 'fa-regular text-Grey'} text-xl cursor-pointer transition`}
                      onClick={() => {
                        setFieldValue('rating', star);
                        setUserRating(star);
                      }}
                    ></i>
                  ))}
                </div>
                <Field
                  as="textarea"
                  name="comment"
                  className="w-full border border-CadetBlue bg-Grey-dark text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-Emerald transition"
                  rows={3}
                  placeholder="Nhập phản hồi của bạn..."
                />
                <button
                  type="submit"
                  className="bg-Emerald text-white px-5 py-2 rounded-lg shadow-md hover:bg-Emerald-dark transition"
                  disabled={values.rating === 0}
                >
                  Gửi phản hồi
                </button>
              </Form>
            )}
        </Formik>
      </div>
    </div>
  );
};

export default QuizResult;