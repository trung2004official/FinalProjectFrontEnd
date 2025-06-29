import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import hamburgerIcon from '../../assets/7504229_hamburger_menu_list_options_icon.svg';
import { useUser } from '../../contexts/UserContext';
import Swal from 'sweetalert2';

const majors = ['Tất cả', 'Thiết Kế Web', 'Mobile', 'Mạng Máy Tính'];
const levels = ['Tất cả', 'Gà mờ', 'Cứng tay', 'Đỉnh kout', 'Trùm cuối'];
const roles = ['Tất cả', 'Quản trị viên', 'Sinh viên'];
const feedbackStatus = ['Tất cả', 'Chưa phản hồi', 'Đã phản hồi'];

const Navbar = () => {
    const location = useLocation();
    const [searchValue, setSearchValue] = useState('');
    const [filterMajor, setFilterMajor] = useState('');
    const [filterLevel, setFilterLevel] = useState('');
    const [filterStatsType, setFilterStatsType] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [searchAccount, setSearchAccount] = useState('');
    const [searchFeedback, setSearchFeedback] = useState('');
    const [filterFeedback, setFilterFeedback] = useState('');
    const {setUser} = useUser();
    const navigate = useNavigate();

    // Xác định trang hiện tại
    const isStats = location.pathname === '/admin';
    const isQuizzes = location.pathname.startsWith('/admin/quizzes');
    const isQuestions = location.pathname.startsWith('/admin/questions');
    const isAccounts = location.pathname.startsWith('/admin/accounts');
    const isFeedback = location.pathname.startsWith('/admin/feedback');

    // Hàm xử lý đăng xuất (giả lập)
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser({});
        Swal.fire(
            'Successful',
            'Bạn đã đăng xuất khỏi hệ thống',
            'success'
        )
        navigate('/login');
    };

    const handleLogOutClick = () => {
        Swal.fire({
            title: 'Bạn muốn đăng xuất?',
            showCancelButton:true,
            showConfirmButton: true,
            confirmButtonText: 'Đăng xuất',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if(result.isConfirmed) {
                handleLogout();
            }
        })
    }

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
                {isAccounts && (
                    <>
                        <input
                            type="text"
                            className="bg-gray-700 text-white rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Tìm kiếm theo tên hoặc email..."
                            value={searchAccount}
                            onChange={e => setSearchAccount(e.target.value)}
                        />
                        <select
                            className="bg-gray-700 text-white rounded-lg p-2"
                            value={filterRole}
                            onChange={e => setFilterRole(e.target.value)}
                        >
                            {roles.map(role => (
                                <option key={role} value={role}>{role === 'Tất cả' ? 'Tất cả vai trò' : role}</option>
                            ))}
                        </select>
                    </>
                )}
                {isFeedback && (
                    <>
                        <input
                            type="text"
                            className="bg-gray-700 text-white rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Tìm kiếm theo tên người gửi..."
                            value={searchFeedback}
                            onChange={e => setSearchFeedback(e.target.value)}
                        />
                        <select
                            className="bg-gray-700 text-white rounded-lg p-2"
                            value={filterFeedback}
                            onChange={e => setFilterFeedback(e.target.value)}
                        >
                            {feedbackStatus.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </>
                )}
            </div>
            <ul className="flex gap-4 items-center">
                <li>
                    <button
                        onClick={handleLogOutClick}
                        className="bg-Emerald hover:bg-Emerald-600 text-white px-3 py-1 rounded transition"
                        title="Đăng xuất"
                    >
                        Đăng xuất
                    </button>
                </li>
                <li>
                    <i className="fa-regular fa-bell text-2xl cursor-pointer" title="Thông báo"></i>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;