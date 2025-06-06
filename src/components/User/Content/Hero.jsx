import React from 'react';
import { Link } from 'react-router-dom';
import wallpaperLogin from '../../../assets/wallpaperLogin.jpg';

const HeroSection = () => {
    return (
        <div className="flex items-center justify-between p-6 my-9">
            <div className="border-2 border-dashed border-blue-300 p-4 bg-CetaceanBlue bg-opacity-80">
                <h1 className="text-3xl font-bold mb-2">Chào mừng đến với QUIZTECH</h1>
                <p className="mb-4">Mở tài khoản</p>
                <Link to="/quiz">
                    <button className="bg-black text-white px-4 py-2 rounded">Ôn Thi Ngay</button>
                </Link>
            </div>
            <img
                src={wallpaperLogin}
                alt="Wallpaper Login"
                className="w-1/2 h-110 object-cover object-center"
            />
        </div>
    );
};

export default HeroSection;
