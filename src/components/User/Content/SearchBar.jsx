import React, { useState, useEffect } from 'react';

const SearchBar = ({ onFilter, quizzes }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [majorFilter, setMajorFilter] = useState('all');
    const [difficultyFilter, setDifficultyFilter] = useState('all');

    useEffect(() => {
        const filteredQuizzes = quizzes.filter(quiz =>
            (majorFilter === 'all' || quiz.major === majorFilter) &&
            (difficultyFilter === 'all' || quiz.difficulty === difficultyFilter)
        );
        onFilter(filteredQuizzes);
    }, [majorFilter, difficultyFilter, onFilter]);

    const handleSearch = () => {
        const filteredQuizzes = quizzes.filter(quiz =>
            (quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) || !searchTerm) &&
            (majorFilter === 'all' || quiz.major === majorFilter) &&
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
                    value={majorFilter}
                    onChange={(e) => setMajorFilter(e.target.value)}
                    className="p-2 rounded-lg border-CetaceanBlue border-solid border-2 text-CetaceanBlue"
                    aria-label="Lọc theo danh mục"
                >
                    <option value="all">--- Chuyên ngành ---</option>
                    <option value="Thiết Kế Web">Thiết Kế Web</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Mạng Máy Tính">Mạng Máy Tính</option>
                </select>
                <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className="p-2 rounded-lg border-CetaceanBlue border-solid border-2 text-CetaceanBlue"
                    aria-label="Lọc theo độ khó"
                >
                    <option value="all">--- Độ khó ---</option>
                    <option value="Gà mờ">Gà mờ</option>
                    <option value="Cứng tay">Cứng tay</option>
                    <option value="Đỉnh kout">Đỉnh kout</option>
                    <option value="Trùm cuối">Trùm cuối</option>
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
