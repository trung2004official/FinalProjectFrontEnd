import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuizCard from './QuizCard.jsx';
import { quizzes } from '../../../data.js';
import axios from 'axios';
import { BASE_URL } from '../../../../services/api.jsx';

function getRandomElements(arr, n) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

const Catalog = () => {
    // Danh sách chuyên ngành (chuỗi)
    const majors = ['Thiết Kế Web', 'Mobile', 'Mạng Máy Tính'];

    // Trạng thái lưu quiz theo chuyên ngành
    const [quizzesByMajor, setQuizzesByMajor] = useState({});
    // Trạng thái cho quiz yêu thích và đề xuất
    const [favoriteQuizzes, setFavoriteQuizzes] = useState([]);
    const [suggestedQuizzes, setSuggestedQuizzes] = useState([]);
    // Trạng thái tải và lỗi
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Lấy quiz theo chuyên ngành từ API (POST với body)
    const getQuizzesByMajor = async (major) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/quizzes/quizzes-by-major`, {
                major: major,
            });
            // Kiểm tra dữ liệu trả về
            if (!Array.isArray(response.data.quizzes)) {
                console.warn(`Dữ liệu quiz cho ${major} không phải mảng:`, response.data);
                return [];
            }
            return response.data.quizzes;
        } catch (error) {
            console.error(`Lỗi khi lấy quiz cho chuyên ngành ${major}:`, error);
            return [];
        }
    };

    // Lấy quiz cho tất cả chuyên ngành khi component được gắn
    useEffect(() => {
        const fetchAllQuizzes = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Gọi API cho từng chuyên ngành đồng thời
                const quizPromises = majors.map((major) =>
                    getQuizzesByMajor(major).then((quizzes) => ({
                        major,
                        quizzes,
                    }))
                );

                const results = await Promise.all(quizPromises);

                // Tạo đối tượng quizzesByMajor
                const quizzesMap = results.reduce(
                    (acc, { major, quizzes }) => ({
                        ...acc,
                        [major]: quizzes,
                    }),
                    {}
                );

                setQuizzesByMajor(quizzesMap);

                // Tạo danh sách quiz yêu thích và đề xuất từ dữ liệu API
                const allQuizzes = results.flatMap((result) => result.quizzes);
                const favoriteIds = [2, 5, 7]; // ID quiz yêu thích (giả lập)
                const favoriteQuizzes = allQuizzes.filter((q) => favoriteIds.includes(q.id));
                const suggestedQuizzes = getRandomElements(
                    allQuizzes.filter((q) => !favoriteIds.includes(q.id)),
                    3
                );

                setFavoriteQuizzes(favoriteQuizzes);
                setSuggestedQuizzes(suggestedQuizzes);
            } catch (err) {
                setError('Không thể tải dữ liệu quiz');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllQuizzes();
    }, []);

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
                                category={quiz.major || quiz.major || 'Không xác định'} // Dự phòng nếu thiếu category
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
                                category={quiz.major || quiz.major || 'Không xác định'} // Dự phòng nếu thiếu category
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
                    majors.map((major) => (
                        <div key={major} className="my-12">
                            <h4 className="text-xl text-CetaceanBlue font-semibold mb-4 text-left pl-2 border-l-4 border-Emerald">
                                {major}
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {quizzesByMajor[major]?.length > 0 ? (
                                    quizzesByMajor[major].map((quiz) => (
                                        <QuizCard
                                            key={quiz.id}
                                            id={quiz.id}
                                            title={quiz.title}
                                            duration={quiz.duration}
                                            difficulty={quiz.difficulty}
                                            category={quiz.major || major} // Dự phòng nếu thiếu category
                                            isFavorite={favoriteQuizzes.some((q) => q.id === quiz.id)}
                                        />
                                    ))
                                ) : (
                                    <div className="text-gray-400 italic">Không có quiz nào cho {major}.</div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Catalog;