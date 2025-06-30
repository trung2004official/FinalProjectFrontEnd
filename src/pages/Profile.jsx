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
import ProfileSetting from '../components/User/PersonalProfile/ProfileSetting.jsx';

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
  const [showProfileModal, setShowProfileModal] = useState(false);

    return (
        <div className="bg-CadetBlue">
            <div className='flex h-screen'>
                <ProfileSidebar/>
                <div className='flex-1 h-screen overflow-y-auto'>
                    <ProfileHeader/>
                    <div className='shadow-lg m-2 border border-black'>
                        <Bar data={activityData} options={options} height={80} />
                    </div>
                    <div className='shadow-lg m-2 border border-black '>
                        <ProfileMain setShowProfileModal={setShowProfileModal}/>
                    </div>
                </div>
                {showProfileModal && (
                  <>
                    <div className='fixed inset-0 bg-[rgba(0,0,0,0.8)] z-50'></div>
                    <div className='fixed inset-0 flex items-center justify-center z-60'>
                      <ProfileSetting setShowProfileModal={setShowProfileModal}/>
                    </div>
                  </>
                )}
            </div>
        </div>
    );
};

export default Profile;