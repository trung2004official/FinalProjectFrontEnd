import React, { useRef } from 'react'
import { FaUser, FaHistory, FaBell, FaHeart, FaSignOutAlt, FaEdit, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../contexts/UserContext';
import { BASE_URL } from '../../../../services/api';
import axios from 'axios';

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const fileInputRef = useRef();

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await axios.put(`${BASE_URL}/api/auth/${user.id}`, formData);
      if(response.status === 200) {
        setUser((prev) => ({...prev, avatar: response.data.user.avatar}));
      }
    } catch (error) {
      console.log('Server error: ', error);
    }
  }

  return (
    <div className='w-[250px] min-h-screen flex flex-col justify-between bg-CetaceanBlue'>
      <div>
        {/* Avatar và tên */}
        <div className='flex flex-col items-center py-8'>
          <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-CetaceanBlue relative'>
            <img
              src={user && user.avatar ? `${BASE_URL}/uploads/${user.avatar}` : '/default-avatar.png'}
              alt=""
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              className="absolute bottom-2 right-2 rounded-full p-2 shadow hover:bg-gray-200 transition"
              title="Đổi ảnh đại diện"
              onClick={() => fileInputRef.current.click()}
            >
              <FaEdit className="text-white" />
            </button>
            <input 
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
          </div>
          <span className='text-white font-bold text-2xl mt-3'>{user? user.fullname : 'Tên người dùng'}</span>
        </div>
        {/* Menu */}
        <nav className="flex flex-col gap-4 text-xl px-4">
          <button
            className="flex items-center gap-3 px-4 py-2 text-white hover:bg-CetaceanBlue-dark rounded transition"
            onClick={() => navigate('/profile')}
          >
            <FaUser /> Thông tin
          </button>
          <button
            className="flex items-center gap-3 px-4 py-2 text-white hover:bg-CetaceanBlue-dark rounded transition"
            onClick={() => navigate('/history')}
          >
            <FaHistory /> Lịch sử làm bài
          </button>
          <button className="flex items-center gap-3 px-4 py-2 text-white hover:bg-CetaceanBlue-dark rounded transition">
            <FaBell /> Thông báo
          </button>
          <button className="flex items-center gap-3 px-4 py-2 text-white hover:bg-CetaceanBlue-dark rounded transition">
            <FaHeart /> Yêu thích
          </button>
          <button className="flex items-center gap-3 px-4 py-2 text-white hover:bg-red-500 rounded transition">
            <FaSignOutAlt /> Đăng xuất
          </button>
        </nav>
      </div>
      {/* Nút quay lại dưới cùng */}
      <div className="p-4">
        <button
          className="flex items-center gap-2 px-4 py-2 w-full text-white hover:text-CetaceanBlue font-semibold rounded hover:bg-gray-200 transition"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Quay lại
        </button>
      </div>
    </div>
  )
}

export default ProfileSidebar;