import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/quiztech_logo.svg';

const Header = () => {
    const [username, setUsername] = useState('guest'); // Giá trị mặc định

    useEffect(() => {
        // Lấy username từ localStorage khi component mount
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUsername(parsedUser.username || 'guest');
        }
    }, []);

    // Hàm đăng xuất
    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setUsername('guest');
    };

    // Lấy thời gian hiện tại
    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour12: true });
    };

    const [currentTime, setCurrentTime] = useState(getCurrentTime());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 1000); // Cập nhật mỗi giây
        return () => clearInterval(timer); // Dọn dẹp khi unmount
    }, []);

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
                <div className="flex items-center space-x-4">
                    <Link to={`/profile/${username}`} className="flex items-center">
                        <i className="fa-regular fa-user-circle text-white text-3xl hover:text-CetaceanBlue-light transition duration-200"></i>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-Emerald text-white px-4 py-2 rounded-lg hover:bg-Emerald-dark transition duration-200"
                    >
                        Đăng xuất
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;