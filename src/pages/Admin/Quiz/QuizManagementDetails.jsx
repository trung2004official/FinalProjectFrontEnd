import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../../../services/api';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ReactPaginate from 'react-paginate';

const QuizManagementDetails = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentQuestions = questions.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(questions.length / 10);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * 10) % questions.length;
    setItemOffset(newOffset);
  }

  const getQuestionData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/quizzes-questions/${id}`);
      console.log('questions: ', response.data.questions);
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Không thể lấy dữ liệu đề thi: ', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getQuestionData();
  }, [id]);

  if (loading) { return <LoadingSpinner />; }
  return (
    <div className="bg-PurpleNavy-light p-6 rounded-lg shadow-lg">
      <div className='flex justify-between mb-4'>
        <h2 className="text-2xl text-CetaceanBlue-dark font-semibold mb-4">Danh sách câu hỏi</h2>
        <button
          className="bg-CetaceanBlue hover:bg-CetaceanBlue-dark text-white font-bold px-4 py-2 rounded-lg mb-4"
          onClick={() => setShowModal(true)}
        >
          + Thêm đề thi
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
    </div>
  );
};

export default QuizManagementDetails;