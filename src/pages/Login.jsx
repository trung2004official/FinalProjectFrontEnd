import React from 'react';
import { Link } from 'react-router-dom';
import SideImage from '../components/Log-Res/SideImage.jsx';
import logo from '../assets/quiztech_logo.svg';

const Login = () => {
  return (
      <div className="min-h-screen w-full flex bg-CadetBlue">
        <div className="flex w-full h-screen">
          <SideImage />
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md bg-CetaceanBlue p-8 rounded-lg shadow-lg border border-Manatee">
              <img src={logo} alt="Logo" className="h-24 mx-auto mb-4" />
              <p className="text-4xl font-bold text-white text-center mb-6">Welcome to QuizTech</p>
              <form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-Grey-light mb-2">Email</label>
                  <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-2 border border-Manatee rounded-lg focus:outline-none focus:ring-2 focus:ring-PurpleNavy bg-white text-black placeholder-Manatee"
                      placeholder="Nhập email"
                      required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-Grey-light mb-2">Mật khẩu</label>
                  <input
                      id="password"
                      type="password"
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