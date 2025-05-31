import React from 'react';
import { Link } from 'react-router-dom';
import wallpaperLogin from '../assets/wallpaperLogin.jpg';

const Register = () => {
    return (
        <div className="min-h-screen w-full flex bg-gray-100">
            <div className="flex w-full h-screen">
                <div className="hidden lg:block w-1/2 relative">
                    <img
                        src={wallpaperLogin}
                        alt="Background Effect"
                        className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
                    />
                    <img
                        src={wallpaperLogin}
                        alt="Register Illustration"
                        className="relative object-contain w-full h-full z-10"
                    />
                </div>
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Đăng ký</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-700 mb-2">Tên người dùng</label>
                                <input
                                    id="username"
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                                    placeholder="Nhập tên người dùng"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                                    placeholder="Nhập email"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 mb-2">Mật khẩu</label>
                                <input
                                    id="password"
                                    type="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                                    placeholder="Nhập mật khẩu"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="confirm-password" className="block text-gray-700 mb-2">Xác nhận mật khẩu</label>
                                <input
                                    id="confirm-password"
                                    type="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                                    placeholder="Xác nhận mật khẩu"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            >
                                Đăng ký
                            </button>
                        </form>
                        <p className="text-center text-gray-600 mt-4">
                            Đã có tài khoản? <Link to="/login" className="text-blue-500 hover:underline">Đăng nhập</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;