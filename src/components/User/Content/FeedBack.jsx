import React from 'react';

const FeedBack = ({ username = "Ẩn danh", avatar, date, rating, text }) => {
    return (
        <div className="flex flex-row items-center gap-6 bg-CetaceanBlue/80 rounded-2xl px-6 py-5 my-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-CetaceanBlue/90 animate-fade-in">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-Emerald to-CadetBlue flex items-center justify-center overflow-hidden ring-4 ring-Emerald-dark/50 transition-all duration-300 hover:ring-Emerald shrink-0">
                {avatar ? (
                    <img src={avatar} alt="avatar" className="w-full h-full object-cover rounded-full" />
                ) : (
                    <i className="fa-regular fa-user text-2xl text-white"></i>
                )}
            </div>
            {/* Nội dung feedback */}
            <div className="flex flex-col gap-2 flex-1">
                <span className="font-bold text-white text-xl break-all">{username}</span>
                <div className="flex flex-row items-center gap-4">
                    {rating && (
                        <span className="flex items-center gap-1 bg-Grey/50 px-3 py-1 rounded-full shadow-sm">
                            <i className="fa-solid fa-star text-Amber-light text-base"></i>
                            <span className="text-base text-Amber-light font-bold">{rating}/5</span>
                        </span>
                    )}
                    <span className="text-sm text-Manatee-light">{date}</span>
                </div>
                <div className="text-Grey-light text-base leading-relaxed">{text}</div>
            </div>
        </div>
    );
};

export default FeedBack;