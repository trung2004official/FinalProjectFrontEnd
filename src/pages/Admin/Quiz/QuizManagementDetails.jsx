import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../../../services/api';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import QuestionSetting from '../../../components/Admin/Question-Management/QuestionSetting';

const QuizManagementDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentQuestions = questions.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(questions.length / 10);
  const [isPublic, setIsPublic] = useState();
  const [showModal, setShowModal] = useState(false);
  const [newData, setNewData] = useState();
  const [toggleLoading, setToggleLoading] = useState(false);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * 10) % questions.length;
    setItemOffset(newOffset);
  }

  const handleAddQuestion = async (newQuestion) => {
    try {
      await axios.post(`${BASE_URL}/api/quizzes-questions/add-quiz-question/${id}`, {
        question_id: newQuestion.id,
      });
      const response = await axios.get(`${BASE_URL}/api/questions/${newQuestion.id}`);
      const questionData = response.data.question;
      setQuestions([...questions, questionData]);
    } catch (error) {
      console.error('Không thể thêm câu hỏi: ', error);
    } finally {
      setNewData();
    }
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

  const handleTogglePublic = async () => {
    if (questions.length < 10) return;
    setToggleLoading(true);
    try {
      const response = await axios.patch(`${BASE_URL}/api/quizzes/update-status/${id}`, {
        status: isPublic ? 'private' : 'public',
      });
      console.log('Trạng thái cập nhật thành công: ', response.data);
      setIsPublic((prev) => !prev);
    } catch (error) {
      console.error('Không thể cập nhật trạng thái: ', error);
    }
  }

  const getQuizStatus = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/quizzes/${id}`);
      console.log('Trạng thái quiz: ', response.data.status);
      setIsPublic(response.data.status === 'public');
    } catch (error) {
      console.error('Không thể lấy trạng thái quiz: ', error);
    }
  }

  useEffect(() => {
    getQuestionData();
    getQuizStatus();
  }, [id]);

  if (loading) { return <LoadingSpinner />; }
  return (
    <div className="bg-PurpleNavy-light p-6 rounded-lg shadow-lg">
      <div className='flex justify-between mb-4'>
        <h2 className="text-2xl text-CetaceanBlue-dark font-semibold mb-4">Danh sách câu hỏi</h2>
        <div className='flex justify-between items-center'>
          <button className='bg-CetaceanBlue hover:bg-CetaceanBlue-dark text-white font-bold px-4 py-2 rounded-lg mb-4 mr-2'>Import excel</button>
          {/* <button className='bg-CetaceanBlue hover:bg-CetaceanBlue-dark text-white font-bold px-4 py-2 rounded-lg mb-4 mr-2'>Gán câu hỏi</button> */}
          <button
            className="bg-CetaceanBlue hover:bg-CetaceanBlue-dark text-white font-bold px-4 py-2 rounded-lg mb-4"
            onClick={() => setShowModal(true)}
          >
            + Thêm câu hỏi
          </button>
        </div>
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
          {(itemOffset + currentQuestions.length === questions.length && questions.length < 40) && (
            <tr>
              <td colSpan={5}>
                <button
                  className="w-full flex items-center justify-center text-3xl text-green-400 hover:text-green-600 py-4"
                  title="Thêm câu hỏi mới"
                  onClick={() => setShowModal(true)}
                >
                  +
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='flex justify-between items-center mt-4'>
        <button
          className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition"
          onClick={() => navigate(-1)}
        >
          ← Quay về
        </button>
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
        <div className="flex items-center ml-4">
          <span className="mr-2 text-white">{isPublic ? 'Công khai' : 'Riêng tư'}</span>
          <button
            onClick={handleTogglePublic}
            disabled={questions.length < 10 || toggleLoading}
            title={questions.length < 10 ? "Cần ít nhất 10 câu hỏi để công khai" : ""}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 
              ${isPublic ? 'bg-CetaceanBlue-light' : 'bg-gray-300'} 
              ${questions.length < 10 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${isPublic ? 'translate-x-6' : ''}`}
            ></div>
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">

          <div className="bg-CetaceanBlue p-6 rounded-lg w-[700px] max-h-[90vh] overflow-y-auto relative z-50">

            <h3 className="text-xl font-bold mb-4 text-white">Thêm câu hỏi mới</h3>
            <QuestionSetting
              handleAddQuestionToQuiz={handleAddQuestion}
              setShowModal={setShowModal} />
            <button
              className="absolute top-3 right-3 text-white hover:text-red-400 text-xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizManagementDetails;