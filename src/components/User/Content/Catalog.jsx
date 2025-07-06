import React from 'react';
import { Link } from 'react-router-dom';
import QuizCard from './QuizCard.jsx';
import { quizzes } from '../../../data.js';

function getRandomElements(arr, n) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

const Catalog = () => {
    // Giả lập một số quiz đã yêu thích (id: 2, 5, 7)
    const favoriteIds = [2, 5, 7];

    // Lọc quiz đã yêu thích
    const favoriteQuizzes = quizzes.filter(q => favoriteIds.includes(q.id));

    // Quiz đề xuất: random 3 quiz không nằm trong favorite
    const suggestedQuizzes = getRandomElements(
        quizzes.filter(q => !favoriteIds.includes(q.id)),
        3
    );

    // Tạo object phân loại quiz theo category
    const categories = {};
    quizzes.forEach(quiz => {
        if (!categories[quiz.category]) {
            categories[quiz.category] = [];
        }
        categories[quiz.category].push(quiz);
    });

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

            {/* Quiz đã yêu thích */}
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
                                category={quiz.category}
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
                                category={quiz.category}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Các category khác */}
            <div className="mt-16">
                {Object.keys(categories).map((category, index) => (
                    <div key={index} className="my-12">
                        <h4 className="text-xl text-CetaceanBlue font-semibold mb-4 text-left pl-2 border-l-4 border-Emerald">
                            {category}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {categories[category].map((quiz, idx) => (
                                <QuizCard
                                    key={quiz.id}
                                    id={quiz.id}
                                    title={quiz.title}
                                    duration={quiz.duration}
                                    difficulty={quiz.difficulty}
                                    category={quiz.category}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Catalog;