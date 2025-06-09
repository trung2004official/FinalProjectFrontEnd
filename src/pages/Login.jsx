import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SideImage from '../components/Log-Res/SideImage.jsx';
import logo from '../assets/quiztech_logo.svg';
import { users } from '../data.js'; // Điều chỉnh đường dẫn

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tìm user dựa trên username và password
    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
      const loginTime = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour12: true }); // 10:46 AM +07
      const userData = { ...foundUser, lastLogin: loginTime }; // Thêm thời gian đăng nhập
      localStorage.setItem('currentUser', JSON.stringify(userData)); // Lưu thông tin người dùng
      alert('Đăng nhập thành công! Chào mừng ' + username); // Thông báo thành công
      navigate('/home'); // Chuyển hướng sau khi đăng nhập
    } else {
      alert('Đăng nhập thất bại! Kiểm tra tên đăng nhập hoặc mật khẩu.');
    }
  };

  return (
      <div className="min-h-screen w-full flex bg-CadetBlue">
        <div className="flex w-full h-screen">
          <SideImage />
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md bg-CetaceanBlue p-8 rounded-lg shadow-lg border border-Manatee">
              <img src={logo} alt="Logo" className="h-24 mx-auto mb-4" />
              <p className="text-4xl font-bold text-white text-center mb-6">Welcome to QuizTech</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-Grey-light mb-2">Tên đăng nhập</label>
                  <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-2 border border-Manatee rounded-lg focus:outline-none focus:ring-2 focus:ring-PurpleNavy bg-white text-black placeholder-Manatee"
                      placeholder="Nhập tên đăng nhập"
                      required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-Grey-light mb-2">Mật khẩu</label>
                  <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-Manatee rounded-lg focus:outline-none focus:ring-2 focus:ring-PurpleNavy bg-white text-black placeholder-Manatee"
                      placeholder="Nhập mật khẩu"
                      required
                  />
                </div>
                <button
                    type="submit"
                    className="w-full bg-CetaceanBlue-light text-white py-2 rounded-lg hover:bg-CetaceanBlue-dark focus:outline-none focus:ring-2 focus:ring-CetaceanBlue-light transition duration-200"
                >
                  Đăng nhập
                </button>
              </form>
              <p className="text-center text-Manatee mt-4">
                Chưa có tài khoản? <Link to="/register" className="text-CadetBlue hover:underline">Đăng ký</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;