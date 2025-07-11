import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuizCard from './QuizCard.jsx';
import { quizzes } from '../../../data.js';
import axios from 'axios';
import { BASE_URL } from '../../../../services/api.jsx';
import QuizzesByMajors from './QuizzesByMajors.jsx';

function getRandomElements(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const Catalog = () => {
  const majors = ['Thiết Kế Web', 'Mobile', 'Mạng Máy Tính'];

  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);

  const [favoriteQuizzes, setFavoriteQuizzes] = useState([]);
  const [suggestedQuizzes, setSuggestedQuizzes] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getQuizData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/quizzes`);
      console.log(response.data);
      setQuizzes(response.data);
      setFilteredQuizzes(response.data);
    } catch (error) {
      console.error('Error during get data: ', error);
    }
  };


  useEffect(() => {
    getQuizData();
  }, [])

  return (
    <div className="container mx-auto p-6 text-center">
      <h2 className="text-3xl md:text-4xl text-CetaceanBlue font-bold mb-2 tracking-tight">
        Rèn luyện kiến thức của bạn
      </h2>
      <p className="text-gray-500 mb-6 text-lg">
        Hãy chọn đề thi và trao dồi thêm kiến thức
      </p>
      <Link to="/quiz">
        <button className="bg-gradient-to-r from-CetaceanBlue to-Emerald text-white px-6 py-2 rounded-full shadow hover:scale-105 transition-transform font-semibold mb-8">
          Xem tất cả đề thi
        </button>
      </Link>

      {/* Quiz yêu thích */}
      <div className="my-12 bg-white/10 rounded-xl shadow-lg p-6">
        <h3 className="text-2xl text-Emerald font-bold mb-6 flex items-center justify-center gap-2">
          <span role="img" aria-label="heart">❤️</span> Quiz đã yêu thích
        </h3>
        {favoriteQuizzes.length === 0 ? (
          <div className="text-gray-400 italic">Bạn chưa có quiz nào yêu thích.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {favoriteQuizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                id={quiz.id}
                title={quiz.title}
                duration={quiz.duration}
                difficulty={quiz.difficulty}
                category={quiz.category || quiz.major || 'Không xác định'} // Đồng bộ xử lý category
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quiz đề xuất */}
      <div className="my-12 bg-white/10 rounded-xl shadow-lg p-6">
        <h3 className="text-2xl text-CetaceanBlue font-bold mb-6 flex items-center justify-center gap-2">
          <span role="img" aria-label="star">⭐</span> Quiz đề xuất
        </h3>
        {suggestedQuizzes.length === 0 ? (
          <div className="text-gray-400 italic">Không có quiz đề xuất.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {suggestedQuizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                id={quiz.id}
                title={quiz.title}
                duration={quiz.duration}
                difficulty={quiz.difficulty}
                category={quiz.category || quiz.major || 'Không xác định'} // Đồng bộ xử lý category
                isFavorite={favoriteQuizzes.some((q) => q.id === quiz.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Các chuyên ngành khác */}
      <div className="mt-16">
        {isLoading ? (
          <div className="text-gray-400 italic">Đang tải...</div>
        ) : error ? (
          <div className="text-red-500 italic">{error}</div>
        ) : (
          majors
            .filter(major => filteredQuizzes.some(q => q.major === major))
            .map(major => (
              <div key={major} className="my-12">
                  <QuizzesByMajors filteredQuizzes={filteredQuizzes} major={major} />
              </div>
            ))
          // majors.map((major) => (
          //   <div key={major} className="my-12">
          //     <h4 className="text-xl text-CetaceanBlue font-semibold mb-4 text-left pl-2 border-l-4 border-Emerald">
          //       {major}
          //     </h4>
          //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          //       {quizzesByMajor[major]?.length > 0 ? (
          //         quizzesByMajor[major].map((quiz) => (
          //           <QuizCard
          //             key={quiz.id}
          //             id={quiz.id}
          //             title={quiz.title}
          //             duration={quiz.duration}
          //             difficulty={quiz.difficulty}
          //             category={quiz.category || quiz.major || major} // Đồng bộ xử lý category
          //             isFavorite={favoriteQuizzes.some((q) => q.id === quiz.id)}
          //           />
          //         ))
          //       ) : (
          //         <div className="text-gray-400 italic">Không có quiz nào cho {major}.</div>
          //       )}
          //     </div>
          //   </div>
          // ))
        )}
      </div>
    </div>
  );
};

export default Catalog;