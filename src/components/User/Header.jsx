import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/quiztech_logo.svg';
import { FaChevronDown } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Header = () => {
    // const [username, setUsername] = useState('guest'); // Giá trị mặc định
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        Swal.fire(
            "Đã đăng xuất",
            "Bạn đã đăng xuất thành công",
            'success',
        )
        navigate('/');
    };

    const handleClickLogOut = () => {
        Swal.fire({
            title: `Bạn chắc chắn muốn đăng xuất?`,
            showDenyButton: true,
            confirmButtonText: "Xác nhận",
            denyButtonText: `Hủy`
        }).then((result) => {
            if (result.isConfirmed) {
                handleLogout();
            }
        })
    }

    // useEffect(() => {
    //     // Lấy username từ localStorage khi component mount
    //     const storedUser = localStorage.getItem('currentUser');
    //     if (storedUser) {
    //         const parsedUser = JSON.parse(storedUser);
    //         setUsername(parsedUser.username || 'guest');
    //     }
    // }, []);

    // // Hàm đăng xuất
    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     setUsername('guest');
    // };

    // // Lấy thời gian hiện tại
    // const getCurrentTime = () => {
    //     const now = new Date();
    //     return now.toLocaleTimeString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour12: true });
    // };

    // const [currentTime, setCurrentTime] = useState(getCurrentTime());

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setCurrentTime(getCurrentTime());
    //     }, 1000); // Cập nhật mỗi giây
    //     return () => clearInterval(timer); // Dọn dẹp khi unmount
    // }, []);

    return (
        <header className="bg-CetaceanBlue px-10 flex justify-between items-center py-4">
            <Link to="/home" className="flex items-center space-x-2">
                <img src={logo} alt="QuizTech Logo" className="h-25 ml-15" />
            </Link>
            <nav className="flex items-center space-x-6 mr-20 text-xl">
                <ul className="flex space-x-6 text-white">
                    <li className="hover:text-CetaceanBlue-light transition duration-200">
                        <Link to="/home" className="flex items-center space-x-2">
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="hover:text-CetaceanBlue-light transition duration-200">
                        <Link to="/quiz" className="flex items-center space-x-2">
                            <span>Quiz</span>
                        </Link>
                    </li>
                </ul>
                <div className="relative" ref={dropdownRef}>
                    <button
                        className="flex items-center gap-2 focus:outline-none"
                        onClick={() => setShowDropdown((prev) => !prev)}
                    >
                        <img
                            className="w-12 h-12 rounded-full border-2 border-white"
                            src="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/506060153_2526619104351592_4052337228407427246_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeELRC_MLNJsOgR8-KY9wi0bEESlSnzrVuoQRKVKfOtW6oNuYorF16SWtiZpT2z_tYNaWC3-HqbEOuxzzSHIjtZd&_nc_ohc=PqBbrv-qrdUQ7kNvwF3bNpL&_nc_oc=Adla-YJoWubWOJ03UCIa14MjOGjAnlLiA5tegbI7TaGm82FvIG2yheUQ-uKBkom6T7kToz6pFfioAF-a1_gds4u8&_nc_zt=23&_nc_ht=scontent.fsgn8-4.fna&_nc_gid=2hjPd25YM-jRDTUxzHsRUw&oh=00_AfOmtFsThAqL751XGjIvZBX8bbCw1XMiC-KgDvdIS9St6Q&oe=6864ADA0"
                            alt=""
                        />
                    </button>
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-PurpleNavy rounded shadow-lg z-50">
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-CetaceanBlue-light hover:text-white transition"
                                onClick={() => { setShowDropdown(false); navigate('/profile'); }}
                            >
                                Thông tin cá nhân
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-CetaceanBlue-light hover:text-white transition"
                                onClick={() => { setShowDropdown(false); /* navigate('/settings'); */ }}
                            >
                                Cài đặt
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-CetaceanBlue-light transition"
                                onClick={() => handleClickLogOut()}
                            >
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;