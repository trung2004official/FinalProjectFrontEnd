import React from 'react';
import wallpaperLogin from '../../assets/wallpaperLogin.jpg';
import logo from '../../assets/quiztech_logo.svg';

const SideImage = () => {
    return (
        <div className="hidden lg:block w-1/2 relative">

            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            </div>
            <img
                src={wallpaperLogin}
                alt="Login Illustration"
                className="relative object-cover w-full h-full z-10 border-0"
            />
        </div>
    );
};

export default SideImage;