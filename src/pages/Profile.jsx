import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { users } from '../data.js'; // Điều chỉnh đường dẫn
import ProfileSidebar from '../components/User/PersonalProfile/ProfileSidebar.jsx';
import ProfileHeader from '../components/User/PersonalProfile/ProfileHeader.jsx';
import ProfileMain from '../components/User/PersonalProfile/ProfileMain.jsx';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const activityData = {
  labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  datasets: [
    {
      label: 'Số lần làm bài',
      data: [2, 4, 3, 5, 1, 6, 2, 4, 3, 5, 2, 3], // Thay bằng dữ liệu thực tế nếu có
      backgroundColor: '#2563eb',
    },
  ],
}

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: 'Biểu đồ hoạt động (số lần làm bài theo tháng)' },
  },
  scales: {
    y: { beginAtZero: true, ticks: { stepSize: 1 } },
  },
}

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
        <div className="bg-CadetBlue">
            <div className='flex h-screen'>
                <ProfileSidebar/>
                <div className='flex-1'>
                    <ProfileHeader/>
                    <div className='shadow-lg m-2 border border-black'>
                        <Bar data={activityData} options={options} height={90} />
                    </div>
                    <div className='shadow-lg m-2 border border-black'>
                        <ProfileMain />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;