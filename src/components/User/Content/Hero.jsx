import React from 'react';
import { Link } from 'react-router-dom';
import wallpaperLogin from '../../../assets/wallpaperLogin.jpg';

const HeroSection = () => {
    return (
        <div className="flex items-center justify-between p-6 my-9">
            <div className="w-1/2 p-4 bg-opacity-80">
                <h1 className="text-6xl font-bold mb-2 text-CetaceanBlue">QuizTech</h1>
                <h2 className="text-2xl mb-2 text-CetaceanBlue-light ">Nền tảng ôn thi trắc nghiệm thông minh, giúp bạn luyện tập hiệu quả, đánh giá năng lực chính xác và chinh phục kỳ thi dễ dàng.</h2>
                <p className="mb-4 text-Manatee-dark">Khám phá ngân hàng câu hỏi chất lượng, thi thử mô phỏng thực tế và theo dõi tiến độ học tập của bạn ngay hôm nay!</p>
                <Link to="/quiz">
                    <button className="bg-black text-white px-4 py-2 rounded">Ôn Thi Ngay</button>
                </Link>
            </div>
            <div className="w-1/2">
                <img
                    src={wallpaperLogin}
                    alt="Wallpaper Login"
                    className="w-full h-110 object-cover object-center"
                />
            </div>
        </div>
    );
};

export default HeroSection;