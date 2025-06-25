import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { BASE_URL } from '../../../../services/api';
import ReactPaginate from 'react-paginate';
import { FaPlus, FaMinus, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const QuestionsSelection = ({ setShowQuestions,quizId, handleAddQuestionToQuiz }) => {
  // const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [showModal, setShowModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentQuestions = questions.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(questions.length / 10);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * 10) % questions.length;
    setItemOffset(newOffset);
  };

  const getQuestionsData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/quizzes-questions/not-in-quiz/${quizId}`);
      console.log('questions: ', response.data);
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Không thể lấy dữ liệu câu hỏi: ', error);
    }
  }

  useEffect(() => {
    getQuestionsData();
  }, []);

  return (
    <div className='relative mt-4'>
      <button
        className="absolute top-2 right-2 text-xl text-white hover:text-red-400 z-10"
        onClick={() => setShowQuestions(false)}
        title="Đóng"
      >
        &times;
      </button>
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
              <td className="p-2 text-center text-xl flex justify-center gap-4">
                <button className="text-Emerald hover:text-Emerald-dark mr-2" title="Gán câu hỏi" onClick={() =>{
                  handleAddQuestionToQuiz(q);
                  setQuestions(prev => prev.filter(item => item.id !== q.id));
                  }}>
                  <FaPlus />
                </button>
                <button className="text-red-400 hover:text-red-600" title="Bỏ gán câu hỏi">
                  <FaMinus />
                </button>
              </td>
            </tr>
          ))}
          {(itemOffset + currentQuestions.length === questions.length && questions.length < 40) && (
            <tr>
              <td colSpan={5}>
                <button
                  className="w-full flex items-center justify-center text-3xl text-green-400 hover:text-green-600 py-4"
                  title="Thêm câu hỏi mới"
                // onClick={() => setShowModal(true)}
                >
                  +
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='flex justify-center items-center mt-4'>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<"
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
    </div>
  )
}

export default QuestionsSelection;
