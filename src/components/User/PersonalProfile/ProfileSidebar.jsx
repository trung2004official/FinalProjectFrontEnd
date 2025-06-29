import React from 'react'
import { FaUser, FaHistory, FaBell, FaHeart, FaSignOutAlt, FaEdit, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProfileSidebar = () => {
  const navigate = useNavigate();
  return (
    <div className='w-[250px] min-h-screen flex flex-col justify-between bg-CetaceanBlue'>
      <div>
        {/* Avatar và tên */}
        <div className='flex flex-col items-center py-8'>
          <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-CetaceanBlue relative'>
            <img
              src="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/506060153_2526619104351592_4052337228407427246_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeELRC_MLNJsOgR8-KY9wi0bEESlSnzrVuoQRKVKfOtW6oNuYorF16SWtiZpT2z_tYNaWC3-HqbEOuxzzSHIjtZd&_nc_ohc=PqBbrv-qrdUQ7kNvwF3bNpL&_nc_oc=Adla-YJoWubWOJ03UCIa14MjOGjAnlLiA5tegbI7TaGm82FvIG2yheUQ-uKBkom6T7kToz6pFfioAF-a1_gds4u8&_nc_zt=23&_nc_ht=scontent.fsgn8-4.fna&_nc_gid=2hjPd25YM-jRDTUxzHsRUw&oh=00_AfOmtFsThAqL751XGjIvZBX8bbCw1XMiC-KgDvdIS9St6Q&oe=6864ADA0"
              alt=""
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              className="absolute bottom-2 right-2 rounded-full p-2 shadow hover:bg-gray-200 transition"
              title="Đổi ảnh đại diện"
            >
              <FaEdit className="text-white" />
            </button>
          </div>
          <span className='text-white font-bold text-2xl mt-3'>Nguyễn Ngọc Long</span>
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