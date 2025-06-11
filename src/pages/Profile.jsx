import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { users } from '../data.js'; // Điều chỉnh đường dẫn

const Profile = () => {
    const { username } = useParams();
    const navigate = useNavigate();

    // Khởi tạo state trước khi kiểm tra
    const [currentTime, setCurrentTime] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Tìm user từ params
        const foundUser = users.find(u => u.username === username);
        setUser(foundUser || null);

        // Lấy thời gian hiện tại
        const getCurrentTime = () => {
            const now = new Date();
            return now.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour12: true });
        };
        setCurrentTime(getCurrentTime());

        const timer = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 1000);
        return () => clearInterval(timer); // Dọn dẹp khi unmount
    }, [username]);

    // Hàm đăng xuất
    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    // Kiểm tra nếu không có user
    if (!user) {
        return <div className="min-h-screen bg-CadetBlue text-white p-6 text-center">Không tìm thấy người dùng!</div>;
    }

    return (
        <div className="min-h-screen bg-CadetBlue text-white p-6">
            <h1 className="text-3xl font-bold mb-6">Trang Cá Nhân</h1>
            <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Thông Tin Người Dùng</h2>
                <p className="mb-2"><strong>Tên đăng nhập:</strong> {user.username}</p>
                <p className="mb-2"><strong>Vai trò:</strong> {user.role}</p>
                <p className="mb-4"><strong>Số lần làm bài:</strong> 15</p> {/* Giá trị mẫu */}
                <div className="flex flex-col space-y-4">
                    <button
                        className="bg-Emerald text-white py-2 px-4 rounded-lg hover:bg-Emerald-dark transition duration-200"
                    >
                        Cập nhật thông tin
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                        Đăng xuất
                    </button>
                </div>
                <p className="mt-4 text-sm text-gray-600">Cập nhật lần cuối: {currentTime} (+07)</p>
            </div>
        </div>
    );
};

export default Profile;