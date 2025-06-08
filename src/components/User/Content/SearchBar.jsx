import React, { useState, useEffect } from 'react';
import { quizzes } from '../../../data.js';

const SearchBar = ({ onFilter }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [difficultyFilter, setDifficultyFilter] = useState('all');

    const categories = ['all', ...new Set(quizzes.map(quiz => quiz.category))];
    const difficulties = ['all', ...new Set(quizzes.map(quiz => quiz.difficulty))];

    useEffect(() => {
        const filteredQuizzes = quizzes.filter(quiz =>
            (categoryFilter === 'all' || quiz.category === categoryFilter) &&
            (difficultyFilter === 'all' || quiz.difficulty === difficultyFilter)
        );
        onFilter(filteredQuizzes);
    }, [categoryFilter, difficultyFilter, onFilter]);

    const handleSearch = () => {
        const filteredQuizzes = quizzes.filter(quiz =>
            (quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) || !searchTerm) &&
            (categoryFilter === 'all' || quiz.category === categoryFilter) &&
            (difficultyFilter === 'all' || quiz.difficulty === difficultyFilter)
        );
        onFilter(filteredQuizzes);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    return (
        <div className="flex justify-between items-center p-4">
            <div className="flex space-x-4">
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="p-2 rounded-lg border-CetaceanBlue border-solid border-2 text-CetaceanBlue"
                    aria-label="Lọc theo danh mục"
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category === 'all' ? 'Tất cả danh mục' : category}
                        </option>
                    ))}
                </select>
                <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className="p-2 rounded-lg border-CetaceanBlue border-solid border-2 text-CetaceanBlue"
                    aria-label="Lọc theo độ khó"
                >
                    {difficulties.map((difficulty, index) => (
                        <option key={index} value={difficulty}>
                            {difficulty === 'all' ? 'Tất cả độ khó' : difficulty}
                        </option>
                    ))}
                </select>
                <div className="flex-1 flex justify-end">
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Tìm kiếm trên trang..."
                            className="px-20 py-2 rounded-l-3xl border-CetaceanBlue text-CetaceanBlue border-solid border-2"
                            aria-label="Tìm kiếm bài quiz"
                        />
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="bg-CetaceanBlue-dark text-white p-2 rounded-r-lg border-CetaceanBlue border-solid border-2 border-l-0"
                            aria-label="Gửi tìm kiếm"
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
