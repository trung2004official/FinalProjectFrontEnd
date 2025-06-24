import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import hamburgerIcon from '../../assets/7504229_hamburger_menu_list_options_icon.svg';
import messageIcon from '../../assets/message.svg';
import bellIcon from '../../assets/bell.svg';

const majors = ['Tất cả', 'Thiết Kế Web', 'Mobile', 'Mạng Máy Tính'];
const levels = ['Tất cả', 'Dễ', 'Trung bình', 'Khó'];

const Navbar = () => {
    const location = useLocation();
    const [searchValue, setSearchValue] = useState('');
    const [filterMajor, setFilterMajor] = useState('');
    const [filterLevel, setFilterLevel] = useState('');
    const [filterStatsType, setFilterStatsType] = useState('');

    // Xác định trang hiện tại
    const isStats = location.pathname === '/admin';
    const isQuizzes = location.pathname.startsWith('/admin/quizzes');
    const isQuestions = location.pathname.startsWith('/admin/questions');

    return (
        <nav className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
                <img src={hamburgerIcon} alt="Menu" className="w-6 h-6 cursor-pointer" />
                {/* Thanh tìm kiếm và bộ lọc */}
                {isStats && (
                    <>
                        <input
                            type="text"
                            className="bg-gray-700 text-white rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Tìm kiếm loại thống kê..."
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                        />
                        <select
                            className="bg-gray-700 text-white rounded-lg p-2"
                            value={filterStatsType}
                            onChange={e => setFilterStatsType(e.target.value)}
                        >
                            <option value="">Tất cả thống kê</option>
                            <option value="user">Người dùng</option>
                            <option value="quiz">Đề thi</option>
                            <option value="question">Câu hỏi</option>
                        </select>
                    </>
                )}
                {isQuizzes && (
                    <>
                        <input
                            type="text"
                            className="bg-gray-700 text-white rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Tìm kiếm đề thi theo tiêu đề..."
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                        />
                        <select
                            className="bg-gray-700 text-white rounded-lg p-2"
                            value={filterMajor}
                            onChange={e => setFilterMajor(e.target.value)}
                        >
                            {majors.map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                        <select
                            className="bg-gray-700 text-white rounded-lg p-2"
                            value={filterLevel}
                            onChange={e => setFilterLevel(e.target.value)}
                        >
                            {levels.map(l => (
                                <option key={l} value={l}>{l}</option>
                            ))}
                        </select>
                    </>
                )}
                {isQuestions && (
                    <>
                        <input
                            type="text"
                            className="bg-gray-700 text-white rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Tìm kiếm câu hỏi..."
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                        />
                        <select
                            className="bg-gray-700 text-white rounded-lg p-2"
                            value={filterMajor}
                            onChange={e => setFilterMajor(e.target.value)}
                        >
                            {majors.map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                        <select
                            className="bg-gray-700 text-white rounded-lg p-2"
                            value={filterLevel}
                            onChange={e => setFilterLevel(e.target.value)}
                        >
                            {levels.map(l => (
                                <option key={l} value={l}>{l}</option>
                            ))}
                        </select>
                    </>
                )}
            </div>
            <ul className="flex gap-4">
                <li><img src={messageIcon} alt="Tin nhắn" className="w-6 h-6 cursor-pointer" /></li>
                <li><img src={bellIcon} alt="Thông báo" className="w-6 h-6 cursor-pointer" /></li>
            </ul>
        </nav>
    );
};

export default Navbar;